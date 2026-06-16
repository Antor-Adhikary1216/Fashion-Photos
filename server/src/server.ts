import { app } from './app'
import { connectDatabase } from './config/database'
import { env } from './config/env'

const databaseReconnectDelayMs = 10_000

async function connectDatabaseWithRetry() {
  try {
    await connectDatabase()
  } catch (error: unknown) {
    console.error('MongoDB connection failed; API server is running in degraded mode')
    console.error(error)
    console.warn(
      `Retrying MongoDB connection in ${databaseReconnectDelayMs / 1000} seconds`,
    )

    const retryTimer = setTimeout(() => {
      void connectDatabaseWithRetry()
    }, databaseReconnectDelayMs)
    retryTimer.unref?.()
  }
}

async function startServer() {
  app.listen(env.PORT, () => {
    console.log(`API server listening on ${env.API_URL}`)
  })

  void connectDatabaseWithRetry()
}

startServer().catch((error: unknown) => {
  console.error('Failed to start API server')
  console.error(error)
  process.exit(1)
})
