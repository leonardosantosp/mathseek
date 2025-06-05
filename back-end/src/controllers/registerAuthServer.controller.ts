import { getUserByUsernameService } from '../services/user.service'

export const authServerController = async (request, reply) => {
  const username = request.user.username

  try {
    const userExist = await getUserByUsernameService(username)
    if (!userExist) return reply.code(404).send({ message: 'user not found' })
    return reply.code(200).send(userExist)
  } catch (error) {
    if (error instanceof Error && error.message === 'user not found') {
      return reply.code(404).send({ message: 'user not found' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}
