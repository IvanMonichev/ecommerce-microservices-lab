import { ProductDto } from '../products/product.dto.js'

export type OrderItemDto = {
  productId: string
  quantity: number
}

export type OrderProductDto = ProductDto & {
  quantity: number
}
