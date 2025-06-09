import { getShortcutsService } from '../services/shortcut.service'

export const getShortcutsController = async (request, reply) => {
  const id = request.user?.id
  try {
    const shortcuts = await getShortcutsService(id)
    return reply.code(200).send(shortcuts)
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return reply.code(404).send({ message: 'User not found' })
    }
    console.error(500)
    return reply.code(500).send({ message: 'internal server error' })
  }
}
