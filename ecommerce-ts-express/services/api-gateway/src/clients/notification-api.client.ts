import { OrderStatusUpdate } from '@repo/contracts'
import type { AxiosInstance } from 'axios'

export class NotificationApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: AxiosInstance
  ) {}

  async updateOrderStatus(payload: OrderStatusUpdate): Promise<{ ok: true }> {
    const { data } = await this.httpClient.post<{ ok: true }>(
      `${this.baseUrl}/api/notify/order-status`,
      payload
    )

    return data
  }
}
