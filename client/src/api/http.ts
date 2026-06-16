import axios from 'axios'

const tokenKey = 'fashion_photos_access_token'
const defaultApiBaseUrl = import.meta.env.PROD
  ? '/api'
  : 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? defaultApiBaseUrl,
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
  return getErrorMessages(error)[0]
}

export function getErrorMessages(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return [
        'API server is not running. Start the backend with npm run dev:server.',
      ]
    }

    const message = error.response?.data?.message
    const details = error.response?.data?.details

    if (Array.isArray(details)) {
      const messages = details
        .map((detail) => detail?.message)
        .filter((detailMessage): detailMessage is string =>
          Boolean(detailMessage),
        )

      if (messages.length > 0) {
        return [...new Set(messages)]
      }
    }

    return [typeof message === 'string' ? message : error.message]
  }

  return [error instanceof Error ? error.message : 'Something went wrong']
}
