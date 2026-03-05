import { OrderStatus } from '@repo/contracts'
import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/postgres.js'
import { OrderEntity } from './order.entity.js'

export class OrderRepo {
  private readonly repo: Repository<OrderEntity>

  constructor() {
    this.repo = AppDataSource.getRepository(OrderEntity)
  }

  create(entity: Partial<OrderEntity>) {
    return this.repo.create(entity)
  }

  save(entity: OrderEntity) {
    return this.repo.save(entity)
  }

  async findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: { items: true }
    })
  }

  async findAll(params: { offset: number; limit: number }) {
    const [rows, total] = await this.repo.findAndCount({
      relations: { items: true },
      order: { createdAt: 'DESC' },
      skip: params.offset,
      take: params.limit
    })

    return { rows, total }
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    return this.repo.update({ id: orderId }, { status })
  }
}
