import { app } from './app'
import { connectDatabase } from './config/database'
import { env } from './config/env'

async function startServer() {
  await connectDatabase()

  app.listen(env.PORT, () => {
    console.log(`API server listening on ${env.API_URL}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Failed to start API server')
  console.error(error)
  process.exit(1)
})
