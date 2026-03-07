import { OrderStatusUpdate } from '@repo/contracts'

export class NotificationApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: Axios.AxiosInstance
  ) {}

  async updateOrderStatus(payload: OrderStatusUpdate): Promise<{ ok: true }> {
    const { data } = await this.httpClient.post<{ ok: true }>(
      `${this.baseUrl}/api/notify/order-status`,
      payload
    )

    return data
  }
}
