import mongoose from 'mongoose'

import { env } from './env'

export async function connectDatabase() {
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected')
  })

  await mongoose.connect(env.MONGO_URI)
  console.log('MongoDB connected')
}
