import express from 'express'
import 'dotenv/config'
import { errorMiddleware, Logger, notFoundMiddleware } from '@repo/common'
import { httpLoggerMiddleware, requestIdMiddleware } from '@repo/common'

import { connectMongo } from './config/mongo.js'
import { getEnv } from './config/env.js'
import { startProductsGrpcServer } from './grpc/server.js'
import { ProductRepo } from './modules/user/product.repo.js'
import { productRouter } from './modules/user/product.routes.js'
import { ProductService } from './modules/user/product.service.js'

export function createApp(logger: Logger) {
  const app = express()

  app.use(requestIdMiddleware())
  app.use(httpLoggerMiddleware(logger))
  app.use(express.json({ limit: '1mb' }))

  app.use('/api/products', productRouter())

  app.use(notFoundMiddleware)
  app.use(errorMiddleware(logger))

  return app
}

async function bootstrap() {
  const env = getEnv()
  const logger = (await import('@repo/common')).createLogger({
    service: env.serviceName
  })

  await connectMongo(env.mongoUri, logger)
  logger.info('🗄 Подключение к MongoDB установлено')

  const app = createApp(logger)

  app.listen(env.port, () => {
    logger.info(`🚀 Сервер на http://localhost:${env.port} запущен!`)
  })

  startProductsGrpcServer({
    productService: new ProductService(new ProductRepo()),
    host: process.env.GRPC_HOST ?? '0.0.0.0:50051'
  })
}

bootstrap()
