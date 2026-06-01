import { Router } from 'express'

import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  listAlbums,
  updateAlbum,
} from '../controllers/album.controller'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const albumRouter = Router()

albumRouter.get('/', asyncHandler(listAlbums))
albumRouter.get('/:slug', asyncHandler(getAlbum))
albumRouter.post('/', requireAuth, requireAdmin, asyncHandler(createAlbum))
albumRouter.patch('/:id', requireAuth, requireAdmin, asyncHandler(updateAlbum))
albumRouter.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteAlbum))
