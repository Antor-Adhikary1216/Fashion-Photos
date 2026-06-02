import type { Request } from 'express'
import jwt from 'jsonwebtoken'

import { UserModel } from '../models/User'
import { AppError } from './errors'
import { getAccessTokenFromRequest, verifyAccessToken } from './tokens'

const { JsonWebTokenError, TokenExpiredError } = jwt

export async function getAuthenticatedUser(req: Request) {
  const token = getAccessTokenFromRequest(req)

  if (!token) {
    throw new AppError(401, 'Authentication required')
  }

  try {
    const payload = verifyAccessToken(token)
    const user = await UserModel.findById(payload.sub)

    if (!user) {
      throw new AppError(401, 'Authentication required')
    }

    return user
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error
    }

    if (error instanceof TokenExpiredError) {
      throw new AppError(401, 'Authentication token expired')
    }

    if (error instanceof JsonWebTokenError) {
      throw new AppError(401, 'Invalid authentication token')
    }

    throw error
  }
}
