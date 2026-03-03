export type PageParams = {
  page?: number
  limit?: number
}

export type PaginatedResponse<T> = {
  data: T[]
  page: number
  limit: number
  total: number
}
