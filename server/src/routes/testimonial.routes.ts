import { Router } from 'express'

import {
  createTestimonial,
  deleteTestimonial,
  listTestimonials,
  updateTestimonial,
} from '../controllers/testimonial.controller'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const testimonialRouter = Router()

testimonialRouter.get('/', asyncHandler(listTestimonials))
testimonialRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  asyncHandler(createTestimonial),
)
testimonialRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  asyncHandler(updateTestimonial),
)
testimonialRouter.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  asyncHandler(deleteTestimonial),
)
