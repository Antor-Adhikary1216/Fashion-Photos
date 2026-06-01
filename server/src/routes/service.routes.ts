import { Router } from 'express'

import {
  createService,
  deleteService,
  listServices,
  updateService,
} from '../controllers/service.controller'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const serviceRouter = Router()

serviceRouter.get('/', asyncHandler(listServices))
serviceRouter.post('/', requireAuth, requireAdmin, asyncHandler(createService))
serviceRouter.patch('/:id', requireAuth, requireAdmin, asyncHandler(updateService))
serviceRouter.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteService))
