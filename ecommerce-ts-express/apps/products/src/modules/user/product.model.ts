import { Currency, ProductDto } from '@repo/contracts'
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema<ProductDto>(
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

export const ProductModel = mongoose.model<ProductDto>('Product', productSchema)
