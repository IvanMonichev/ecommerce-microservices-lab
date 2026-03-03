import { CreateProductDto, Currency } from '@repo/contracts'
import { ProductRepo } from './product.repo.js'

export class ProductService {
  constructor(private readonly repo: ProductRepo) {}

  create(dto: CreateProductDto) {
    return this.repo.create({
      product_id: dto.product_id,
      name: dto.name,
      price: dto.price,
      currency: dto.currency ?? Currency.RUB
    })
  }

  get(productId: string) {
    return this.repo.findByProductId(productId)
  }

  list(limit: number) {
    return this.repo.list(limit)
  }
}
