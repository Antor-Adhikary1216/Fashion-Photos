import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { env } from './config/env'
import {
  errorHandler,
  notFoundHandler,
} from './middleware/error.middleware'
import { sanitizeBody } from './middleware/sanitize.middleware'
import { apiLimiter } from './middleware/rateLimit.middleware'
import { albumRouter } from './routes/album.routes'
import { authRouter } from './routes/auth.routes'
import { blogRouter } from './routes/blog.routes'
import { bookingRouter } from './routes/booking.routes'
import { dashboardRouter } from './routes/dashboard.routes'
import { photoRouter } from './routes/photo.routes'
import { serviceRouter } from './routes/service.routes'
import { testimonialRouter } from './routes/testimonial.routes'

export const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(sanitizeBody)
app.use('/api', apiLimiter)

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/photos', photoRouter)
app.use('/api/albums', albumRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/services', serviceRouter)
app.use('/api/testimonials', testimonialRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/admin', dashboardRouter)

app.use(notFoundHandler)
app.use(errorHandler)
