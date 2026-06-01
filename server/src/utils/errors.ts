export class AppError extends Error {
  readonly statusCode: number
  readonly details?: unknown

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message)
    this.statusCode = statusCode
    this.details = details
  }
}

export function assertFound<T>(
  value: T,
  message = 'Resource not found',
): NonNullable<T> {
  if (!value) {
    throw new AppError(404, message)
  }

  return value as NonNullable<T>
}
