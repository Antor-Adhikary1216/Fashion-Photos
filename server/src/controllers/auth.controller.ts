import { randomInt } from 'node:crypto'

import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { env } from '../config/env'
import { UserModel, type UserDocument } from '../models/User'
import {
  sendPasswordResetCodeEmail,
  sendVerificationCodeEmail,
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
import {
  deleteCloudinaryImage,
  uploadImageBuffer,
} from '../utils/cloudinaryUpload'
import { ensureDefaultProfileImage } from '../utils/profileImage'
import { serializeUser } from '../utils/serializeUser'
import {
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

const { JsonWebTokenError, TokenExpiredError } = jwt

const emailVerificationCodeExpiresMs = 10 * 60 * 1000
const maxEmailVerificationCodeAttempts = 5
const passwordResetCodeExpiresMs = 10 * 60 * 1000
const maxPasswordResetCodeAttempts = 5

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

const updateProfileSchema = z.object({
  name: z.preprocess(
    (value) => (value === undefined ? undefined : value),
    z.string().trim().min(1).max(80).optional(),
  ),
})

const sixDigitCodeSchema = (label: string) =>
  z.string().trim().regex(/^\d{6}$/, `${label} must be 6 digits`)

const verifyEmailSchema = z.object({
  email: z.string().trim().email().transform(toLowerCase),
  code: sixDigitCodeSchema('Verification code'),
})

const verifyPasswordResetCodeSchema = z.object({
  email: z.string().trim().email().transform(toLowerCase),
  code: sixDigitCodeSchema('Password reset code'),
})

const resetPasswordSchema = z
  .object({
    email: z.string().trim().email().transform(toLowerCase),
    code: sixDigitCodeSchema('Password reset code'),
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
  const verificationCode = createEmailVerificationCode()

  const user = await UserModel.create({
    name,
    email,
    passwordHash,
    emailVerificationCodeHash: verificationCode.codeHash,
    emailVerificationCodeExpiresAt: verificationCode.expiresAt,
    emailVerificationCodeAttempts: 0,
  })
  await ensureDefaultProfileImage(user)

  const verificationEmail = await sendEmailVerificationCode(
    user,
    verificationCode.code,
    'registration',
  )

  res.status(201).json({
    message: verificationEmail.delivered
      ? 'Account created. Enter the 6-digit code sent to your email.'
      : env.NODE_ENV !== 'production'
        ? 'Account created, but the verification email could not be sent. Use the development verification code below.'
        : 'Account created, but the verification email could not be sent. Please request a new verification code later.',
    requiresEmailVerification: true,
    email: user.email,
    user: serializeUser(user),
    devVerificationCode:
      env.NODE_ENV !== 'production' && !verificationEmail.delivered
        ? verificationCode.code
        : undefined,
  })
}

export async function verifyEmail(req: Request, res: Response) {
  const { email, code } = parseWithSchema(verifyEmailSchema, req.body)
  const user = await UserModel.findOne({ email }).select(
    '+emailVerificationCodeHash +emailVerificationCodeExpiresAt +emailVerificationCodeAttempts',
  )

  if (!user) {
    throw new AppError(400, 'Verification code is invalid or expired')
  }

  if (user.isEmailVerified) {
    res.status(200).json({
      message: 'Email verified successfully',
      user: serializeUser(user),
    })
    return
  }

  if (
    !user.emailVerificationCodeHash ||
    !user.emailVerificationCodeExpiresAt ||
    user.emailVerificationCodeExpiresAt <= new Date()
  ) {
    throw new AppError(400, 'Verification code is invalid or expired')
  }

  const attempts = user.emailVerificationCodeAttempts ?? 0

  if (attempts >= maxEmailVerificationCodeAttempts) {
    throw new AppError(429, 'Too many invalid attempts. Please request a new verification code.')
  }

  if (hashToken(code) !== user.emailVerificationCodeHash) {
    user.emailVerificationCodeAttempts = attempts + 1
    await user.save()

    if (user.emailVerificationCodeAttempts >= maxEmailVerificationCodeAttempts) {
      throw new AppError(429, 'Too many invalid attempts. Please request a new verification code.')
    }

    throw new AppError(400, 'Invalid verification code')
  }

  user.isEmailVerified = true
  user.emailVerificationCodeHash = undefined
  user.emailVerificationCodeExpiresAt = undefined
  user.emailVerificationCodeAttempts = 0
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
    '+emailVerificationCodeHash +emailVerificationCodeExpiresAt +emailVerificationCodeAttempts',
  )

  if (!user || user.isEmailVerified) {
    res.status(200).json({
      message:
        'If an unverified account exists for this email, a verification email has been sent.',
    })
    return
  }

  const verificationEmail = await issueEmailVerificationCode(user, 'resend')

  res.status(200).json({
    message: verificationEmail.delivered
      ? 'Verification code sent. Please enter it to verify your email.'
      : env.NODE_ENV !== 'production'
        ? 'Verification email could not be sent. Use the development verification code below.'
        : 'Verification email could not be sent. Please try again later.',
    email: user.email,
    devVerificationCode:
      env.NODE_ENV !== 'production' && !verificationEmail.delivered
        ? verificationEmail.code
        : undefined,
  })
}

export async function login(req: Request, res: Response) {
  const { email, password } = parseWithSchema(loginSchema, req.body)
  const user = await UserModel.findOne({ email }).select(
    '+passwordHash +emailVerificationCodeHash +emailVerificationCodeExpiresAt +emailVerificationCodeAttempts',
  )

  if (!user) {
    throw new AppError(401, 'Invalid email or password')
  }

  const passwordMatches = await comparePassword(password, user.passwordHash)

  if (!passwordMatches) {
    throw new AppError(401, 'Invalid email or password')
  }

  await ensureDefaultProfileImage(user)

  if (!user.isEmailVerified) {
    const verificationEmail = await issueEmailVerificationCode(user, 'login')

    res.status(200).json({
      message: verificationEmail.delivered
        ? 'Please enter the 6-digit code sent to your email before logging in.'
        : env.NODE_ENV !== 'production'
          ? 'Please verify your email. Use the development verification code below.'
          : 'Please verify your email. We could not send a new code, so try again later.',
      requiresEmailVerification: true,
      email: user.email,
      devVerificationCode:
        env.NODE_ENV !== 'production' && !verificationEmail.delivered
          ? verificationEmail.code
          : undefined,
    })
    return
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

    await ensureDefaultProfileImage(user)

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

  await ensureDefaultProfileImage(user)

  res.status(200).json({
    user: serializeUser(user),
  })
}

export async function updateMe(req: Request, res: Response) {
  const payload = parseWithSchema(updateProfileSchema, req.body)
  const authUser = res.locals.user

  if (!authUser) {
    throw new AppError(401, 'Authentication required')
  }

  const user = await UserModel.findById(authUser.id).select(
    '+profileImagePublicId',
  )

  if (!user) {
    throw new AppError(401, 'Authentication required')
  }

  if (payload.name) {
    user.name = payload.name
  }

  if (req.file) {
    const previousPublicId =
      user.profileImageSource === 'upload'
        ? user.profileImagePublicId
        : undefined
    const upload = await uploadImageBuffer(
      req.file.buffer,
      `fashion-photos/profiles/${user.id}`,
    )

    user.profileImageUrl = upload.secure_url
    user.profileImagePublicId = upload.public_id
    user.profileImageSource = 'upload'
    await user.save()
    await deleteCloudinaryImage(previousPublicId)
  } else {
    await ensureDefaultProfileImage(user)
    await user.save()
  }

  res.status(200).json({
    message: 'Profile updated successfully',
    user: serializeUser(user),
  })
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = parseWithSchema(emailSchema, req.body)
  const user = await UserModel.findOne({ email }).select(
    '+passwordResetCodeHash +passwordResetCodeExpiresAt +passwordResetCodeAttempts',
  )

  if (user) {
    await issuePasswordResetCode(user, 'forgot-password')

    res.status(200).json({
      message:
        'If that email exists, a password reset code has been sent.',
    })
    return
  }

  res.status(200).json({
    message: 'If that email exists, a password reset code has been sent.',
  })
}

export async function verifyPasswordResetCode(req: Request, res: Response) {
  const { email, code } = parseWithSchema(
    verifyPasswordResetCodeSchema,
    req.body,
  )

  await getUserForPasswordResetCode(email, code)

  res.status(200).json({
    message: 'Code verified. Enter a new password.',
    email,
  })
}

export async function resetPassword(req: Request, res: Response) {
  const { email, code, password } = parseWithSchema(
    resetPasswordSchema,
    req.body,
  )
  const user = await getUserForPasswordResetCode(email, code)

  user.passwordHash = await hashPassword(password)
  user.passwordResetCodeHash = undefined
  user.passwordResetCodeExpiresAt = undefined
  user.passwordResetCodeAttempts = 0
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

  await ensureDefaultProfileImage(user)
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
  await ensureDefaultProfileImage(user)
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

function createEmailVerificationCode() {
  return createSixDigitCode(emailVerificationCodeExpiresMs)
}

function createPasswordResetCode() {
  return createSixDigitCode(passwordResetCodeExpiresMs)
}

function createSixDigitCode(durationMs: number) {
  const code = randomInt(0, 1_000_000).toString().padStart(6, '0')

  return {
    code,
    codeHash: hashToken(code),
    expiresAt: new Date(Date.now() + durationMs),
  }
}

async function issueEmailVerificationCode(
  user: UserDocument,
  context: string,
) {
  const verificationCode = createEmailVerificationCode()
  user.emailVerificationCodeHash = verificationCode.codeHash
  user.emailVerificationCodeExpiresAt = verificationCode.expiresAt
  user.emailVerificationCodeAttempts = 0
  user.emailVerificationTokenHash = undefined
  user.emailVerificationExpiresAt = undefined
  await user.save()

  return sendEmailVerificationCode(user, verificationCode.code, context)
}

async function sendEmailVerificationCode(
  user: UserDocument,
  code: string,
  context: string,
) {
  try {
    const verificationEmail = await sendVerificationCodeEmail({
      to: user.email,
      name: user.name,
      code,
    })

    return {
      delivered: verificationEmail.delivered,
      code,
    }
  } catch (error) {
    console.error(`Verification code delivery failed during ${context}`, error)

    return {
      delivered: false,
      code,
    }
  }
}

async function issuePasswordResetCode(user: UserDocument, context: string) {
  const resetCode = createPasswordResetCode()
  user.passwordResetCodeHash = resetCode.codeHash
  user.passwordResetCodeExpiresAt = resetCode.expiresAt
  user.passwordResetCodeAttempts = 0
  await user.save()

  return sendPasswordResetCode(user, resetCode.code, context)
}

async function sendPasswordResetCode(
  user: UserDocument,
  code: string,
  context: string,
) {
  try {
    const resetEmail = await sendPasswordResetCodeEmail({
      to: user.email,
      name: user.name,
      code,
    })

    return {
      delivered: resetEmail.delivered,
      code,
    }
  } catch (error) {
    console.error(`Password reset code delivery failed during ${context}`, error)

    return {
      delivered: false,
      code,
    }
  }
}

async function getUserForPasswordResetCode(email: string, code: string) {
  const user = await UserModel.findOne({ email }).select(
    '+passwordHash +passwordResetCodeHash +passwordResetCodeExpiresAt +passwordResetCodeAttempts +refreshTokenHash',
  )

  if (!user) {
    throw new AppError(400, 'Password reset code is invalid or expired')
  }

  if (
    !user.passwordResetCodeHash ||
    !user.passwordResetCodeExpiresAt ||
    user.passwordResetCodeExpiresAt <= new Date()
  ) {
    throw new AppError(400, 'Password reset code is invalid or expired')
  }

  const attempts = user.passwordResetCodeAttempts ?? 0

  if (attempts >= maxPasswordResetCodeAttempts) {
    throw new AppError(
      429,
      'Too many invalid attempts. Please request a new password reset code.',
    )
  }

  if (hashToken(code) !== user.passwordResetCodeHash) {
    user.passwordResetCodeAttempts = attempts + 1
    await user.save()

    if (user.passwordResetCodeAttempts >= maxPasswordResetCodeAttempts) {
      throw new AppError(
        429,
        'Too many invalid attempts. Please request a new password reset code.',
      )
    }

    throw new AppError(400, 'Invalid password reset code')
  }

  return user
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
