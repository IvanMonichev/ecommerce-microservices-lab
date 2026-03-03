import { Currency } from '../common/currency.enum.js'

export type ProductDto = {
  _id: string
  product_id: string
  name: string
  price: string
  currency: Currency
  createdAt: string
  updatedAt: string
}

export type CreateProductDto = Omit<
  ProductDto,
  '_id' | 'createdAt' | 'updatedAt'
>
