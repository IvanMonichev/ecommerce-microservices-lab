import { RequestHandler } from 'express'

export interface ErrorResponse {
  message: string
  code: string
}

export class AppError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code: string = 'APP_ERROR'
  ) {
    super(message)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(404, message, 'NOT_FOUND')
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(400, message, 'BAD_REQUEST')
  }
}

export const notFoundMiddleware: RequestHandler = (req, res) => {
  const requestId = (req as any).requestId

  res.status(404).json({
    message: 'Маршрут не найден',
    code: 'NOT_FOUND',
    requestId,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  })
}