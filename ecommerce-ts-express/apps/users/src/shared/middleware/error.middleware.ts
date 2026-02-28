import { AppError } from '@repo/common'
import type { ErrorRequestHandler } from 'express'

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message, code: err.code })
  }

  console.error('Unhandled error:', err)
  return res.status(500).json({ message: 'Internal error', code: 'INTERNAL' })
}