import axios from 'axios'

const tokenKey = 'framestory_access_token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(tokenKey)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function setStoredAccessToken(token: string | null) {
  if (token) {
    localStorage.setItem(tokenKey, token)
    return
  }

  localStorage.removeItem(tokenKey)
}

export function getStoredAccessToken() {
  return localStorage.getItem(tokenKey)
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    return typeof message === 'string' ? message : error.message
  }

  return error instanceof Error ? error.message : 'Something went wrong'
}
