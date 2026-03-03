import type { RequestHandler } from 'express'
import { randomUUID } from 'node:crypto'

export const REQUEST_ID_HEADER = 'x-request-id'

export type RequestIdOptions = {
  headerName?: string
  generator?: () => string
}

export function requestIdMiddleware(opts: RequestIdOptions = {}): RequestHandler {
  const headerName = (opts.headerName ?? REQUEST_ID_HEADER).toLowerCase()
  const generator = opts.generator ?? randomUUID

  return (req, res, next) => {
    const incoming = req.headers[headerName]
    const requestId = (Array.isArray(incoming) ? incoming[0] : incoming) || generator()

    res.setHeader(headerName, requestId)

    ;(req as any).requestId = requestId

    next()
  }
}