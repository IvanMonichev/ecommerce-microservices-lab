import type { Request, Response, NextFunction } from 'express'
import { ProductService } from './product.service.js'

export class ProductController {
  constructor(private readonly service: ProductService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.create(req.body)
      res.status(201).json(result)
    } catch (e) {
      next(e)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      if (!id) return res.status(400).json({ message: 'productId is required' })

      const result = await this.service.get(id as string)
      if (!result) return res.status(404).json({ message: 'Not found' })

      res.json(result)
    } catch (e) {
      next(e)
    }
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Number(req.query.limit ?? 20)
      const result = await this.service.list(limit)
      res.json(result)
    } catch (e) {
      next(e)
    }
  }

  batch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ids = req.body?.ids

      if (!Array.isArray(ids) || ids.length === 0) {
        return res
          .status(400)
          .json({ message: 'ids must be a non-empty array' })
      }

      const normalized = ids.map(String).filter(Boolean)
      if (normalized.length === 0) {
        return res
          .status(400)
          .json({ message: 'ids must contain non-empty strings' })
      }

      const result = await this.service.batch(normalized)
      res.json(result)
    } catch (e) {
      next(e)
    }
  }
}
