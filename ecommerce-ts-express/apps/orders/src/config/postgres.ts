import { DataSource } from 'typeorm'
import { OrderItemEntity } from '../modules/order-item/order-item.entity.js'
import { OrderEntity } from '../modules/order/order.entity.js'
import { getEnv } from './env.js'


const env = getEnv()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.postgresHost,
  port: env.postgresPort,
  username: env.postgresUser,
  password: env.postgresPassword,
  database: env.postgresDb,

  entities: [OrderEntity, OrderItemEntity],

  // MVP
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,

  ssl: false
})