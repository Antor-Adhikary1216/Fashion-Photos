import { Router } from 'express'

import {
  createPhoto,
  deletePhoto,
  getPhoto,
  listPhotos,
  updatePhoto,
} from '../controllers/photo.controller'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware'
import { upload } from '../middleware/upload.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const photoRouter = Router()

photoRouter.get('/', asyncHandler(listPhotos))
photoRouter.get('/:id', asyncHandler(getPhoto))
photoRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  asyncHandler(createPhoto),
)
photoRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  asyncHandler(updatePhoto),
)
photoRouter.delete('/:id', requireAuth, requireAdmin, asyncHandler(deletePhoto))
