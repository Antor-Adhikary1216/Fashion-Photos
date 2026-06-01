import { Router } from 'express'

import { getDashboardStats } from '../controllers/dashboard.controller'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const dashboardRouter = Router()

dashboardRouter.get('/stats', requireAuth, requireAdmin, asyncHandler(getDashboardStats))
