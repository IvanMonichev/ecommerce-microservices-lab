import { Currency } from '../common/currency.enum.js'

export type ProductDto = {
  id: string
  name: string
  price: string
  currency: Currency
  createdAt: string
  updatedAt: string
}

export type CreateProductDto = Omit<
  ProductDto,
  'id' | 'createdAt' | 'updatedAt'
>
