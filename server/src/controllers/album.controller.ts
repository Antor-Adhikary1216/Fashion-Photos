import type { Request, Response } from 'express'
import { z } from 'zod'

import { AlbumModel } from '../models/Album'
import { PhotoModel } from '../models/Photo'
import { assertFound } from '../utils/errors'
import { generateSlug } from '../utils/generateSlug'
import { objectIdSchema, parseWithSchema, slugSchema } from '../utils/validation'

const albumSchema = z.object({
  title: z.string().trim().min(1).max(140),
  slug: z.string().trim().max(160).optional(),
  category: z.string().trim().min(1).max(80),
  coverImage: z.string().trim().url(),
  description: z.string().trim().max(2000).default(''),
  date: optionalDate(),
  location: z.string().trim().max(140).default(''),
  isPrivate: z.coerce.boolean().default(false),
})

const updateAlbumSchema = albumSchema.partial()

export async function listAlbums(_req: Request, res: Response) {
  const albums = await AlbumModel.find({ isPrivate: false }).sort({
    date: -1,
    createdAt: -1,
  })

  res.status(200).json({ albums })
}

export async function getAlbum(req: Request, res: Response) {
  const { slug } = parseWithSchema(z.object({ slug: slugSchema }), req.params)
  const album = assertFound(await AlbumModel.findOne({ slug }), 'Album not found')
  const photos = await PhotoModel.find({ album: album.id }).sort({ createdAt: -1 })

  res.status(200).json({ album, photos })
}

export async function createAlbum(req: Request, res: Response) {
  const body = parseWithSchema(albumSchema, req.body)
  const album = await AlbumModel.create({
    ...body,
    slug: body.slug ? generateSlug(body.slug) : generateSlug(body.title),
  })

  res.status(201).json({ message: 'Album created', album })
}

export async function updateAlbum(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const body = parseWithSchema(updateAlbumSchema, req.body)
  const payload = {
    ...body,
    ...(body.slug || body.title
      ? { slug: generateSlug(body.slug ?? body.title ?? '') }
      : {}),
  }
  const album = assertFound(
    await AlbumModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }),
    'Album not found',
  )

  res.status(200).json({ message: 'Album updated', album })
}

export async function deleteAlbum(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  assertFound(await AlbumModel.findByIdAndDelete(id), 'Album not found')
  await PhotoModel.updateMany({ album: id }, { $unset: { album: '' } })

  res.status(200).json({ message: 'Album deleted' })
}

function optionalDate() {
  return z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce.date().optional(),
  )
}
