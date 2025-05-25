import { Client, errors } from '@elastic/elasticsearch'

type WikipediaDocument = {
  title: string
  url: string
  content: string
  dt_creation: string
  reading_time: number
  access_count?: number
}

export const elasticClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'user123'
  },
  tls: {
    rejectUnauthorized: false
  }
})

export const getDocsWikipediaService = async (query: string) => {
  const results = await elasticClient.search<WikipediaDocument>({
    index: 'wikipedia',
    query: {
      match: {
        content: query
      }
    }
  })

  return results.hits.hits.map(item => ({
    _id: item._id,
    ...item._source
  }))
}

export const getDocByIdWikipediaService = async (id: string) => {
  try {
    const result = await elasticClient.get({
      index: 'wikipedia',
      id
    })

    const _id = result._id
    const resultSource = result._source as WikipediaDocument

    addNumView(id)

    return {
      _id,
      title: resultSource.title,
      url: resultSource.url,
      content: resultSource.content,
      reading_time: resultSource.reading_time,
      access_count: resultSource.access_count
        ? resultSource.access_count + 1
        : 1,
      dt_creation: resultSource.dt_creation
    }
  } catch (error) {
    if (error instanceof errors.ResponseError && error.statusCode === 404) {
      throw new Error('document not found')
    }
  }
}

export const addNumView = async (id: string) => {
  await elasticClient.update({
    index: 'wikipedia',
    id,
    script: {
      source:
        'ctx._source.access_count = (ctx._source.access_count != null ? ctx._source.access_count : 0) + 1',
      lang: 'painless'
    }
  })
}
