import 'reflect-metadata'

import express from 'express'
import 'dotenv/config'

import { errorMiddleware, Logger, notFoundMiddleware } from '@repo/common'
import { httpLoggerMiddleware, requestIdMiddleware } from '@repo/common'

import { getEnv } from './config/env.js'
import { AppDataSource } from './config/postgres.js'
import { ProductsGrpcClient } from './grpc/products.client.js'
import { OrderController } from './modules/order/order.controller.js'
import { OrderRepo } from './modules/order/order.repo.js'
import { ordersRouter } from './modules/order/order.route.js'
import { OrderService } from './modules/order/order.service.js'
import { startStatusUpdateConsumer } from './rabbit/status-update.consumer.js'

export async function createApp(logger: Logger) {
  const app = express()

  app.use(requestIdMiddleware())
  app.use(httpLoggerMiddleware(logger))
  app.use(express.json({ limit: '1mb' }))

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.get('/ready', async (_req, res) => {
    try {
      if (!AppDataSource.isInitialized) {
        return res.status(503).json({ ready: false })
      }

      await AppDataSource.query('SELECT 1')
      return res.status(200).json({ ready: true })
    } catch {
      return res.status(503).json({ ready: false })
    }
  })

  const repo = new OrderRepo()
  const env = getEnv()
  const productsClient = new ProductsGrpcClient(env.productsGrpcAddress)
  const service = new OrderService(repo, productsClient)
  const controller = new OrderController(service)
  await startStatusUpdateConsumer(new OrderRepo())

  app.use('/api/orders', ordersRouter(controller))

  app.use(notFoundMiddleware)
  app.use(errorMiddleware(logger))

  return app
}

async function bootstrap() {
  const env = getEnv()
  const logger = (await import('@repo/common')).createLogger({
    service: env.serviceName
  })

  await AppDataSource.initialize()
  logger.info('🗄 Подключение к Postgres установлено')

  const app = await createApp(logger)

  const server = app.listen(env.port, () => {
    logger.info(`🚀 Сервер на http://localhost:${env.port} запущен!`)
  })

  const shutdown = async (signal: string) => {
    try {
      logger.info(`🛑 Получен сигнал ${signal}, выключаюсь...`)

      server.close(() => {
        logger.info('🧯 HTTP сервер остановлен')
      })

      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy()
        logger.info('🗄 Соединение с Postgres закрыто')
      }

      process.exit(0)
    } catch (e) {
      logger.error({ err: e }, 'Ошибка при shutdown')
      process.exit(1)
    }
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

bootstrap()
