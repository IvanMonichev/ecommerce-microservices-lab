import { Router } from 'express'
import { OrderController } from './order.controller.js'

export function ordersRouter(controller: OrderController) {
  const router = Router()

  router.post('/', controller.create)
  router.get('/', controller.listAll)
  router.get('/:id', controller.getById)
  router.get('/all/http', controller.listAllHttp)
  router.get('/all/grpc', controller.listAllGrpc)

  return router
}
