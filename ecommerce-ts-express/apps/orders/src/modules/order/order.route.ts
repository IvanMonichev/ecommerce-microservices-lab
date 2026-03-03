import { Router } from 'express'
import { OrderController } from './order.controller.js'
import { OrderRepo } from './order.repo.js'
import { OrderService } from './order.service.js'

export function ordersRouter() {
  const router = Router()

  const repo = new OrderRepo()
  const service = new OrderService(repo)
  const controller = new OrderController(service)

  router.post('/', controller.create)
  router.get('/', controller.listAll)
  router.get('/:id', controller.getById)
  router.get('/all/http', controller.listAllHttp)

  return router
}
