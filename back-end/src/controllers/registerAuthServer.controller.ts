import { getUserByUsernameService } from '../services/user.service'

export const authServerController = async (req, res) => {
  const username = req.user.username

  try {
    const userExist = await getUserByUsernameService(username)
    if (!userExist) return res.status(404).send({ message: 'user not found' })
    return res.status(200).send(userExist)
  } catch (error) {
    if (error instanceof Error && error.message === 'user not found') {
      return res.status(404).send({ message: 'user not found' })
    }
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}
