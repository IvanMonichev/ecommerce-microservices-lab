export type Env = {
  productPort: string
  productMongoUri: string
  productServiceName: string
  grpcHost: string
}

function required(name: string, fallback: string): string {
  const value = process.env[name]
  if (!value) {
    return fallback
  }

  return value
}

function getString(name: string, fallback: string): string {
  const value = process.env[name]
  if (!value) {
    return fallback
  }

  return value
}

export function getEnv(): Env {
  return {
    productPort: getString('PORT', '3030'),
    productMongoUri: required(
      'MONGO_URI',
      'mongodb://admin:password@localhost:27018/products?authSource=admin'
    ),
    productServiceName: getString('NAME', 'products'),
    grpcHost: getString('GRPC_HOST', ':50051')
  }
}
