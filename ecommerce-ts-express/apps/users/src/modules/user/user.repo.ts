import { CreateUserDto } from '@repo/contracts'
import { UserModel } from './user.model.js'

export class UsersRepo {
  async create(dto: CreateUserDto) {
    const doc = await UserModel.create(dto)
    return doc.toObject()
  }

  async findById(id: string) {
    return UserModel.findById(id).lean()
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email }).lean()
  }

  async list(limit: number) {
    return UserModel.find().sort({ createdAt: -1 }).limit(limit).lean()
  }
}