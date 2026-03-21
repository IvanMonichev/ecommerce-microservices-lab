import express from 'express'
import { Logger, logger } from '@repo/common'

import { connectMongo } from './config/mongo.js'
import { getEnv } from './config/env.js'
import { startProductsGrpcServer } from './grpc/server.js'
import { ProductRepo } from './modules/product/product.repo.js'
import { productRouter } from './modules/product/product.routes.js'
import { ProductService } from './modules/product/product.service.js'

export function createApp(logger: Logger) {
  const app = express()

  app.use(express.json({ limit: '1mb' }))

  app.use('/api/products', productRouter())

  return app
}

async function bootstrap() {
  const env = getEnv()

  await connectMongo(env.productMongoUri, logger)
  logger.info('🗄 Подключение к MongoDB установлено')

  const app = createApp(logger)

  app.listen(Number(env.productPort), () => {
    logger.info(`🚀 Сервер на http://localhost:${env.productPort} запущен!`)
  })

  startProductsGrpcServer({
    productService: new ProductService(new ProductRepo()),
    host: env.grpcHost
  })
}

bootstrap()
