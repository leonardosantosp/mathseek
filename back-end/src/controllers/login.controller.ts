import { loginService, refreshService } from '../services/login.service'

export const loginController = async (req, res) => {
  const { username, password } = req.body

  try {
    const authenticateUser = await loginService(username, password)
    return res.status(200).send(authenticateUser)
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return res.status(404).send({ message: 'user not found' })
    }
    if (error instanceof Error && error.message === 'Invalid Password') {
      return res.status(401).send({ message: 'Invalid Password' })
    }
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

export const refreshController = async (req, res) => {
  const { refreshToken } = req.body

  if (refreshToken === null)
    return res.status(401).send({ message: 'Invalid refresh token' })

  try {
    const newAccessToken = await refreshService(refreshToken)
    return res.status(200).send(newAccessToken)
  } catch (error) {
    return res.status(401).send({ message: 'Invalid refresh token' })
  }
}
