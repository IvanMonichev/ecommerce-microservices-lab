import type {
  CreateOrderDto,
  OrderWithProductDto,
  PaginatedResponse
} from '@repo/contracts'

export class OrdersApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: Axios.AxiosInstance
  ) {}

  async getOrdersByHttp(params: {
    page: number
    limit: number
  }): Promise<PaginatedResponse<OrderWithProductDto>> {
    const { data } = await this.httpClient.get<
      PaginatedResponse<OrderWithProductDto>
    >(`${this.baseUrl}/api/orders/all/http`, { params })

    return data
  }

  async getOrdersByGrpc(params: {
    page: number
    limit: number
  }): Promise<PaginatedResponse<OrderWithProductDto>> {
    const { data } = await this.httpClient.get<
      PaginatedResponse<OrderWithProductDto>
    >(`${this.baseUrl}/api/orders/all/grpc`, { params })

    return data
  }

  async createOrder(payload: CreateOrderDto): Promise<OrderWithProductDto> {
    const { data } = await this.httpClient.post<OrderWithProductDto>(
      `${this.baseUrl}/api/orders`,
      payload
    )

    return data
  }
}
