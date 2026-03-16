import { Currency } from '@repo/contracts'
import mongoose from 'mongoose'
import { ProductEntity } from './product.entity.js'

const productSchema = new mongoose.Schema<ProductEntity>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    currency: {
      type: String,
      enum: Object.values(Currency),
      required: true,
      default: Currency.RUB
    }
  },
  { timestamps: true, versionKey: false }
)

export const ProductModel = mongoose.model<ProductEntity>(
  'Product',
  productSchema
)
