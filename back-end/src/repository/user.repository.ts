import { UserSchema } from '../models/user.model'

type ReturnedUser = {
  username: string
  email: string
  hashedPassword: string
}

export const getUserById = async (id: string) => {
  const user = await UserSchema.findById(id)
  return user
}

export const getUserByUsername = async (username: string) => {
  return await UserSchema.findOne({ username: username })
}

export const createUser = async (user: ReturnedUser) => {
  return await UserSchema.create(user)
}

export const deleteUser = async (id: string) => {
  return await UserSchema.findByIdAndDelete(id)
}
