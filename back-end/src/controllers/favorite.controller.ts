import { getFavoritesService } from '../services/favorite.service'

export const getFavoriteController = async (request, reply) => {
  const userId = request.user?.id

  try {
    const favorite = await getFavoritesService(userId)
    return reply.code(200).send(favorite)
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return reply.code(404).send({ message: 'User not found' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}
