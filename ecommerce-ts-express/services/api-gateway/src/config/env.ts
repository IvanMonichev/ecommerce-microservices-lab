export type Env = {
  port: number
  serviceName: string
  ordersServiceUrl: string
  usersServiceUrl: string
  notificationServiceUrl: string
}

function getString(name: string, fallback: string): string {
  const value = process.env[name]
  if (!value) {
    return fallback
  }

  return value
}

function getNumber(name: string, fallback: number): number {
  const value = process.env[name]
  if (!value) {
    return fallback
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid number env var: ${name}="${value}"`)
  }

  return parsed
}

export function getEnv(): Env {
  return {
    port: getNumber('PORT', 3000),
    serviceName: getString('NAME', 'api-gateway'),
    ordersServiceUrl: getString(
      'ORDERS_SERVICE_URL',
      'http://localhost:3020'
    ),
    usersServiceUrl: getString('USERS_SERVICE_URL', 'http://localhost:3010'),
    notificationServiceUrl: getString(
      'NOTIFICATION_SERVICE_URL',
      'http://localhost:3040'
    )
  }
}
