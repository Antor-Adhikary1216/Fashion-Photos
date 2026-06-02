import type { Request, Response } from 'express'
import { z } from 'zod'

import { PhotoModel } from '../models/Photo'
import { deleteCloudinaryImage, uploadImageBuffer } from '../utils/cloudinaryUpload'
import { AppError, assertFound } from '../utils/errors'
import { objectIdSchema, parseWithSchema } from '../utils/validation'

const photoSchema = z.object({
  title: z.string().trim().min(1).max(140),
  imageUrl: optionalText(),
  publicId: optionalText(),
  category: z.string().trim().min(1).max(80),
  album: optionalObjectId(),
  location: optionalText(),
  camera: optionalText(),
  lens: optionalText(),
  description: optionalText(),
  isFeatured: z.coerce.boolean().default(false),
})

const updatePhotoSchema = photoSchema.partial()

export async function listPhotos(req: Request, res: Response) {
  const query = z
    .object({
      category: optionalText(),
      featured: z.coerce.boolean().optional(),
      album: optionalObjectId(),
    })
    .parse(req.query)

  const filters = {
    ...(query.category ? { category: query.category } : {}),
    ...(typeof query.featured === 'boolean'
      ? { isFeatured: query.featured }
      : {}),
    ...(query.album ? { album: query.album } : {}),
  }

  const photos = await PhotoModel.find(filters)
    .sort({ createdAt: -1 })
    .populate('album', 'title slug')

  res.status(200).json({ photos })
}

export async function getPhoto(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const photo = assertFound(
    await PhotoModel.findById(id).populate('album', 'title slug'),
    'Photo not found',
  )

  res.status(200).json({ photo })
}

export async function createPhoto(req: Request, res: Response) {
  const payload = await buildPhotoPayload(req, photoSchema, true)
  const photo = await PhotoModel.create(payload)

  res.status(201).json({ message: 'Photo created', photo })
}

export async function updatePhoto(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const existingPhoto = assertFound(await PhotoModel.findById(id), 'Photo not found')
  const payload = await buildPhotoPayload(req, updatePhotoSchema, false)

  if (payload.publicId && existingPhoto.publicId !== payload.publicId) {
    await deleteCloudinaryImage(existingPhoto.publicId)
  }

  const photo = assertFound(
    await PhotoModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }),
    'Photo not found',
  )

  res.status(200).json({ message: 'Photo updated', photo })
}

export async function deletePhoto(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const photo = assertFound(await PhotoModel.findByIdAndDelete(id), 'Photo not found')

  await deleteCloudinaryImage(photo.publicId)

  res.status(200).json({ message: 'Photo deleted' })
}

async function buildPhotoPayload<TSchema extends z.ZodType>(
  req: Request,
  schema: TSchema,
  requireImage: boolean,
) {
  const payload = parseWithSchema(schema, req.body) as z.infer<typeof photoSchema>

  if (req.file) {
    const upload = await uploadImageBuffer(req.file.buffer, 'fashion-photos/photos')
    payload.imageUrl = upload.secure_url
    payload.publicId = upload.public_id
  }

  if (requireImage && !payload.imageUrl) {
    throw new AppError(400, 'Photo image is required')
  }

  return payload
}

function optionalText() {
  return z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().trim().optional(),
  )
}

function optionalObjectId() {
  return z.preprocess(
    (value) => (value === '' ? undefined : value),
    objectIdSchema.optional(),
  )
}
