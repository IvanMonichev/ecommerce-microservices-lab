import * as grpc from '@grpc/grpc-js'
import {
  CreateOrderDto,
  Currency,
  OrderDto,
  OrderStatus,
  OrderWithProductDto,
  PaginatedResponse,
  ProductDto
} from '@repo/contracts'
import { getEnv } from '../../config/env.js'
import { AppDataSource } from '../../config/postgres.js'
import { ProductsGrpcClient } from '../../grpc/products.client.js'
import { OrderItemEntity } from '../order-item/order-item.entity.js'
import { OrderEntity } from './order.entity.js'
import { toOrderDto, toOrderWithProducts } from './order.mapper.js'
import { OrderRepo } from './order.repo.js'

export class OrderService {
  constructor(
    private readonly repo: OrderRepo,
    private readonly productsGrpcClient: ProductsGrpcClient
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderDto> {
    if (dto.items.length === 0) throw new Error('items is required')

    return AppDataSource.transaction(async (manager) => {
      const orderRepo = manager.getRepository(OrderEntity)
      const itemRepo = manager.getRepository(OrderItemEntity)

      const currency = Currency.RUB // Упрощение

      const order = orderRepo.create({
        userId: dto.userId,
        status: OrderStatus.NEW,
        currency
      })

      const saved = await orderRepo.save(order)

      const items = dto.items.map((it) =>
        itemRepo.create({
          orderId: saved.id,
          productId: it.productId,
          quantity: it.quantity
        })
      )

      await itemRepo.save(items)

      const full = await orderRepo.findOne({
        where: { id: saved.id },
        relations: { items: true }
      })
      if (!full) throw new Error('Order not found after create')

      return toOrderDto(full)
    })
  }

  async getById(orderId: string): Promise<OrderDto> {
    const order = await this.repo.findById(orderId)
    if (!order) throw new Error('Order not found')
    return toOrderDto(order)
  }

  async listAll(params: {
    page: number
    limit: number
    offset: number
  }): Promise<PaginatedResponse<OrderDto>> {
    const { rows, total } = await this.repo.findAll({
      offset: params.offset,
      limit: params.limit
    })

    return {
      data: rows.map(toOrderDto),
      page: params.page,
      limit: params.limit,
      total
    }
  }

  async listAllHttp(params: {
    page: number
    limit: number
    offset: number
  }): Promise<PaginatedResponse<OrderWithProductDto>> {
    const { rows, total } = await this.repo.findAll({
      offset: params.offset,
      limit: params.limit
    })

    const ids = Array.from(
      new Set(rows.flatMap((o) => (o.items ?? []).map((i) => i.productId)))
    )

    const products = await this.getProductsBatchHttp(ids)

    return {
      data: rows.map((o) => toOrderWithProducts(o, products)),
      page: params.page,
      limit: params.limit,
      total
    }
  }

  private async getProductsBatchHttp(ids: string[]): Promise<ProductDto[]> {
    if (ids.length === 0) return []

    const env = getEnv()
    const base = env.productsBaseUrl

    const res = await fetch(`${base}/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    })

    if (!res.ok) {
      const text = await res.text()
      const err: any = new Error(
        `Products service error (${res.status}): ${text}`
      )
      err.statusCode = 502
      throw err
    }

    return (await res.json()) as ProductDto[]
  }

  async listAllGrpc(params: { page: number; limit: number; offset: number }) {
    const { rows, total } = await this.repo.findAll({
      offset: params.offset,
      limit: params.limit
    })

    const ids = Array.from(
      new Set(rows.flatMap((o) => (o.items ?? []).map((i) => i.productId)))
    )

    const products = await this.getProductsBatchGrpc(ids)

    return {
      data: rows.map((o) => toOrderWithProducts(o, products)),
      page: params.page,
      limit: params.limit,
      total
    }
  }

  private async getProductsBatchGrpc(ids: string[]): Promise<ProductDto[]> {
    if (ids.length === 0) return []

    try {
      return await this.productsGrpcClient.batch(ids, 2000)
    } catch (e: any) {
      const err: any = new Error(
        `Products gRPC error (${e?.code ?? 'unknown'}): ${e?.message ?? e}`
      )
      err.statusCode = 502

      // если хочешь различать timeout:
      if (e?.code === grpc.status.DEADLINE_EXCEEDED) {
        err.statusCode = 504
      }

      throw err
    }
  }
}
