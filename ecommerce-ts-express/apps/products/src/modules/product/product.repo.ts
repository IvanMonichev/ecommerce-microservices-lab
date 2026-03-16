import { CreateProductDto, ProductDto } from '@repo/contracts'
import { ProductEntity } from './product.entity.js'
import { ProductModel } from './product.model.js'

export class ProductRepo {
  create(data: Omit<CreateProductDto, 'createdAt' | 'updatedAt'>) {
    return ProductModel.create(data)
  }

  findById(id: string) {
    return ProductModel.findById(id).lean()
  }

  list(limit: number) {
    return ProductModel.find().sort({ createdAt: -1 }).limit(limit).lean()
  }

  async findByIds(ids: string[]): Promise<ProductEntity[]> {
    return ProductModel.find({
      _id: { $in: ids }
    }).lean()
  }
}
