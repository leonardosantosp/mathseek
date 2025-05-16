import {
  getDocsWikipediaService,
  getDocByIdWikipediaService
} from '../services/elasticsearch.service'

export const getDocsWikipediaController = async (req, res) => {
  const { query } = req.query

  try {
    const results = await getDocsWikipediaService(query)
    return res.status(200).send(results)
  } catch (error) {
    console.error('Error while fetching query', error)
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

export const getDocByIdWikipediaController = async (req, res) => {
  const { id } = req.params

  try {
    const result = await getDocByIdWikipediaService(id)
    return res.status(200).send(result)
  } catch (error) {
    if (error instanceof Error && error.message === 'document not found') {
      return res.status(404).send({ message: 'document not found' })
    }
    console.error('Error while fetching document', error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}
