import { getHistoryController } from '../controllers/history.controller'
import { authenticateToken } from '../services/registerAuthServer.service'
import { z } from 'zod'

export function historyRoute(app) {
  app.get(
    '/users/me/history',
    {
      preHandler: authenticateToken,
      schema: {
        summary: '',
        description: '',
        tags: [''],
        response: {
          200: z.array(z.number()),
          404: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string(),
            error: z.string()
          })
        }
      }
    },
    getHistoryController
  )
}
