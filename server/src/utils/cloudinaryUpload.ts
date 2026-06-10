import type { UploadApiResponse } from 'cloudinary'

import { cloudinary, ensureCloudinaryConfigured } from '../config/cloudinary'
import { AppError } from './errors'

export async function uploadImageBuffer(
  buffer: Buffer,
  folder = 'fashion-photos',
) {
  ensureCloudinaryConfigured()

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) {
          reject(
            new AppError(
              502,
              'Image upload failed. Check the Cloudinary configuration.',
            ),
          )
          return
        }

        resolve(result)
      },
    )

    uploadStream.end(buffer)
  })
}

export async function deleteCloudinaryImage(publicId?: string) {
  if (!publicId) {
    return
  }

  ensureCloudinaryConfigured()
  await cloudinary.uploader.destroy(publicId)
}
