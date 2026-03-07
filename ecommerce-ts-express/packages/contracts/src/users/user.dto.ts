export interface UserDto {
  _id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  email: string
  name: string
}
