import { OrderStatus } from '@repo/contracts'
import amqp, { ConsumeMessage } from 'amqplib'
import { getEnv } from '../config/env.js'
import { OrderRepo } from '../modules/order/order.repo.js'

const RABBIT_URL = getEnv().rabbitUrl

export async function startStatusUpdateConsumer(repo: OrderRepo) {
  const conn = await amqp.connect(RABBIT_URL)
  const ch = await conn.createChannel()

  await ch.assertExchange('orders', 'topic', { durable: true })
  const q = await ch.assertQueue('orders.status.update.q', { durable: true })
  await ch.bindQueue(q.queue, 'orders', 'orders.status.update')

  await ch.consume(q.queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return

    try {
      const { orderId, status } = JSON.parse(msg.content.toString('utf8')) as {
        orderId?: string
        status?: OrderStatus
      }

      if (!orderId || !status) {
        ch.ack(msg)
        return
      }

      await repo.updateStatus(orderId, status)
      ch.ack(msg)
    } catch (e) {
      // временная ошибка → повторим
      ch.nack(msg, false, true)
    }
  })

  return { conn, ch }
}
