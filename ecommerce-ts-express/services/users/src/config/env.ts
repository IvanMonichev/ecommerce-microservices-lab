export type Env = {
  port: number
  mongoUri: string
  serviceName: string
}

export function getEnv(): Env {
  return {
    port: Number(process.env.PORT ?? 3010),
    mongoUri:
      process.env.MONGO_URI ??
      'mongodb://admin:password@localhost:27017/users_db?authSource=admin',
    serviceName: process.env.SERVICE_NAME ?? 'users'
  }
}
