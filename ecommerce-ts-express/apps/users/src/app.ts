import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { Logger, notFoundMiddleware } from '@repo/common'
import { httpLoggerMiddleware, requestIdMiddleware } from '@repo/common'
import { initCollections } from './initial-collections.js'

import { usersRouter } from './modules/user.routes.js'
import { errorMiddleware } from './shared/middleware/error.middleware.js'
import { connectMongo } from './config/mongo.js'
import { getEnv } from './config/env.js'

export function createApp(logger: Logger) {
  const app = express()

  app.use(requestIdMiddleware())
  app.use(httpLoggerMiddleware(logger))
  app.use(express.json({ limit: '1mb' }))

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.get('/ready', (_req, res) => {
    const ready = mongoose.connection.readyState === 1
    res.status(ready ? 200 : 503).json({ ready })
  })

  app.use('/api/users', usersRouter())

  app.use(notFoundMiddleware)
  app.use(errorMiddleware)

  return app
}

async function bootstrap() {
  const env = getEnv()
  const logger = (await import('@repo/common')).createLogger({ service: env.serviceName })

  await connectMongo(env.mongoUri, logger)
  await initCollections(logger)
  logger.info('🗄 Подключение к MongoDB установлено')

  const app = createApp(logger)

  app.listen(env.port, () => {
    logger.info( `🚀 Сервер на http://localhost:${env.port} запущен!`)
  })
}

bootstrap()