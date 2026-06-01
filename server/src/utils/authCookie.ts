import type { CookieOptions } from 'express'

import { env } from '../config/env'

export function getRefreshCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: env.AUTH_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000,
    path: '/api/auth',
  }
}
