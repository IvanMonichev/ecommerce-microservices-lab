import { BadRequestError, NotFoundError } from '@repo/common'
import { CreateUserDto } from '@repo/contracts'
import { UsersRepo } from './user.repo.js'

export class UsersService {
  constructor(private readonly repo: UsersRepo) {}

  async create(dto: CreateUserDto) {
    if (!dto.email?.includes('@')) throw new BadRequestError('Invalid email')
    if (!dto.name || dto.name.trim().length < 2)
      throw new BadRequestError('Invalid name')

    const exists = await this.repo.findByEmail(dto.email)
    if (exists) throw new BadRequestError('User already exists')

    return this.repo.create({ email: dto.email, name: dto.name.trim() })
  }

  async get(id: string) {
    const user = await this.repo.findById(id)
    if (!user) throw new NotFoundError('User not found')
    return user
  }

  async list(limit: number) {
    const safe = Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 20
    return this.repo.list(safe)
  }

  async getByIds(ids: string[]) {
    if (!Array.isArray(ids)) {
      throw new BadRequestError('ids must be an array')
    }

    const normalizedIds = [
      ...new Set(ids.map((id) => String(id).trim()).filter(Boolean))
    ]

    if (normalizedIds.length === 0) {
      throw new BadRequestError('ids must not be empty')
    }

    if (normalizedIds.length > 100) {
      throw new BadRequestError('Too many ids, max 100')
    }

    return this.repo.findByIds(normalizedIds)
  }
}
