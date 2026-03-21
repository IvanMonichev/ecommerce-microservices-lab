import { UserModel } from './modules/user/user.model.js'
import { Logger } from '@repo/common'

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
