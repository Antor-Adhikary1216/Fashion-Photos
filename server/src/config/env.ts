import 'dotenv/config'

import { z } from 'zod'

const emptyStringToUndefined = (value: unknown) =>
  value === '' ? undefined : value

const optionalString = z.preprocess(
  emptyStringToUndefined,
  z.string().optional(),
)

const railwayExternalUrl = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : undefined
const renderExternalUrl = emptyStringToUndefined(process.env.RENDER_EXTERNAL_URL)
const hostingExternalUrl = emptyStringToUndefined(
  renderExternalUrl ?? railwayExternalUrl,
)

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(5000),
  ),
  API_URL: z.preprocess(
    (value) => emptyStringToUndefined(value ?? hostingExternalUrl),
    z.string().url().default('http://localhost:5000'),
  ),
  CLIENT_URL: z.preprocess(
    (value) => emptyStringToUndefined(value ?? hostingExternalUrl),
    z.string().url().default('http://localhost:5173'),
  ),
  MONGO_URI: z.preprocess(
    (value) =>
      emptyStringToUndefined(value ?? process.env.MONGODB_URI),
    z.string().min(1).default('mongodb://127.0.0.1:27017/fashion_photos'),
  ),
  MONGODB_URI: z.preprocess(
    emptyStringToUndefined,
    z.string().optional(),
  ),
  JWT_SECRET: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .min(32, 'JWT_SECRET must be at least 32 characters')
      .default('dev-only-secret-change-me-before-production'),
  ),
  JWT_REFRESH_SECRET: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters')
      .default('dev-only-refresh-secret-change-me-before-prod'),
  ),
  JWT_EXPIRES_IN: z.preprocess(
    emptyStringToUndefined,
    z.string().min(1).default('15m'),
  ),
  JWT_REFRESH_EXPIRES_IN: z.preprocess(
    emptyStringToUndefined,
    z.string().min(1).default('7d'),
  ),
  AUTH_COOKIE_MAX_AGE_DAYS: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().default(7),
  ),
  BCRYPT_SALT_ROUNDS: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().min(4).max(15).default(12),
  ),
  EMAIL_FROM: z.preprocess(
    emptyStringToUndefined,
    z.string().min(1).default('Fashion-Photos <no-reply@example.com>'),
  ),
  EMAIL_HOST: optionalString,
  EMAIL_PORT: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().int().positive().optional(),
  ),
  EMAIL_USER: optionalString,
  EMAIL_PASS: optionalString,
  SMTP_HOST: z.preprocess(
    (value) => emptyStringToUndefined(value ?? process.env.EMAIL_HOST),
    z.string().optional(),
  ),
  SMTP_PORT: z.preprocess(
    (value) => emptyStringToUndefined(value ?? process.env.EMAIL_PORT),
    z.coerce.number().int().positive().default(587),
  ),
  SMTP_SECURE: z
    .preprocess((value) => {
      if (value === '' || value === undefined) {
        return undefined
      }

      if (value === true || value === 'true' || value === '1') {
        return true
      }

      if (value === false || value === 'false' || value === '0') {
        return false
      }

      return value
    }, z.boolean().default(false)),
  SMTP_USER: optionalString,
  SMTP_PASS: optionalString,
  CLOUDINARY_CLOUD_NAME: optionalString,
  CLOUDINARY_API_KEY: optionalString,
  CLOUDINARY_API_SECRET: optionalString,
  MFA_ENCRYPTION_KEY: z.preprocess(
    emptyStringToUndefined,
    z.string().min(16).default('dev-only-mfa-encryption-key-change-me'),
  ),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid environment configuration')
  console.error(parsedEnv.error.flatten().fieldErrors)
  throw new Error('Invalid environment configuration')
}

if (
  parsedEnv.data.NODE_ENV === 'production' &&
  parsedEnv.data.JWT_SECRET === 'dev-only-secret-change-me-before-production'
) {
  throw new Error('JWT_SECRET must be changed in production')
}

if (
  parsedEnv.data.NODE_ENV === 'production' &&
  parsedEnv.data.JWT_REFRESH_SECRET ===
    'dev-only-refresh-secret-change-me-before-prod'
) {
  throw new Error('JWT_REFRESH_SECRET must be changed in production')
}

export const env = {
  ...parsedEnv.data,
  SMTP_HOST: parsedEnv.data.SMTP_HOST ?? parsedEnv.data.EMAIL_HOST,
  SMTP_USER: parsedEnv.data.SMTP_USER ?? parsedEnv.data.EMAIL_USER,
  SMTP_PASS: parsedEnv.data.SMTP_PASS ?? parsedEnv.data.EMAIL_PASS,
}
