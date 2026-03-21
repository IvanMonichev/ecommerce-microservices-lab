import mongoose from 'mongoose'

import type { Logger } from '@repo/common'

export async function connectMongo(mongoUri: string, logger: Logger) {
  mongoose.set('strictQuery', true)

  logger.info('🗄 Подключение к MongoDB...')

  try {
    await mongoose.connect(mongoUri)

    logger.info(
      {
        db: mongoose.connection.name,
        host: mongoose.connection.host,
        port: mongoose.connection.port
      },
      '✅ MongoDB подключена'
    )
  } catch (err) {
    logger.error({ err, mongoUri }, '❌ Ошибка подключения к MongoDB')
    throw err // важно: пусть сервис не стартует без БД
  }

  // события соединения
  mongoose.connection.on('disconnected', () => {
    logger.warn('⚠️ MongoDB отключена')
  })

  mongoose.connection.on('reconnected', () => {
    logger.info('🔄 MongoDB переподключена')
  })

  mongoose.connection.on('error', (err) => {
    logger.error({ err }, '❌ Ошибка MongoDB')
  })

  const shutdown = async () => {
    logger.info('🛑 Отключение от MongoDB...')
    await mongoose.disconnect()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}