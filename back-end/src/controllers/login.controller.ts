import { loginService, refreshService } from '../services/login.service'

export const loginController = async (request, reply) => {
  const { username, password } = request.body

  try {
    const authenticateUser = await loginService(username, password)
    return reply.code(200).send(authenticateUser)
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return reply.code(404).send({ message: 'user not found' })
    }
    if (error instanceof Error && error.message === 'Invalid Password') {
      return reply.code(401).send({ message: 'Invalid Password' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}

export const refreshController = async (request, reply) => {
  const { refreshToken } = request.body

  if (refreshToken === null)
    return reply.code(401).send({ message: 'Invalid refresh token' })

  try {
    const newAccessToken = await refreshService(refreshToken)
    return reply.code(200).send(newAccessToken)
  } catch (error) {
    return reply.code(401).send({ message: 'Invalid refresh token' })
  }
}
