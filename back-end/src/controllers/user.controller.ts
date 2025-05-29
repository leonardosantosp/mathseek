import mongoose from 'mongoose'
import {
  createUserService,
  getUserByIdService,
  getUserByUsernameService
} from '../services/user.service'

export const getUserByIdController = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send({ message: 'invalid id format' })
  }

  try {
    const user = await getUserByIdService(id)
    return res.status(200).send(user)
  } catch (error) {
    if (error instanceof Error && error.message === 'user not found') {
      return res.status(404).send({ message: 'user not found' })
    }
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

export const getUserByUsernameController = async (req, res) => {
  const { username } = req.params

  try {
    const user = await getUserByUsernameService(username)
    return res.status(200).send(user)
  } catch (error) {
    if (error instanceof Error && error.message === 'user not found') {
      return res.status(404).send({ message: 'user not found' })
    }
    console.error(error)
    return res.status(500).send({ message: 'internal server error' })
  }
}

export const createUserController = async (req, res) => {
  const user = req.body

  if (user === undefined || user === null)
    return res.status(400).send({ message: 'No fields' })

  try {
    const newUser = await createUserService(user)
    return res.status(201).send(newUser)
  } catch (error) {
    if (error instanceof Error && error.message === 'already exists') {
      return res.status(409).send({ message: 'some field already exists' })
    }
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}
