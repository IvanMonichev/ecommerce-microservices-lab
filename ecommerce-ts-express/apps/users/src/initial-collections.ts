import type { Logger } from '@repo/common'
import { UserModel } from './modules/user.model.js'

export async function initCollections(logger: Logger) {
  logger.info('Инициализация коллекций...')

  try {
    await UserModel.createCollection()
    await UserModel.syncIndexes()

    logger.info('Коллекция users готова')
  } catch (err) {
    logger.error({ err }, 'Ошибка инициализации коллекции users')
    throw err
  }
}