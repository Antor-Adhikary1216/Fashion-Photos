import type { CookieOptions } from 'express'

import { env } from '../config/env'

export function getRefreshCookieOptions(): CookieOptions {
  const isProduction = env.NODE_ENV === 'production'

  return {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: env.AUTH_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000,
    path: '/api/auth',
  }
}
