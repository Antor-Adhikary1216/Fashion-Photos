import { Router } from 'express'

import {
  disableMfa,
  forgotPassword,
  getMe,
  login,
  logout,
  refreshToken,
  register,
  resendVerificationEmail,
  resetPassword,
  setupMfa,
  verifyBackupCode,
  verifyEmail,
  verifyLoginMfa,
  verifyMfaSetup,
} from '../controllers/auth.controller'
import { requireAuth } from '../middleware/auth.middleware'
import {
  authLimiter,
  loginLimiter,
  resendVerificationLimiter,
} from '../middleware/rateLimit.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const authRouter = Router()

authRouter.post('/register', authLimiter, asyncHandler(register))
authRouter.post('/login', loginLimiter, asyncHandler(login))
authRouter.post('/logout', asyncHandler(logout))
authRouter.post('/refresh-token', asyncHandler(refreshToken))
authRouter.get('/me', requireAuth, asyncHandler(getMe))
authRouter.get('/verify-email', asyncHandler(verifyEmail))
authRouter.post('/verify-email', asyncHandler(verifyEmail))
authRouter.get('/verify-email/:token', asyncHandler(verifyEmail))
authRouter.post(
  '/resend-verification',
  resendVerificationLimiter,
  asyncHandler(resendVerificationEmail),
)
authRouter.post('/forgot-password', authLimiter, asyncHandler(forgotPassword))
authRouter.post('/reset-password', authLimiter, asyncHandler(resetPassword))
authRouter.post('/mfa/setup', requireAuth, asyncHandler(setupMfa))
authRouter.post('/mfa/verify-setup', requireAuth, asyncHandler(verifyMfaSetup))
authRouter.post('/mfa/verify-login', loginLimiter, asyncHandler(verifyLoginMfa))
authRouter.post('/mfa/disable', requireAuth, asyncHandler(disableMfa))
authRouter.post(
  '/mfa/verify-backup-code',
  loginLimiter,
  asyncHandler(verifyBackupCode),
)
