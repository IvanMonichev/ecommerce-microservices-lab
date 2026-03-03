import { Logger } from '@repo/common'
import type { ErrorRequestHandler } from 'express'

export function errorMiddleware(logger: Logger): ErrorRequestHandler {
  return (err, req, res, _next) => {
    logger.error(
      {
        err,
        requestId: req.headers['x-request-id'],
        method: req.method,
        path: req.path
      },
      'Unhandled error'
    )

    res.status(500).json({ message: 'Internal error', code: 'INTERNAL' })
  }
}