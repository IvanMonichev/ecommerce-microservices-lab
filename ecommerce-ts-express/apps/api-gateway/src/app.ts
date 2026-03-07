import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response
} from 'express'
import axios from 'axios'
import 'dotenv/config'
import { env } from './config/env.js'

import { OrderController } from './modules/order/order.controller.js'
import { createOrderRouter } from './modules/order/order.route.js'
import { OrderService } from './modules/order/order.service.js'

import { OrdersApiClient } from './clients/orders-api.client.js'
import { UsersApiClient } from './clients/user.client.js'
import { NotificationApiClient } from './clients/notification-api.client.js'

function createApp(): Express {
  const app = express()

  app.use(express.json())

  const httpClient = axios.create({
    timeout: 5000
  })

  const { NOTIFICATION_SERVICE_URL, USERS_SERVICE_URL, ORDERS_SERVICE_URL } =
    env

  const ordersApiClient = new OrdersApiClient(ORDERS_SERVICE_URL, httpClient)
  const usersApiClient = new UsersApiClient(USERS_SERVICE_URL, httpClient)
  const notificationApiClient = new NotificationApiClient(
    NOTIFICATION_SERVICE_URL,
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
  const app = createApp()

  app.listen(env.PORT, () => {
    console.log(`api-gateway listening on :${env.PORT}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start application', error)
  process.exit(1)
})
