import pino from 'pino'

export type Logger = pino.Logger

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
      : undefined
})