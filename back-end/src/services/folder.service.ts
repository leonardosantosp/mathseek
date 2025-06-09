import { getUserById } from '../repository/user.repository'

export const getFoldersService = async (id: string) => {
  const user = await getUserById(id)
  if (!user) throw new Error('User not found')
  return user.config.folders
}
