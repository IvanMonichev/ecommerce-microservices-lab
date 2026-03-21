import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response
} from 'express'
import axios from 'axios'
import { getEnv } from './config/env.js'

import { OrderController } from './modules/order/order.controller.js'
import { createOrderRouter } from './modules/order/order.route.js'
import { OrderService } from './modules/order/order.service.js'

import { OrdersApiClient } from './clients/orders-api.client.js'
import { UsersApiClient } from './clients/user.client.js'
import { NotificationApiClient } from './clients/notification-api.client.js'

function createApp(): Express {
  const app = express()
  const env = getEnv()

  app.use(express.json())

  const httpClient = axios.create({
    timeout: 5000
  })

  const ordersApiClient = new OrdersApiClient(env.ordersServiceUrl, httpClient)
  const usersApiClient = new UsersApiClient(env.usersServiceUrl, httpClient)
  const notificationApiClient = new NotificationApiClient(
    env.notificationServiceUrl,
    httpClient
  )

  const orderService = new OrderService(
    ordersApiClient,
    notificationApiClient,
    usersApiClient
  )

  const orderController = new OrderController(orderService)

  app.use('/api/orders', createOrderRouter(orderController))

  app.use(
    (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
      const message =
        error instanceof Error ? error.message : 'Internal server error'

      res.status(500).json({
        message
      })
    }
  )

  return app
}

async function bootstrap() {
  const env = getEnv()
  const app = createApp()

  app.listen(env.port, () => {
    console.log(`api-gateway listening on :${env.port}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start application', error)
  process.exit(1)
})
