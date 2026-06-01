import type { Request, Response } from 'express'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { z } from 'zod'

import { env } from '../config/env'
import { UserModel } from '../models/User'
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '../services/email.service'
import { getRefreshCookieOptions } from '../utils/authCookie'
import { AppError } from '../utils/errors'
import {
  createBackupCodes,
  createMfaSetup,
  hashBackupCode,
  verifyTotpCode,
} from '../utils/mfa'
import { comparePassword, hashPassword } from '../utils/password'
import { serializeUser } from '../utils/serializeUser'
import {
  createEmailVerificationToken,
  createPasswordResetToken,
  createRefreshTokenValue,
  hashToken,
  REFRESH_COOKIE_NAME,
  signAccessToken,
  signMfaChallengeToken,
  signRefreshToken,
  verifyMfaChallengeToken,
  verifyRefreshToken,
} from '../utils/tokens'
import {
  parseWithSchema,
  strongPasswordSchema,
  toLowerCase,
} from '../utils/validation'

const registerSchema = z
  .object({
    name: z.string().trim().min(1).max(80),
    email: z.string().trim().email().transform(toLowerCase),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

const loginSchema = z.object({
  email: z.string().trim().email().transform(toLowerCase),
  password: z.string().min(1),
})

const emailSchema = z.object({
  email: z.string().trim().email().transform(toLowerCase),
})

const verifyEmailSchema = z.object({
  token: z.string().trim().min(32).max(256),
})

const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(32).max(256),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

const mfaCodeSchema = z.object({
  code: z.string().trim().min(6).max(20),
})

const verifyLoginMfaSchema = z.object({
  mfaToken: z.string().trim().min(1),
  code: z.string().trim().min(6).max(20),
})

const verifyBackupCodeSchema = z.object({
  mfaToken: z.string().trim().min(1),
  backupCode: z.string().trim().min(8).max(32),
})

const disableMfaSchema = z.object({
  password: z.string().min(1),
  code: z.string().trim().min(6).max(20),
})

export async function register(req: Request, res: Response) {
  const { name, email, password } = parseWithSchema(registerSchema, req.body)
  const existingUser = await UserModel.findOne({ email })

  if (existingUser) {
    throw new AppError(409, 'Email is already registered')
  }

  const passwordHash = await hashPassword(password)
  const verificationToken = createEmailVerificationToken()

  const user = await UserModel.create({
    name,
    email,
    passwordHash,
    emailVerificationTokenHash: verificationToken.tokenHash,
    emailVerificationExpiresAt: verificationToken.expiresAt,
  })

  const verificationEmail = await sendVerificationEmail({
    to: user.email,
    name: user.name,
    token: verificationToken.token,
  })

  res.status(201).json({
    message: verificationEmail.delivered
      ? 'Account created. Please verify your email before logging in.'
      : 'Account created. Email delivery is not configured, so use the development verification URL.',
    user: serializeUser(user),
    devVerificationUrl:
      env.NODE_ENV !== 'production' && !verificationEmail.delivered
        ? verificationEmail.url
        : undefined,
  })
}

export async function verifyEmail(req: Request, res: Response) {
  const tokenSource =
    typeof req.query.token === 'string'
      ? req.query
      : typeof req.params.token === 'string'
        ? req.params
        : req.body
  const { token } = parseWithSchema(verifyEmailSchema, tokenSource)

  const user = await UserModel.findOne({
    emailVerificationTokenHash: hashToken(token),
    emailVerificationExpiresAt: { $gt: new Date() },
  }).select('+emailVerificationTokenHash +emailVerificationExpiresAt')

  if (!user) {
    throw new AppError(400, 'Verification link is invalid or expired')
  }

  user.isEmailVerified = true
  user.emailVerificationTokenHash = undefined
  user.emailVerificationExpiresAt = undefined
  await user.save()

  res.status(200).json({
    message: 'Email verified successfully',
    user: serializeUser(user),
  })
}

export async function resendVerificationEmail(req: Request, res: Response) {
  const { email } = parseWithSchema(emailSchema, req.body)
  const user = await UserModel.findOne({ email }).select(
    '+emailVerificationTokenHash +emailVerificationExpiresAt',
  )

  if (!user || user.isEmailVerified) {
    res.status(200).json({
      message:
        'If an unverified account exists for this email, a verification email has been sent.',
    })
    return
  }

  const verificationToken = createEmailVerificationToken()
  user.emailVerificationTokenHash = verificationToken.tokenHash
  user.emailVerificationExpiresAt = verificationToken.expiresAt
  await user.save()

  const verificationEmail = await sendVerificationEmail({
    to: user.email,
    name: user.name,
    token: verificationToken.token,
  })

  res.status(200).json({
    message: verificationEmail.delivered
      ? 'Verification email sent'
      : 'Email delivery is not configured, so use the development verification URL.',
    devVerificationUrl:
      env.NODE_ENV !== 'production' && !verificationEmail.delivered
        ? verificationEmail.url
        : undefined,
  })
}

export async function login(req: Request, res: Response) {
  const { email, password } = parseWithSchema(loginSchema, req.body)
  const user = await UserModel.findOne({ email }).select('+passwordHash')

  if (!user) {
    throw new AppError(401, 'Invalid email or password')
  }

  const passwordMatches = await comparePassword(password, user.passwordHash)

  if (!passwordMatches) {
    throw new AppError(401, 'Invalid email or password')
  }

  if (!user.isEmailVerified) {
    throw new AppError(403, 'Please verify your email before logging in.')
  }

  if (user.mfa.enabled) {
    res.status(200).json({
      message: 'MFA verification required',
      requiresMfa: true,
      mfaToken: signMfaChallengeToken(user.id),
    })
    return
  }

  const accessToken = await issueSession(res, user.id, false)
  user.lastLoginAt = new Date()
  await user.save()

  res.status(200).json({
    message: 'Logged in successfully',
    requiresMfa: false,
    accessToken,
    user: serializeUser(user),
  })
}

export async function refreshToken(req: Request, res: Response) {
  const refreshTokenValue = req.cookies?.[REFRESH_COOKIE_NAME]

  if (typeof refreshTokenValue !== 'string') {
    throw new AppError(401, 'Refresh token required')
  }

  try {
    const decoded = verifyRefreshToken(refreshTokenValue)
    const user = await UserModel.findById(decoded.sub).select(
      '+refreshTokenHash',
    )

    if (!user || user.refreshTokenHash !== hashToken(refreshTokenValue)) {
      throw new AppError(401, 'Invalid refresh token')
    }

    const mfaVerified = user.mfa.enabled
    const accessToken = await issueSession(res, user.id, mfaVerified)

    res.status(200).json({
      accessToken,
      user: serializeUser(user),
    })
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(401, 'Refresh token expired')
    }

    if (error instanceof JsonWebTokenError) {
      throw new AppError(401, 'Invalid refresh token')
    }

    throw error
  }
}

export async function logout(req: Request, res: Response) {
  const refreshTokenValue = req.cookies?.[REFRESH_COOKIE_NAME]

  if (typeof refreshTokenValue === 'string') {
    const decoded = tryVerifyRefreshToken(refreshTokenValue)

    if (decoded?.sub) {
      await UserModel.findByIdAndUpdate(decoded.sub, {
        $unset: { refreshTokenHash: '' },
      })
    }
  }

  res.clearCookie(REFRESH_COOKIE_NAME, getRefreshCookieOptions())
  res.status(200).json({ message: 'Logged out successfully' })
}

export async function getMe(_req: Request, res: Response) {
  const user = res.locals.user

  if (!user) {
    throw new AppError(401, 'Authentication required')
  }

  res.status(200).json({
    user: serializeUser(user),
  })
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = parseWithSchema(emailSchema, req.body)
  const user = await UserModel.findOne({ email }).select(
    '+passwordResetTokenHash +passwordResetExpiresAt',
  )

  if (user) {
    const resetToken = createPasswordResetToken()
    user.passwordResetTokenHash = resetToken.tokenHash
    user.passwordResetExpiresAt = resetToken.expiresAt
    await user.save()

    const resetEmail = await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      token: resetToken.token,
    })

    res.status(200).json({
      message:
        'If that email exists, password reset instructions have been sent.',
      devResetUrl:
        env.NODE_ENV !== 'production' && !resetEmail.delivered
          ? resetEmail.url
          : undefined,
    })
    return
  }

  res.status(200).json({
    message: 'If that email exists, password reset instructions have been sent.',
  })
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = parseWithSchema(resetPasswordSchema, req.body)
  const user = await UserModel.findOne({
    passwordResetTokenHash: hashToken(token),
    passwordResetExpiresAt: { $gt: new Date() },
  }).select('+passwordResetTokenHash +passwordResetExpiresAt +passwordHash')

  if (!user) {
    throw new AppError(400, 'Password reset link is invalid or expired')
  }

  user.passwordHash = await hashPassword(password)
  user.passwordResetTokenHash = undefined
  user.passwordResetExpiresAt = undefined
  user.refreshTokenHash = undefined
  await user.save()

  res.status(200).json({ message: 'Password reset successfully' })
}

