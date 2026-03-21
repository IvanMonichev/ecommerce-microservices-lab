import { ProductDto } from '@repo/contracts'
import { ProductEntity } from './product.entity.js'

export const toProductDto = (product: ProductEntity): ProductDto => {
  return {
    id: product._id,
    currency: product.currency,
    price: product.price,
    name: product.name,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  }
}
