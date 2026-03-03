export type ListOrdersQuery = {
  page?: string
  limit?: string
}

export function normalizePagination(q: ListOrdersQuery) {
  const pageRaw = Number(q.page ?? 1)
  const limitRaw = Number(q.limit ?? 20)

  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.floor(limitRaw) : 20

  const cappedLimit = Math.min(limit, 100)
  const offset = (page - 1) * cappedLimit

  return { page, limit: cappedLimit, offset }
}