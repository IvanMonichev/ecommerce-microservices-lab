import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  ORDERS_SERVICE_URL: z.string().url(),
  USERS_SERVICE_URL: z.string().url(),
  NOTIFICATION_SERVICE_URL: z.string().url()
})

export const env = envSchema.parse(process.env)
