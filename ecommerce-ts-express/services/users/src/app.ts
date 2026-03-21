import express from 'express'
import { initCollections } from './initial-collections.js'
import { usersRouter } from './modules/user/user.routes.js'

import { connectMongo } from './config/mongo.js'
import { getEnv } from './config/env.js'
import { logger } from '@repo/common'

export function createApp() {
  const app = express()

  app.use(express.json({ limit: '1mb' }))

  app.use('/api/users', usersRouter())

  return app
}

async function bootstrap() {
  const env = getEnv()

  await connectMongo(env.mongoUri, logger)
  await initCollections(logger)
  logger.info('🗄 Подключение к MongoDB установлено')

  const app = createApp()

  app.listen(env.port, () => {
    logger.info(`🚀 Сервер на http://localhost:${env.port} запущен!`)
  })
}

bootstrap()
