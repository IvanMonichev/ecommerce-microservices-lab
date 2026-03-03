import {
  Currency,
  OrderDto,
  OrderWithProductDto,
  ProductDto
} from '@repo/contracts'
import e from 'express'
import { getEnv } from '../../config/env.js'
import { OrderEntity } from './order.entity.js'

export function toOrderDto(entity: OrderEntity): OrderDto {
  return {
    id: entity.id,
    userId: entity.userId,
    status: entity.status,
    items: (entity.items ?? []).map((i) => ({
      productId: i.productId,
      quantity: i.quantity
    })),
    currency: entity.currency,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString()
  }
}

export function toOrderWithProducts(
  order: OrderEntity,
  products: ProductDto[]
): OrderWithProductDto {
  const byId = new Map(products.map((p) => [p.product_id, p]))

  return {
    id: order.id,
    userId: order.userId,
    status: order.status,
    currency: order.currency,
    products: (order.items ?? [])
      .map((it) => {
        const p = byId.get(it.productId)
        if (!p) return null
        return { ...p, quantity: it.quantity }
      })
      .filter(Boolean) as any,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString()
  }
}