export async function setupMfa(_req: Request, res: Response) {
  const user = res.locals.user

  if (!user) {
    throw new AppError(401, 'Authentication required')
  }

  const setup = await createMfaSetup(user.email)

  user.mfa.pendingTotpSecretEncrypted = setup.encryptedSecret
  await user.save()

  res.status(200).json({
    message: 'Scan the QR code and verify one authenticator code.',
    qrCodeDataUrl: setup.qrCodeDataUrl,
    otpauthUrl: setup.otpauthUrl,
    manualEntryKey: setup.secret,
  })
}

export async function verifyMfaSetup(req: Request, res: Response) {
  const { code } = parseWithSchema(mfaCodeSchema, req.body)
  const user = await UserModel.findById(res.locals.user?.id).select(
    '+mfa.pendingTotpSecretEncrypted +mfa.backupCodesHash',
  )

  if (!user?.mfa.pendingTotpSecretEncrypted) {
    throw new AppError(400, 'MFA setup has not been started')
  }

  if (!(await verifyTotpCode(user.mfa.pendingTotpSecretEncrypted, code))) {
    throw new AppError(400, 'Invalid MFA code')
  }

  const backupCodes = createBackupCodes()
  user.mfa.enabled = true
  user.mfa.method = 'totp'
  user.mfa.totpSecretEncrypted = user.mfa.pendingTotpSecretEncrypted
  user.mfa.pendingTotpSecretEncrypted = undefined
  user.mfa.backupCodesHash = backupCodes.map(hashBackupCode)
  user.mfa.lastVerifiedAt = new Date()
  await user.save()

  res.status(200).json({
    message: 'MFA enabled successfully. Store these backup codes now.',
    backupCodes,
    user: serializeUser(user),
  })
}

