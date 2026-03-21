import type { NextFunction, Request, Response } from 'express'
import type {
  CreateOrderDto,
  ListOrdersQuery,
  OrderStatusUpdate
} from '@repo/contracts'
import { normalizePagination } from '@repo/contracts'
import { OrderService } from './order.service.js'

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  getOrdersByHttp = async (
    req: Request<unknown, unknown, unknown, ListOrdersQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page, limit } = normalizePagination(req.query)

      const result = await this.orderService.getOrdersByHttp({
        page,
        limit
      })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  getOrdersByGrpc = async (
    req: Request<unknown, unknown, unknown, ListOrdersQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page, limit } = normalizePagination(req.query)

      const result = await this.orderService.getOrdersByGrpc({
        page,
        limit
      })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  createOrder = async (
    req: Request<unknown, unknown, CreateOrderDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.orderService.createOrder(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  updateOrderStatus = async (
    req: Request<unknown, unknown, OrderStatusUpdate>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.orderService.updateOrderStatus(req.body)

      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}
