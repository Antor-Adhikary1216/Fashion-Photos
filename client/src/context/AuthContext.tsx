import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { api, getStoredAccessToken, setStoredAccessToken } from '@/api/http'
import type { User } from '@/types'

type LoginResult =
  | { requiresMfa: true; mfaToken: string; message: string }
  | { requiresMfa: false; user: User; accessToken: string; message: string }

type AuthContextValue = {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  register: (payload: RegisterPayload) => Promise<unknown>
  login: (payload: LoginPayload) => Promise<LoginResult>
  verifyMfaLogin: (payload: MfaLoginPayload) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

type RegisterPayload = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type LoginPayload = {
  email: string
  password: string
}

type MfaLoginPayload = {
  mfaToken: string
  code: string
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState(getStoredAccessToken())
  const [isLoading, setIsLoading] = useState(true)

  const storeSession = useCallback((token: string, nextUser: User) => {
    setStoredAccessToken(token)
    setAccessToken(token)
    setUser(nextUser)
  }, [])

  const refreshUser = useCallback(async () => {
    const response = await api.get('/auth/me')
    setUser(response.data.user)
  }, [])

  useEffect(() => {
    async function hydrate() {
      try {
        if (getStoredAccessToken()) {
          await refreshUser()
          return
        }

        const response = await api.post('/auth/refresh-token')
        if (response.data.accessToken) {
          storeSession(response.data.accessToken, response.data.user)
        }
      } catch {
        setStoredAccessToken(null)
        setAccessToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    void hydrate()
  }, [refreshUser, storeSession])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isLoading,
      async register(payload) {
        const response = await api.post('/auth/register', payload)
        return response.data
      },
      async login(payload) {
        const response = await api.post<LoginResult>('/auth/login', payload)

        if (!response.data.requiresMfa) {
          storeSession(response.data.accessToken, response.data.user)
        }

        return response.data
      },
      async verifyMfaLogin(payload) {
        const response = await api.post('/auth/mfa/verify-login', payload)
        storeSession(response.data.accessToken, response.data.user)
      },
      async logout() {
        await api.post('/auth/logout')
        setStoredAccessToken(null)
        setAccessToken(null)
        setUser(null)
      },
      refreshUser,
    }),
    [accessToken, isLoading, refreshUser, storeSession, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
