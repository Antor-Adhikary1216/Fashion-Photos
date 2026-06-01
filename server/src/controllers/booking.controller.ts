import type { Request, Response } from 'express'
import { z } from 'zod'

import { BookingModel } from '../models/Booking'
import { assertFound } from '../utils/errors'
import { objectIdSchema, parseWithSchema, toLowerCase } from '../utils/validation'

const bookingSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().transform(toLowerCase),
  phone: z.string().trim().min(3).max(40),
  serviceType: z.string().trim().min(1).max(100),
  shootDate: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce.date().optional(),
  ),
  location: z.string().trim().min(1).max(160),
  budget: z.string().trim().max(80).default(''),
  message: z.string().trim().min(1).max(2000),
})

const bookingStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
})

export async function createBooking(req: Request, res: Response) {
  const body = parseWithSchema(bookingSchema, req.body)
  const booking = await BookingModel.create(body)

  res.status(201).json({
    message: 'Booking request received',
    booking,
  })
}

export async function listBookings(_req: Request, res: Response) {
  const bookings = await BookingModel.find().sort({ createdAt: -1 })
  res.status(200).json({ bookings })
}

export async function getBooking(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const booking = assertFound(await BookingModel.findById(id), 'Booking not found')
  res.status(200).json({ booking })
}

export async function updateBooking(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  const body = parseWithSchema(bookingStatusSchema, req.body)
  const booking = assertFound(
    await BookingModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }),
    'Booking not found',
  )

  res.status(200).json({ message: 'Booking updated', booking })
}

export async function deleteBooking(req: Request, res: Response) {
  const { id } = parseWithSchema(z.object({ id: objectIdSchema }), req.params)
  assertFound(await BookingModel.findByIdAndDelete(id), 'Booking not found')
  res.status(200).json({ message: 'Booking deleted' })
}
