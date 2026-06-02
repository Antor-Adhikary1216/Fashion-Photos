import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { UserModel, type UserDocument } from '../models/User'
import { AppError } from '../utils/errors'
import { getAccessTokenFromRequest, verifyAccessToken } from '../utils/tokens'

const { JsonWebTokenError, TokenExpiredError } = jwt

type AuthLocals = {
  user: UserDocument
  auth: {
    userId: string
    mfaVerified: boolean
  }
}

export async function requireAuth(
  req: Request,
  res: Response<unknown, Partial<AuthLocals>>,
  next: NextFunction,
) {
  try {
    const token = getAccessTokenFromRequest(req)

    if (!token) {
      throw new AppError(401, 'Authentication required')
    }

    const payload = verifyAccessToken(token)
    const user = await UserModel.findById(payload.sub)

    if (!user) {
      throw new AppError(401, 'Authentication required')
    }

    if (!user.isEmailVerified) {
      throw new AppError(403, 'Please verify your email before continuing')
    }

    res.locals.user = user
    res.locals.auth = {
      userId: payload.sub,
      mfaVerified: payload.mfaVerified,
    }

    next()
  } catch (error: unknown) {
    next(mapAuthError(error))
  }
}

export function requireAdmin(
  _req: Request,
  res: Response<unknown, Partial<AuthLocals>>,
  next: NextFunction,
) {
  try {
    const user = res.locals.user
    const auth = res.locals.auth

    if (!user || user.role !== 'admin') {
      throw new AppError(403, 'Admin access required')
    }

    if (!user.mfa.enabled) {
      throw new AppError(403, 'Admin accounts must enable MFA')
    }

    if (!auth?.mfaVerified) {
      throw new AppError(403, 'MFA verification required for admin access')
    }

    next()
  } catch (error: unknown) {
    next(error)
  }
}

function mapAuthError(error: unknown) {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof TokenExpiredError) {
    return new AppError(401, 'Authentication token expired')
  }

  if (error instanceof JsonWebTokenError) {
    return new AppError(401, 'Invalid authentication token')
  }

  return error
}
