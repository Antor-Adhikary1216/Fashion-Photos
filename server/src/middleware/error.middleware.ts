import type { NextFunction, Request, Response } from 'express'

import { AppError } from '../utils/errors'

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  void next

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    })
    return
  }

  if (isDuplicateKeyError(error)) {
    res.status(409).json({ message: 'Resource already exists' })
    return
  }

  console.error(error)
  res.status(500).json({ message: 'Internal server error' })
}

function isDuplicateKeyError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  )
}
