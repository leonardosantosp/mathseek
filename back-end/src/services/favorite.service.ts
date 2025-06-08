import { getUserById } from '../repository/user.repository'

export const getFavoritesService = async (id: string) => {
  const user = await getUserById(id)
  if (!user) throw new Error('User not found')

  return user.config.favorite
}
