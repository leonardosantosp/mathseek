import mongoose from 'mongoose'
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUserByUsernameService
} from '../services/user.service'

export const getUserByIdController = async (request, reply) => {
  const id = request.user?.id

  if (!mongoose.isValidObjectId(id)) {
    return reply.code(400).send({ message: 'invalid id format' })
  }

  try {
    const user = await getUserByIdService(id)
    return reply.code(200).send(user)
  } catch (error) {
    if (error instanceof Error && error.message === 'user not found') {
      return reply.code(404).send({ message: 'user not found' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}

export const getUserByUsernameController = async (request, reply) => {
  const { username } = request.params

  try {
    const user = await getUserByUsernameService(username)
    return reply.code(200).send(user)
  } catch (error) {
    if (error instanceof Error && error.message === 'user not found') {
      return reply.code(404).send({ message: 'user not found' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'internal server error' })
  }
}

export const createUserController = async (request, reply) => {
  const user = request.body

  if (user === undefined || user === null)
    return reply.code(400).send({ message: 'No fields' })

  try {
    const newUser = await createUserService(user)
    return reply.code(201).send(newUser)
  } catch (error) {
    if (error instanceof Error && error.message === 'already exists') {
      return reply.code(409).send({ message: 'some field already exists' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}

export const deleteUserController = async (request, reply) => {
  const id = request.user?.id

  if (!mongoose.isValidObjectId(id)) {
    return reply.code(400).send({ message: 'invalid id format' })
  }

  try {
    await deleteUserService(id)
    return reply.code(204).send()
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return reply.code(404).send({ message: 'User not found' })
    }
    console.error(error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}
