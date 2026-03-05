import { CreateOrderDto, normalizePagination } from '@repo/contracts'
import type { Request, Response, NextFunction } from 'express'
import { OrderService } from './order.service.js'

export class OrderController {
  constructor(private readonly service: OrderService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as CreateOrderDto
      const result = await this.service.create(dto)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id
      if (!orderId) {
        return res.status(400).json({ message: 'ID is required' })
      }

      const result = await this.service.getById(orderId as string)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, offset } = normalizePagination(req.query)
      const result = await this.service.listAll({ page, limit, offset })
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  listAllHttp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, offset } = normalizePagination(req.query)
      const result = await this.service.listAllHttp({ page, limit, offset })
      res.json(result)
    } catch (e) {
      next(e)
    }
  }

  listAllGrpc = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, offset } = normalizePagination(req.query)
      const result = await this.service.listAllGrpc({ page, limit, offset })
      res.json(result)
    } catch (e) {
      next(e)
    }
  }
}
