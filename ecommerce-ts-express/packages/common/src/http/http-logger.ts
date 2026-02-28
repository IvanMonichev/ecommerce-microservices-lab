import type { RequestHandler } from 'express'
import type { Logger } from '../logger/index.js'

function getRequestId(req: any) {
  return req.requestId as string | undefined
}

export function httpLoggerMiddleware(logger: Logger): RequestHandler {
  return (req, res, next) => {
    const start = process.hrtime.bigint()

    res.on('finish', () => {
      const end = process.hrtime.bigint()
      const durationMs = Number(end - start) / 1e6

      const requestId = getRequestId(req)

      const log = requestId ? logger.child({ requestId }) : logger

      log.info(
        {
          method: req.method,
          path: req.originalUrl ?? req.url,
          status: res.statusCode,
          durationMs: Math.round(durationMs * 100) / 100
        },
        'http'
      )
    })

    next()
  }
}