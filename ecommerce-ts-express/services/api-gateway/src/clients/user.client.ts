import type { UserDto } from '@repo/contracts'
import type { AxiosInstance } from 'axios'

export class UsersApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: AxiosInstance
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

    return new Map(data.map((user: UserDto) => [user._id, user]))
  }
}
