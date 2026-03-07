import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { createRequire } from 'node:module'
import { ProductService } from '../modules/user/product.service.js'
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
const svc = proto.products.v1

type BatchCall = grpc.ServerUnaryCall<{ ids: string[] }, { products: any[] }>
type BatchCb = grpc.sendUnaryData<{ products: any[] }>

export function startProductsGrpcServer(opts: {
  productService: ProductService
  host: string // "0.0.0.0:50051"
}) {
  const server = new grpc.Server()

  server.addService(svc.ProductsService.service, {
    Batch: async (call: BatchCall, cb: BatchCb) => {
      try {
        const ids = Array.isArray(call.request?.ids) ? call.request.ids : []
        const normalized = ids.map(String).filter(Boolean)

        if (normalized.length === 0) {
          return cb(null, { products: [] })
        }

        const products = await opts.productService.batch(normalized)

        const mapped = products.map((p) => ({
          _id: p._id,
          name: p.name,
          price: p.price,
          currency: String(p.currency),
          createdAt: p.createdAt,
          updatedAt: p.updatedAt
        }))

        cb(null, { products: mapped })
      } catch (e: any) {
        cb(
          {
            code: grpc.status.INTERNAL,
            message: e?.message ?? 'Internal error'
          },
          null
        )
      }
    }
  })

  server.bindAsync(
    opts.host,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) throw err
      server.start()
      // console.log(`Products gRPC listening on ${opts.host} (port ${port})`)
    }
  )

  return server
}
