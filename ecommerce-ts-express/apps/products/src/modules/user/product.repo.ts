import { CreateProductDto, ProductDto } from '@repo/contracts'
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

  async findByProductIds(ids: string[]): Promise<ProductDto[]> {
    return ProductModel.find({ product_id: { $in: ids } }).lean()
  }
}
