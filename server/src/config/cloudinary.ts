import { v2 as cloudinary } from 'cloudinary'

import { env } from './env'
import { AppError } from '../utils/errors'

function hasCloudinaryValue(value?: string) {
  const normalizedValue = value?.trim()

  return Boolean(
    normalizedValue &&
      !normalizedValue.startsWith('your_') &&
      normalizedValue !== 'replace-this',
  )
}

const isConfigured = Boolean(
  hasCloudinaryValue(env.CLOUDINARY_CLOUD_NAME) &&
    hasCloudinaryValue(env.CLOUDINARY_API_KEY) &&
    hasCloudinaryValue(env.CLOUDINARY_API_SECRET),
)

if (isConfigured) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  })
}

export function ensureCloudinaryConfigured() {
  if (!isConfigured) {
    throw new AppError(
      500,
      'Cloudinary is not configured. Add real Cloudinary credentials to enable image uploads.',
    )
  }
}

export { cloudinary }
