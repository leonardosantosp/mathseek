import { z } from 'zod'
import {
  getDocsWikipediaController,
  getDocByIdWikipediaController
} from '../controllers/elasticsearch.controller'
import { resultSchema } from '../schemas/elasticsearch.schema'

export function searchRoutes(app) {
  app.get(
<<<<<<< HEAD
    '/wikipedia/search',
    {
      schema: {
        summary: 'Search Wikipedia documents',
        description:
          'Search for Wikipedia documents in the Elasticsearch index based on a query string.',
        tags: ['Wikipedia', 'Elasticsearch'],
=======
    '/search',
    {
      schema: {
        summary: 'get document',
        description: 'get documents',
        tags: ['elastic'],
>>>>>>> 54fb40c (feat: initialize backend and add routes for Elasticsearch queries and document retrieval by ID and update image sizes on frontend)
        querystring: z.object({
          query: z.string()
        }),
        response: {
<<<<<<< HEAD
          200: z
            .array(resultSchema)
            .describe('List of documents matching the search query'),
          500: z
            .object({
              error: z.string(),
              message: z.string()
            })
            .describe('Internal server error')
=======
          200: z.array(resultSchema),
          500: z.object({
            error: z.string(),
            message: z.string()
          })
>>>>>>> 54fb40c (feat: initialize backend and add routes for Elasticsearch queries and document retrieval by ID and update image sizes on frontend)
        }
      }
    },
    getDocsWikipediaController
  )

  app.get(
    '/wikipedia/:id',
    {
      schema: {
<<<<<<< HEAD
        summary: 'Get Wikipedia document by ID',
        description:
          'Retrieve a single Wikipedia document from Elasticsearch by its ID.',
        tags: ['Wikipedia', 'Elasticsearch'],
=======
        summary: 'get document by id',
        description: 'get documents by id',
        tags: ['elastic'],
>>>>>>> 54fb40c (feat: initialize backend and add routes for Elasticsearch queries and document retrieval by ID and update image sizes on frontend)
        params: z.object({
          id: z.string()
        }),
        response: {
<<<<<<< HEAD
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
=======
          200: resultSchema,
          404: z.object({
            message: z.string()
          }),
          500: z.object({
            error: z.string(),
            message: z.string()
          })
>>>>>>> 54fb40c (feat: initialize backend and add routes for Elasticsearch queries and document retrieval by ID and update image sizes on frontend)
        }
      }
    },
    getDocByIdWikipediaController
  )
}
