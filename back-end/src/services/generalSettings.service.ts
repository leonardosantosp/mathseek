import { getUserById } from '../repository/user.repository'

export const getGeneralSettingsService = async (id: string) => {
  const user = await getUserById(id)
  if (!user) throw new Error('User not found')
  return {
    themeColor: user.config.themeColor,
    backgroundImage: user.config.backgroundImage,
    outputMethod: user.config.outputMethod
  }
}
