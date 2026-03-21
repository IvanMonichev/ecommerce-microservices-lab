export type Env = {
  port: number
  serviceName: string

  postgresHost: string
  postgresPort: number
  postgresDb: string
  postgresUser: string
  postgresPassword: string
  productsBaseUrl: string
  productsGrpcAddress: string
  rabbitUrl: string
}

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env var: ${name}`)
  return value
}

function toNumber(
  name: string,
  value: string | undefined,
  fallback: number
): number {
  const raw = value ?? String(fallback)
  const n = Number(raw)
  if (!Number.isFinite(n))
    throw new Error(`Invalid number env var: ${name}="${raw}"`)
  return n
}

function toString(
  name: string,
  value: string | undefined,
  fallback: string
): string {
  const raw = value ?? fallback

  if (raw === undefined || raw === null || raw.trim() === '') {
    throw new Error(`Invalid string env var: ${name}`)
  }

  return raw
}

export function getEnv(): Env {
  return {
    port: toNumber('PORT', process.env.PORT, 3020),
    serviceName: process.env.SERVICE_NAME ?? 'orders',

    postgresHost: process.env.POSTGRES_HOST ?? 'localhost',
    postgresPort: toNumber('POSTGRES_PORT', process.env.POSTGRES_PORT, 5432),
    postgresDb: toString('POSTGRES_DB', process.env.POSTGRES_DB, 'orders'),
    postgresUser: toString('POSTGRES_USER', process.env.POSTGRES_USER, 'admin'),
    postgresPassword: toString(
      'POSTGRES_PASSWORD',
      process.env.POSTGRES_PASSWORD,
      'password'
    ),
    productsBaseUrl:
      process.env.PRODUCTS_BASE_URL ?? 'http://localhost:3030/api/products',
    productsGrpcAddress: process.env.PRODUCTS_GRPC_ADDRESS ?? 'localhost:50051',
    rabbitUrl: process.env.RABBIT_URL ?? 'amqp://admin:password@localhost:5672'
  }
}
