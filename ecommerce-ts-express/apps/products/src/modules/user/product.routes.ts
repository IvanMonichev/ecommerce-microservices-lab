import { Router } from 'express'
import { ProductController } from './product.controller.js'
import { ProductRepo } from './product.repo.js'
import { ProductService } from './product.service.js'

export function productRouter() {
  const router = Router()

  const repo = new ProductRepo()
  const service = new ProductService(repo)
  const controller = new ProductController(service)

  router.get('/', controller.list)
  router.post('/batch', controller.batch)
  router.get('/:productId', controller.get)
  router.post('/', controller.create)

  return router
}
