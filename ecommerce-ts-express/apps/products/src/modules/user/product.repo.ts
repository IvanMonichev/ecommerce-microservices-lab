import { CreateProductDto } from '@repo/contracts'
import { ProductModel } from './product.model.js'

export class ProductRepo {
  create(data: Omit<CreateProductDto, 'createdAt' | 'updatedAt'>) {
    return ProductModel.create(data)
  }

  findByProductId(productId: string) {
    return ProductModel.findOne({ product_id: productId }).lean()
  }

  list(limit: number) {
    return ProductModel.find().sort({ createdAt: -1 }).limit(limit).lean()
  }

  async updateStock(productId: string, delta: number) {
    return ProductModel.findOneAndUpdate(
      { product_id: productId },
      { $inc: { stock: delta } },
      { new: true }
    ).lean()
  }
}
