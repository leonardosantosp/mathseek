import { z } from 'zod'
import {
  getDocsWikipediaController,
  getDocByIdWikipediaController,
  getMostViewedDocsWikipediaController
} from '../controllers/elasticsearch.controller'
import { resultSchema } from '../schemas/elasticsearch.schema'

export function searchRoutes(app) {
  app.get(
    '/wikipedia/search',
    {
      schema: {
        summary: 'Search Wikipedia documents',
        description:
          'Search for Wikipedia documents in the Elasticsearch index based on a query string.',
        tags: ['Wikipedia', 'Elasticsearch'],
        querystring: z.object({
          query: z.string(),
          page: z.coerce.number(),
          pageSize: z.coerce.number()
        }),
        response: {
          200: z.object({
            total: z.number(),
            results: z
              .array(resultSchema)
              .describe('List of documents matching the search query')
          }),
          500: z
            .object({
              error: z.string(),
              message: z.string()
            })
            .describe('Internal server error')
        }
      }
    },
    getDocsWikipediaController
  )

  app.get(
    '/wikipedia/:id',
    {
      schema: {
        summary: 'Get Wikipedia document by ID',
        description:
          'Retrieve a single Wikipedia document from Elasticsearch by its ID.',
        tags: ['Wikipedia', 'Elasticsearch'],
        params: z.object({
          id: z.string()
        }),
        response: {
          200: resultSchema.describe('Document successfully retrieved'),
          404: z
            .object({
              message: z.string()
            })
            .describe('Document not found'),
          500: z
            .object({
              error: z.string(),
              message: z.string()
            })
            .describe('Internal server error')
        }
      }
    },
    getDocByIdWikipediaController
  )

  app.get(
    '/wikipedia/mostViews/:limit',
    {
      schema: {
        summary: 'Get the most viewed Wikipedia documents',
        description:
          'Retrieves the top N Wikipedia documents based on their access count, ordered from most to least viewed. The number of documents to retrieve is defined by the `limit` path parameter.',
        tags: ['Wikipedia', 'Elasticsearch'],
        params: z.object({
          limit: z.coerce.number()
        }),
        response: {
          200: z.array(
            resultSchema.describe('Document successfully retrieved')
          ),
          400: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string(),
            error: z.string()
          })
        }
      }
    },
    getMostViewedDocsWikipediaController
  )
}
