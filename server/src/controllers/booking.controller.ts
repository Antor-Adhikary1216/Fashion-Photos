import type { Request, Response } from 'express'
import { z } from 'zod'

import { env } from '../config/env'
import { BookingModel, type BookingDocument } from '../models/Booking'
import { UserModel } from '../models/User'
import {
  sendBookingConfirmationEmail,
  sendBookingNotificationEmail,
} from '../services/email.service'
import { assertFound } from '../utils/errors'
import { getAccessTokenFromRequest, verifyAccessToken } from '../utils/tokens'
import {
  objectIdSchema,
  parseWithSchema,
  toLowerCase,
} from '../utils/validation'

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

  void sendBookingNotification(booking).catch((error: unknown) => {
    console.error('Booking notification email delivery failed', error)
  })

  void sendBookingConfirmation(req, booking).catch((error: unknown) => {
    console.error('Booking confirmation email delivery failed', error)
  })

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

async function sendBookingNotification(
  booking: BookingDocument,
) {
  const recipients = await getBookingNotificationRecipients()

  if (recipients.length === 0) {
    console.warn('Booking notification email skipped: no recipient configured')
    return
  }

  await sendBookingNotificationEmail({
    to: recipients,
    booking: {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      serviceType: booking.serviceType,
      shootDate: booking.shootDate,
      location: booking.location,
      budget: booking.budget,
      message: booking.message,
      createdAt: booking.createdAt,
    },
  })
}

async function sendBookingConfirmation(
  req: Request,
  booking: BookingDocument,
) {
  const to = await getBookingConfirmationRecipient(req, booking)

  await sendBookingConfirmationEmail({
    to,
    booking: {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      serviceType: booking.serviceType,
      shootDate: booking.shootDate,
      location: booking.location,
      budget: booking.budget,
      message: booking.message,
      createdAt: booking.createdAt,
    },
  })
}

async function getBookingNotificationRecipients() {
  const adminUsers = await UserModel.find({ role: 'admin' }).select('email')
  const recipients = [
    ...adminUsers.map((user) => user.email),
    env.BOOKING_NOTIFICATION_EMAIL,
    env.SMTP_USER,
    env.EMAIL_USER,
  ].filter((email): email is string => Boolean(email))

  return [...new Set(recipients)]
}

async function getBookingConfirmationRecipient(
  req: Request,
  booking: BookingDocument,
) {
  const token = getAccessTokenFromRequest(req)

  if (!token) {
    return booking.email
  }

  try {
    const payload = verifyAccessToken(token)
    const user = await UserModel.findById(payload.sub).select('email')

    return user?.email ?? booking.email
  } catch {
    return booking.email
  }
}
