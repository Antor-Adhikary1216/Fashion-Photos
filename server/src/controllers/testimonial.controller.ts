import type { Request, Response } from 'express'
import { z } from 'zod'

import { TestimonialModel } from '../models/Testimonial'
import { assertFound } from '../utils/errors'
import { objectIdSchema, parseWithSchema } from '../utils/validation'

const testimonialSchema = z.object({
  clientName: z.string().trim().min(1).max(100),
  clientImage: z.string().trim().url().optional().or(z.literal('')),
  review: z.string().trim().min(1).max(1000),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  projectType: z.string().trim().min(1).max(100),
})

export async function listTestimonials(_req: Request, res: Response) {
  const testimonials = await TestimonialModel.find().sort({ createdAt: -1 })
  res.status(200).json({ testimonials })
}

export async function createTestimonial(req: Request, res: Response) {
  const body = parseWithSchema(testimonialSchema, req.body)
  const testimonial = await TestimonialModel.create(body)
  res.status(201).json({ message: 'Testimonial created', testimonial })
}

export async function updateTestimonial(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const body = parseWithSchema(testimonialSchema.partial(), req.body)
  const testimonial = assertFound(
    await TestimonialModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }),
    'Testimonial not found',
  )

  res.status(200).json({ message: 'Testimonial updated', testimonial })
}

export async function deleteTestimonial(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  assertFound(
    await TestimonialModel.findByIdAndDelete(id),
    'Testimonial not found',
  )
  res.status(200).json({ message: 'Testimonial deleted' })
}
