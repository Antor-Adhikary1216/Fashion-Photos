import { Router } from 'express'

import {
  createBooking,
  deleteBooking,
  getBooking,
  listBookings,
  updateBooking,
} from '../controllers/booking.controller'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const bookingRouter = Router()

bookingRouter.post('/', asyncHandler(createBooking))
bookingRouter.get('/', requireAuth, requireAdmin, asyncHandler(listBookings))
bookingRouter.get('/:id', requireAuth, requireAdmin, asyncHandler(getBooking))
bookingRouter.patch('/:id', requireAuth, requireAdmin, asyncHandler(updateBooking))
bookingRouter.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteBooking))
