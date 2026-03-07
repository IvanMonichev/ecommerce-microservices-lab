import { Router } from 'express'
import { OrderController } from './order.controller.js'

export function createOrderRouter(controller: OrderController) {
  const router = Router()

  router.get('/all/http', controller.getOrdersByHttp)
  router.get('/all/grpc', controller.getOrdersByGrpc)
  router.post('/', controller.createOrder)
  router.post('/notify/order-status', controller.updateOrderStatus)

  return router
}
