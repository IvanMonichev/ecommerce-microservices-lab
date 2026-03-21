import { Currency } from '@repo/contracts'

export interface ProductEntity {
  _id: string
  name: string
  price: string
  currency: Currency
  createdAt: string
  updatedAt: string
}
