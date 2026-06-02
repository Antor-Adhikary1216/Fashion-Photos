import { createHash, randomBytes } from 'node:crypto'

import type { Request } from 'express'
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken'

import { env } from '../config/env'
import { AppError } from './errors'

export const REFRESH_COOKIE_NAME = 'fashion_photos_refresh'

export type AccessTokenPayload = {
  sub: string
  mfaVerified: boolean
}

export type MfaChallengePayload = {
  sub: string
  purpose: 'mfa-login'
}

export function createEmailVerificationToken() {
  return createExpiringToken(30 * 60 * 1000)
}

export function createPasswordResetToken() {
  return createExpiringToken(30 * 60 * 1000)
}

export function createRefreshTokenValue() {
  return randomBytes(48).toString('hex')
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export function signAccessToken(userId: string, mfaVerified: boolean) {
  return jwt.sign(
    { sub: userId, mfaVerified },
    env.JWT_SECRET,
    jwtOptions(env.JWT_EXPIRES_IN),
  )
}

export function signRefreshToken(userId: string, tokenId: string) {
  return jwt.sign(
    { sub: userId, jti: tokenId },
    env.JWT_REFRESH_SECRET,
    jwtOptions(env.JWT_REFRESH_EXPIRES_IN),
  )
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET)

  if (!isAccessPayload(decoded)) {
    throw new AppError(401, 'Invalid authentication token')
  }

  return decoded
}

export function verifyRefreshToken(token: string) {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET)

  if (!isJwtPayloadWithSubject(decoded)) {
    throw new AppError(401, 'Invalid refresh token')
  }

  return decoded
}

export function signMfaChallengeToken(userId: string) {
  return jwt.sign(
    { sub: userId, purpose: 'mfa-login' },
    env.JWT_SECRET,
    jwtOptions('10m'),
  )
}

export function verifyMfaChallengeToken(token: string): MfaChallengePayload {
  const decoded = jwt.verify(token, env.JWT_SECRET)

  if (!isMfaChallengePayload(decoded)) {
    throw new AppError(401, 'Invalid MFA challenge')
  }

  return decoded
}

export function getAccessTokenFromRequest(req: Request) {
  const authorization = req.header('authorization')

  if (authorization?.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length).trim()
  }

  return null
}

function createExpiringToken(durationMs: number) {
  const token = randomBytes(32).toString('hex')

  return {
    token,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + durationMs),
  }
}

function jwtOptions(expiresIn: string): SignOptions {
  return { expiresIn: expiresIn as SignOptions['expiresIn'] }
}

function isJwtPayloadWithSubject(
  decoded: string | JwtPayload,
): decoded is JwtPayload & { sub: string } {
  return (
    typeof decoded === 'object' &&
    decoded !== null &&
    typeof decoded.sub === 'string' &&
    decoded.sub.length > 0
  )
}

function isAccessPayload(
  decoded: string | JwtPayload,
): decoded is JwtPayload & AccessTokenPayload {
  return (
    isJwtPayloadWithSubject(decoded) &&
    typeof decoded.mfaVerified === 'boolean'
  )
}

function isMfaChallengePayload(
  decoded: string | JwtPayload,
): decoded is JwtPayload & MfaChallengePayload {
  return (
    isJwtPayloadWithSubject(decoded) &&
    decoded.purpose === 'mfa-login'
  )
}
