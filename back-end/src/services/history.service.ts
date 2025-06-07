import { getUserById } from '../repository/user.repository'

export const getHistoryService = async (id: string) => {
  const user = await getUserById(id)
  if (!user) throw new Error('User not found')
  return user.history
}
