import type { Request, Response } from 'express'
import { UsersService } from './user.service.js'

export class UsersController {
  constructor(private readonly service: UsersService) {}

  create = async (req: Request, res: Response) => {
    const user = await this.service.create(req.body)
    res.status(201).json(user)
  }

  get = async (req: Request, res: Response) => {
    const user = await this.service.get(req.params.id as string)
    res.json(user)
  }

  list = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit ?? 20)
    const users = await this.service.list(limit)
    res.json(users)
  }

  getByIds = async (req: Request, res: Response) => {
    const body = req.body as { ids: string[] }
    const users = await this.service.getByIds(body.ids)
    res.json(users)
  }
}