export async function verifyLoginMfa(req: Request, res: Response) {
  const { mfaToken, code } = parseWithSchema(verifyLoginMfaSchema, req.body)
  const challenge = verifyMfaChallengeToken(mfaToken)
  const user = await UserModel.findById(challenge.sub).select(
    '+mfa.totpSecretEncrypted',
  )

  if (!user?.mfa.enabled || !user.mfa.totpSecretEncrypted) {
    throw new AppError(400, 'MFA is not enabled for this account')
  }

  if (!(await verifyTotpCode(user.mfa.totpSecretEncrypted, code))) {
    throw new AppError(400, 'Invalid MFA code')
  }

  user.mfa.lastVerifiedAt = new Date()
  user.lastLoginAt = new Date()
  const accessToken = await issueSession(res, user.id, true)
  await user.save()

  res.status(200).json({
    message: 'Logged in successfully',
    accessToken,
    user: serializeUser(user),
  })
}

export async function verifyBackupCode(req: Request, res: Response) {
  const { mfaToken, backupCode } = parseWithSchema(
    verifyBackupCodeSchema,
    req.body,
  )
  const challenge = verifyMfaChallengeToken(mfaToken)
  const user = await UserModel.findById(challenge.sub).select(
    '+mfa.backupCodesHash',
  )

  if (!user?.mfa.enabled) {
    throw new AppError(400, 'MFA is not enabled for this account')
  }

  const backupCodeHash = hashBackupCode(backupCode)
  const nextBackupCodes = user.mfa.backupCodesHash.filter(
    (storedHash) => storedHash !== backupCodeHash,
  )

  if (nextBackupCodes.length === user.mfa.backupCodesHash.length) {
    throw new AppError(400, 'Invalid backup code')
  }

  user.mfa.backupCodesHash = nextBackupCodes
  user.mfa.lastVerifiedAt = new Date()
  user.lastLoginAt = new Date()
  const accessToken = await issueSession(res, user.id, true)
  await user.save()

  res.status(200).json({
    message: 'Logged in successfully',
    accessToken,
    user: serializeUser(user),
  })
}

export async function disableMfa(req: Request, res: Response) {
  const { password, code } = parseWithSchema(disableMfaSchema, req.body)
  const user = await UserModel.findById(res.locals.user?.id).select(
    '+passwordHash +mfa.totpSecretEncrypted +mfa.backupCodesHash',
  )

  if (!user) {
    throw new AppError(401, 'Authentication required')
  }

  const passwordMatches = await comparePassword(password, user.passwordHash)

  if (!passwordMatches) {
    throw new AppError(401, 'Invalid password')
  }

  if (!user.mfa.enabled || !user.mfa.totpSecretEncrypted) {
    throw new AppError(400, 'MFA is not enabled')
  }

  const codeIsValid = await verifyTotpCode(user.mfa.totpSecretEncrypted, code)

  if (!codeIsValid) {
    throw new AppError(400, 'Invalid MFA code')
  }

  user.mfa.enabled = false
  user.mfa.totpSecretEncrypted = undefined
  user.mfa.pendingTotpSecretEncrypted = undefined
  user.mfa.backupCodesHash = []
  user.mfa.lastVerifiedAt = undefined
  await user.save()

  res.status(200).json({
    message: 'MFA disabled successfully',
    user: serializeUser(user),
  })
}

async function issueSession(
  res: Response,
  userId: string,
  mfaVerified: boolean,
) {
  const refreshTokenId = createRefreshTokenValue()
  const refreshToken = signRefreshToken(userId, refreshTokenId)
  const accessToken = signAccessToken(userId, mfaVerified)

  await UserModel.findByIdAndUpdate(userId, {
    refreshTokenHash: hashToken(refreshToken),
  })

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions())

  return accessToken
}

function tryVerifyRefreshToken(token: string) {
  try {
    return verifyRefreshToken(token)
  } catch {
    return null
  }
}
