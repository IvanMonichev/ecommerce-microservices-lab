import {
  CreateOrderDto,
  OrderStatusUpdate,
  OrderViewDto,
  OrderWithProductDto,
  PaginatedResponse,
  type UserDto
} from '@repo/contracts'
import { NotificationApiClient } from '../../clients/notification-api.client.js'
import { OrdersApiClient } from '../../clients/orders-api.client.js'
import { UsersApiClient } from '../../clients/user.client.js'

export class OrderService {
  constructor(
    private readonly ordersApiClient: OrdersApiClient,
    private readonly notificationApiClient: NotificationApiClient,
    private readonly usersApiClient: UsersApiClient
  ) {}

  private mapOrderToView(
    order: OrderWithProductDto,
    user: UserDto
  ): OrderViewDto {
    return {
      id: order.id,
      status: order.status,
      currency: order.currency,
      products: order.products,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      user
    }
  }

  private async enrichOrder(order: OrderWithProductDto): Promise<OrderViewDto> {
    const user = await this.usersApiClient.getUserById(order.userId)
    return this.mapOrderToView(order, user)
  }

  private async enrichOrders(
    paginatedOrders: PaginatedResponse<OrderWithProductDto>
  ): Promise<PaginatedResponse<OrderViewDto>> {
    const userIds = paginatedOrders.data.map((order) => order.userId)
    const usersMap = await this.usersApiClient.getUsersByIds(userIds)

    const data: OrderViewDto[] = paginatedOrders.data.map((order) => {
      const user = usersMap.get(order.userId)

      if (!user) {
        throw new Error(`User not found for order ${order.id}`)
      }

      return this.mapOrderToView(order, user)
    })

    return {
      ...paginatedOrders,
      data
    }
  }

  async getOrdersByHttp(params: {
    page: number
    limit: number
  }): Promise<PaginatedResponse<OrderViewDto>> {
    const paginatedOrders = await this.ordersApiClient.getOrdersByHttp(params)
    return this.enrichOrders(paginatedOrders)
  }

  async getOrdersByGrpc(params: {
    page: number
    limit: number
  }): Promise<PaginatedResponse<OrderViewDto>> {
    const paginatedOrders = await this.ordersApiClient.getOrdersByGrpc(params)
    return this.enrichOrders(paginatedOrders)
  }

  async createOrder(payload: CreateOrderDto) {
    const order = await this.ordersApiClient.createOrder(payload)
    return this.enrichOrder(order)
  }

  async updateOrderStatus(payload: OrderStatusUpdate) {
    // 1. отправляем событие
    return await this.notificationApiClient.updateOrderStatus(payload)
  }
}
