import { CreateProductDto, Currency, ProductDto } from '@repo/contracts'
import { ProductEntity } from './product.entity.js'
import { ProductRepo } from './product.repo.js'

export class ProductService {
  constructor(private readonly repo: ProductRepo) {}

  create(dto: CreateProductDto) {
    return this.repo.create({
      name: dto.name,
      price: dto.price,
      currency: dto.currency ?? Currency.RUB
    })
  }

  get(id: string) {
    return this.repo.findById(id)
  }

  list(limit: number) {
    return this.repo.list(limit)
  }

  async batch(ids: string[]): Promise<ProductEntity[]> {
    if (!ids.length) return []

    return this.repo.findByIds(ids)
  }
}
