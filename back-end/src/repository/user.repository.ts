import { UserSchema } from '../models/user.model'
import { CreateUserDto } from '../dto/user/createUser.dto'

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
