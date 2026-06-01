import type { Request, Response } from 'express'
import { z } from 'zod'

import { ServiceModel } from '../models/Service'
import { assertFound } from '../utils/errors'
import { objectIdSchema, parseWithSchema } from '../utils/validation'

const serviceSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(1000),
  price: z.string().trim().min(1).max(80),
  duration: z.string().trim().min(1).max(80),
  image: z.string().trim().url(),
  features: z.array(z.string().trim().min(1)).default([]),
})

export async function listServices(_req: Request, res: Response) {
  const services = await ServiceModel.find().sort({ createdAt: -1 })
  res.status(200).json({ services })
}

export async function createService(req: Request, res: Response) {
  const body = parseWithSchema(serviceSchema, req.body)
  const service = await ServiceModel.create(body)
  res.status(201).json({ message: 'Service created', service })
}

export async function updateService(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const body = parseWithSchema(serviceSchema.partial(), req.body)
  const service = assertFound(
    await ServiceModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }),
    'Service not found',
  )

  res.status(200).json({ message: 'Service updated', service })
}

export async function deleteService(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  assertFound(await ServiceModel.findByIdAndDelete(id), 'Service not found')
  res.status(200).json({ message: 'Service deleted' })
}
