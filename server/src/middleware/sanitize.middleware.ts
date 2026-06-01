import type { NextFunction, Request, Response } from 'express'

export function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    req.body = stripUnsafeKeys(req.body)
  }

  next()
}

function stripUnsafeKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripUnsafeKeys)
  }

  if (!isPlainObject(value)) {
    return value
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !key.startsWith('$') && !key.includes('.'))
      .map(([key, nestedValue]) => [key, stripUnsafeKeys(nestedValue)]),
  )
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}
