import { z } from 'zod'

import { AppError } from './errors'

export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id')
export const slugSchema = z.string().trim().min(1).max(160)

export function parseWithSchema<TSchema extends z.ZodType>(
  schema: TSchema,
  value: unknown,
): z.infer<TSchema> {
  const result = schema.safeParse(value)

  if (!result.success) {
    throw new AppError(400, 'Invalid request data', result.error.issues)
  }

  return result.data
}

export const strongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/\d/, 'Password must include a number')
  .regex(/[^A-Za-z0-9]/, 'Password must include a special character')

export function toLowerCase(value: string) {
  return value.toLowerCase()
}
