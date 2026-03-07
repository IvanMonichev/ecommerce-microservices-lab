import type { UserDto } from '@repo/contracts'

export class UsersApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: Axios.AxiosInstance
  ) {}

  async getUserById(id: string): Promise<UserDto> {
    const { data } = await this.httpClient.get<UserDto>(
      `${this.baseUrl}/api/users/${id}`
    )

    return data
  }

  async getUsersByIds(ids: string[]): Promise<Map<string, UserDto>> {
    const uniqueIds = [
      ...new Set(ids.map((id) => String(id).trim()).filter(Boolean))
    ]

    if (uniqueIds.length === 0) {
      return new Map()
    }

    const { data } = await this.httpClient.post<UserDto[]>(
      `${this.baseUrl}/api/users/batch`,
      {
        ids: uniqueIds
      }
    )

    console.log('data', data)

    return new Map(data.map((user) => [user._id, user]))
  }
}
