import { Currency, OrderDto } from '@repo/contracts'
import e from 'express'
import { OrderEntity } from './order.entity.js'

export function toOrderDto(entity: OrderEntity): OrderDto {
  return {

    id: entity.id,
    userId: entity.userId,
    status: entity.status,
    totalAmount: entity.totalAmount,
    items: (entity.items ?? []).map((i) => ({
      productId: i.productId,
      title: i.productTitleSnapshot,
      qty: i.qty,
      unitPrice: i.unitPriceSnapshot,
      currency: i.currencySnapshot
    })),
    currency: entity.currency,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString()
  }
}