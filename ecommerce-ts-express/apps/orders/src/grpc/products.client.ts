import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { createRequire } from 'node:module'
import type { ProductDto } from '@repo/contracts'

const require = createRequire(import.meta.url)

const PROTO_PATH = require.resolve('@repo/contracts/proto/products.proto')

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const proto = grpc.loadPackageDefinition(packageDef) as any
const ProductsServiceCtor = proto.products.v1.ProductsService as any

type BatchResponse = { products: any[] }

export class ProductsGrpcClient {
  private client: any

  constructor(private readonly address: string) {
    this.client = new ProductsServiceCtor(
      address,
      grpc.credentials.createInsecure()
    )
  }

  batch(ids: string[], timeoutMs = 2000): Promise<ProductDto[]> {
    if (!ids.length) return Promise.resolve([])

    const deadline = new Date(Date.now() + timeoutMs)

    return new Promise((resolve, reject) => {
      this.client.Batch(
        { ids },
        { deadline },
        (err: grpc.ServiceError | null, res: BatchResponse) => {
          if (err) return reject(err)

          const products = (res?.products ?? []).map((p) => ({
            _id: p._id,
            product_id: p.product_id,
            name: p.name,
            price: p.price,
            currency: p.currency,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
          })) as ProductDto[]

          resolve(products)
        }
      )
    })
  }
}

let singleton: ProductsGrpcClient | null = null

export function getProductsClient(address: string) {
  if (!singleton) singleton = new ProductsGrpcClient(address)
  return singleton
}
