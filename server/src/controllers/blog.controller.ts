import type { Request, Response } from 'express'
import { z } from 'zod'

import { BlogModel } from '../models/Blog'
import { assertFound } from '../utils/errors'
import { generateSlug } from '../utils/generateSlug'
import { objectIdSchema, parseWithSchema, slugSchema } from '../utils/validation'

const blogSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().max(180).optional(),
  thumbnail: z.string().trim().url(),
  content: z.string().trim().min(1),
  category: z.string().trim().min(1).max(80),
  author: z.string().trim().min(1).max(100),
})

export async function listBlogs(_req: Request, res: Response) {
  const blogs = await BlogModel.find().sort({ createdAt: -1 })
  res.status(200).json({ blogs })
}

export async function getBlog(req: Request, res: Response) {
  const { slug } = parseWithSchema(z.object({ slug: slugSchema }), req.params)
  const blog = assertFound(await BlogModel.findOne({ slug }), 'Blog not found')
  res.status(200).json({ blog })
}

export async function createBlog(req: Request, res: Response) {
  const body = parseWithSchema(blogSchema, req.body)
  const blog = await BlogModel.create({
    ...body,
    slug: body.slug ? generateSlug(body.slug) : generateSlug(body.title),
  })

  res.status(201).json({ message: 'Blog created', blog })
}

export async function updateBlog(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const body = parseWithSchema(blogSchema.partial(), req.body)
  const payload = {
    ...body,
    ...(body.slug || body.title
      ? { slug: generateSlug(body.slug ?? body.title ?? '') }
      : {}),
  }
  const blog = assertFound(
    await BlogModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }),
    'Blog not found',
  )

  res.status(200).json({ message: 'Blog updated', blog })
}

export async function deleteBlog(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  assertFound(await BlogModel.findByIdAndDelete(id), 'Blog not found')
  res.status(200).json({ message: 'Blog deleted' })
}
