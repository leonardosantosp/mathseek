import {
  getDocsWikipediaService,
  getDocByIdWikipediaService,
  getMostViewedDocsWikipediaService,
  addNumViewDocService
} from '../services/elasticsearch.service'

export const getDocsWikipediaController = async (request, reply) => {
  const { query, page, pageSize } = request.query

  try {
    const results = await getDocsWikipediaService(query, page, pageSize)
    return reply.code(200).send(results)
  } catch (error) {
    console.error('Error while fetching query', error)
    return reply.code(500).send({ message: 'Internal Server Error' })
  }
}

export const getDocByIdWikipediaController = async (request, reply) => {
  const { id } = request.params

  try {
    const result = await getDocByIdWikipediaService(id)
    return reply.code(200).send(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'document not found') {
      return reply.code(404).send({ message: 'document not found' })
    }
    console.error('Error while fetching document', error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}

export const getMostViewedDocsWikipediaController = async (request, reply) => {
  const { limit } = request.params

  try {
    const results = await getMostViewedDocsWikipediaService(limit)
    return reply.code(200).send(results)
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid params') {
      return reply.code(400).send({ message: 'Invalid params' })
    }
    console.error('Internal server error', error)
    return reply.code(500).send({ message: 'Internal server error' })
  }
}

export const addNumViewDocController = async (request, reply) => {
  const { id } = request.params
  try {
    await addNumViewDocService(id)
    return reply.status(204).send()
  } catch (error) {
    if (error instanceof Error && error.message === 'document not found') {
      return reply.status(404).send({ message: 'document not found' })
    }
    console.error(error)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
