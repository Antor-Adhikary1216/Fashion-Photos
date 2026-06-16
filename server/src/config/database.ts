import mongoose from 'mongoose'

import { env } from './env'

const connectionStates: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
  99: 'uninitialized',
}

let listenersRegistered = false
let connectionPromise: Promise<typeof mongoose> | null = null

export async function connectDatabase() {
  if (!listenersRegistered) {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected')
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected')
    })

    listenersRegistered = true
  }

  if (mongoose.connection.readyState === 1) {
    return
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(env.MONGO_URI).finally(() => {
      connectionPromise = null
    })
  }

  await connectionPromise
}

export function getDatabaseStatus() {
  const readyState = mongoose.connection.readyState

  return {
    readyState,
    status: connectionStates[readyState] ?? 'unknown',
  }
}
