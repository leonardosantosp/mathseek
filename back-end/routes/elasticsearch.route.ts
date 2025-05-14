import { z } from 'zod'
import {
  getDocsWikipediaController,
  getDocByIdWikipediaController
} from '../controllers/elasticsearch.controller'
import { resultSchema } from '../schemas/elasticsearch.schema'

export function searchRoutes(app) {
  app.get(
    '/search',
    {
      schema: {
        summary: 'get document',
        description: 'get documents',
        tags: ['elastic'],
        querystring: z.object({
          query: z.string()
        }),
        response: {
          200: z.array(resultSchema),
          500: z.object({
            error: z.string(),
            message: z.string()
          })
        }
      }
    },
    getDocsWikipediaController
  )

  app.get(
    '/wikipedia/:id',
    {
      schema: {
        summary: 'get document by id',
        description: 'get documents by id',
        tags: ['elastic'],
        params: z.object({
          id: z.string()
        }),
        response: {
          200: resultSchema,
          404: z.object({
            message: z.string()
          }),
          500: z.object({
            error: z.string(),
            message: z.string()
          })
        }
      }
    },
    getDocByIdWikipediaController
  )
}
