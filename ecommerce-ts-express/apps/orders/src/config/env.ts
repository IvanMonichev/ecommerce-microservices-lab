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

export function getEnv(): Env {
  return {
    port: toNumber('PORT', process.env.PORT, 3020),
    serviceName: process.env.SERVICE_NAME ?? 'orders',

    postgresHost: process.env.POSTGRES_HOST ?? 'localhost',
    postgresPort: toNumber('POSTGRES_PORT', process.env.POSTGRES_PORT, 5432),
    postgresDb: required('POSTGRES_DB', process.env.POSTGRES_DB),
    postgresUser: required('POSTGRES_USER', process.env.POSTGRES_USER),
    postgresPassword: required(
      'POSTGRES_PASSWORD',
      process.env.POSTGRES_PASSWORD
    ),
    productsBaseUrl:
      process.env.PRODUCTS_BASE_UR ?? 'http://localhost:3030/api/products',
    productsGrpcAddress: process.env.PRODUCTS_GRPC_ADDRESS ?? '0.0.0.0:50051'
  }
}
