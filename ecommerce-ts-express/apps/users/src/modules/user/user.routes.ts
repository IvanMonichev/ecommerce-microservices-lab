import { Router } from 'express'
import { UsersController } from './user.controller.js'
import { UsersRepo } from './user.repo.js'
import { UsersService } from './user.service.js'

export function usersRouter() {
  const router = Router()

  const repo = new UsersRepo()
  const service = new UsersService(repo)
  const controller = new UsersController(service)

  router.get('/', controller.list)
  router.get('/:id', controller.get)
  router.post('/', controller.create)
  router.post('/batch', controller.getByIds)

  return router
}
