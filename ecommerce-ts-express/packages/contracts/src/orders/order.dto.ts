import { Currency } from './currency.enum.js'
import { OrderItemDto } from './order-item.enum.js'
import { OrderStatus } from './order-status.enum.js'

export type OrderDto = {
  id: string
  userId: string
  status: OrderStatus
  currency: Currency
  items: OrderItemDto[]
  createdAt: string
  updatedAt: string
}

export type CreateOrderDto = Omit<
  OrderDto,
  'createdAt' | 'updatedAt' | 'id' | 'status'
>

export type OrderViewDto = OrderDto & {
  totalAmount: string
}
