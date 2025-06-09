import { getGeneralSettingsService } from '../services/generalSettings.service'

export const getGeneralSettingsController = async (request, reply) => {
  const id = request.user?.id

  try {
    const generalSettings = await getGeneralSettingsService(id)
    return reply.code(200).send(generalSettings)
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return reply.code(404).send({ message: 'User not found' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}
