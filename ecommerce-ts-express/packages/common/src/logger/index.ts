import pino, { type LoggerOptions, type Logger as PinoLogger } from 'pino'

export type Logger = PinoLogger

export type CreateLoggerOptions = {
  service?: string
  level?: string
  pretty?: boolean
}

export function createLogger(opts: CreateLoggerOptions = {}): Logger {
  const level = opts.level ?? process.env.LOG_LEVEL ?? 'info'
  const service = opts.service ?? process.env.SERVICE_NAME ?? 'service'
  const pretty =
    opts.pretty ??
    (process.env.LOG_PRETTY === '1' || process.env.LOG_PRETTY === 'true')

  const baseOptions: LoggerOptions = {
    level,
    base: { service },
    timestamp: pino.stdTimeFunctions.isoTime
  }

  if (pretty) {
    return pino({
      ...baseOptions,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    })
  }

  return pino(baseOptions)
}