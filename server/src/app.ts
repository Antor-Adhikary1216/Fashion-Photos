import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type RequestHandler } from 'express'
import helmet from 'helmet'

import { env } from './config/env'
import { getDatabaseStatus } from './config/database'
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

const clientDistPath = fileURLToPath(new URL('../../dist', import.meta.url))
const developmentClientOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]
const allowedCorsOrigins = new Set(
  env.NODE_ENV === 'production'
    ? [env.CLIENT_URL]
    : [env.CLIENT_URL, ...developmentClientOrigins],
)

const corsOrigin = (
  origin: string | undefined,
  callback: (error: Error | null, origin?: boolean | string) => void,
) => {
  if (!origin) {
    callback(null, true)
    return
  }

  callback(null, allowedCorsOrigins.has(origin) ? origin : false)
}

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https:'],
      },
    },
  }),
)
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(sanitizeBody)
app.use('/api', apiLimiter)

app.get('/api/health', (_req, res) => {
  const database = getDatabaseStatus()

  res.status(200).json({
    status: database.status === 'connected' ? 'ok' : 'degraded',
    database,
  })
})

const requireDatabase: RequestHandler = (_req, res, next) => {
  const database = getDatabaseStatus()

  if (database.status !== 'connected') {
    res.status(503).json({
      message: 'Database connection unavailable. Try again after MongoDB connects.',
      database,
    })
    return
  }

  next()
}

app.use('/api/auth', requireDatabase, authRouter)
app.use('/api/photos', requireDatabase, photoRouter)
app.use('/api/albums', requireDatabase, albumRouter)
app.use('/api/bookings', requireDatabase, bookingRouter)
app.use('/api/services', requireDatabase, serviceRouter)
app.use('/api/testimonials', requireDatabase, testimonialRouter)
app.use('/api/blogs', requireDatabase, blogRouter)
app.use('/api/admin', requireDatabase, dashboardRouter)

if (env.NODE_ENV === 'production' && existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath))
  app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
}

app.use(notFoundHandler)
app.use(errorHandler)
