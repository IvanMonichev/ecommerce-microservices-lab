import { Router } from 'express'
import { getEnv } from '../../config/env.js'
import { ProductsGrpcClient } from '../../grpc/products.client.js'
import { OrderController } from './order.controller.js'
import { OrderRepo } from './order.repo.js'
import { OrderService } from './order.service.js'

export function ordersRouter() {
  const router = Router()

  const repo = new OrderRepo()
  const env = getEnv()
  const productsClient = new ProductsGrpcClient(env.productsGrpcAddress)
  const service = new OrderService(repo, productsClient)
  const controller = new OrderController(service)

  router.post('/', controller.create)
  router.get('/', controller.listAll)
  router.get('/:id', controller.getById)
  router.get('/all/http', controller.listAllHttp)
  router.get('/all/grpc', controller.listAllGrpc)

  return router
}
