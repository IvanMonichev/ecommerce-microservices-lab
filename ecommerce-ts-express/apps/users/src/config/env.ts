export type Env = {
  port: number;
  mongoUri: string;
  serviceName: string;
}

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env var: ${name}`)
  return value
}

export function getEnv(): Env {
  return {
    port: Number(process.env.PORT ?? 3010),
    mongoUri: required("MONGO_URI", process.env.MONGO_URI),
    serviceName: process.env.SERVICE_NAME ?? "users"
  }
}
