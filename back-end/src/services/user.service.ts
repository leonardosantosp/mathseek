import { CreateUserDto } from '../dto/user/createUser.dto'
import {
  createUser,
  getUserById,
  getUserByUsername
} from '../repository/user.repository'
import { hashPassword } from '../utils/hash'

export const getUserByIdService = async (id: string) => {
  const user = await getUserById(id)
  if (!user) throw new Error('user not found')
  return user
}

export const getUserByUsernameService = async (username: string) => {
  const user = await getUserByUsername(username)
  if (!user) throw new Error('user not found')
  return user
}

export const createUserService = async (user: CreateUserDto) => {
  try {
    const newUser = {
      username: user.username,
      email: user.email,
      hashedPassword: await hashPassword(user.password),
      config: {
        backgroundImage: '',
        fontFamily: '',
        outputMethod: 'diffScreen',
        themeColor: '',
        favorite: [],
        folders: [],
        quickAccess: []
      }
    }
    const response = await createUser(newUser)
    return response
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error('already exists')
    }
    console.error('Erro ao criar usuário:', error)
    throw new Error('Error while creating user')
  }
}
