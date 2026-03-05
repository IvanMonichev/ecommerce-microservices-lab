import { OrderStatusUpdate } from '@repo/contracts'
import express from 'express'
import amqp from 'amqplib'
import 'dotenv/config'

const RABBIT_URL = process.env.RABBIT_URL ?? 'amqp://localhost:5672'
const PORT = Number(process.env.PORT ?? 3040)

const EXCHANGE = 'orders'
const ROUTING_KEY = 'orders.status.update'

async function connectRabbit() {
  const conn = await amqp.connect(RABBIT_URL)
  const ch = await conn.createConfirmChannel()
  await ch.assertExchange(EXCHANGE, 'topic', { durable: true })
  return { conn, ch }
}

const app = express()
app.use(express.json())

const { conn, ch } = await connectRabbit()

app.post('/api/notify/order-status', async (req, res) => {
  const body = req.body as Partial<OrderStatusUpdate>

  if (!body.orderId || !body.status) {
    return res.status(400).json({ message: 'orderId and status are required' })
  }

  const payload: OrderStatusUpdate = {
    orderId: String(body.orderId),
    status: body.status
  }

  try {
    await new Promise<void>((resolve, reject) => {
      const ok = ch.publish(
        EXCHANGE,
        ROUTING_KEY,
        Buffer.from(JSON.stringify(payload)),
        { contentType: 'application/json', persistent: true },
        (err) => (err ? reject(err) : resolve())
      )

      // Если буфер канала переполнен — waitForDrain (редко нужно, но полезно под нагрузкой)
      if (!ok) ch.once('drain', () => {})
    })

    return res.status(202).json({ ok: true })
  } catch (e: any) {
    return res
      .status(502)
      .json({ message: `Rabbit publish failed: ${e?.message ?? e}` })
  }
})

const server = app.listen(PORT, () => {
  console.log(`notification listening on :${PORT}`)
})

async function shutdown() {
  await new Promise<void>((resolve) => server.close(() => resolve()))
  try {
    await ch.close()
  } catch {}
  try {
    await conn.close()
  } catch {}
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
