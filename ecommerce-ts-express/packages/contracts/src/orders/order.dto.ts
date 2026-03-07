import { Currency } from '../common/currency.enum.js'
import { UserDto } from '../users/user.dto.js'
import { OrderItemDto, OrderProductDto } from './order-item.enum.js'
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

export type OrderWithProductDto = Omit<OrderDto, 'items'> & {
  products: OrderProductDto[]
}

export type CreateOrderDto = {
  userId: string
  currency: Currency
  items: OrderItemDto[]
}

export type OrderStatusUpdate = {
  orderId: string
  status: OrderStatus
}

export type OrderViewDto = Omit<OrderWithProductDto, 'userId'> & {
  user: UserDto
}
