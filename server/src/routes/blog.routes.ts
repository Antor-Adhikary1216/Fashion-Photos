import { Router } from 'express'

import {
  createBlog,
  deleteBlog,
  getBlog,
  listBlogs,
  updateBlog,
} from '../controllers/blog.controller'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler'

export const blogRouter = Router()

blogRouter.get('/', asyncHandler(listBlogs))
blogRouter.get('/:slug', asyncHandler(getBlog))
blogRouter.post('/', requireAuth, requireAdmin, asyncHandler(createBlog))
blogRouter.patch('/:id', requireAuth, requireAdmin, asyncHandler(updateBlog))
blogRouter.delete('/:id', requireAuth, requireAdmin, asyncHandler(deleteBlog))
