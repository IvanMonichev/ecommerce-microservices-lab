import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true, versionKey: false }
)

export const UserModel = model('User', userSchema)