import { getFavoriteController } from '../controllers/favorite.controller'
import { authenticateToken } from '../services/registerAuthServer.service'
import { z } from 'zod'

export function favoriteRoute(app) {
  app.get(
    '/users/me/favorites',
    {
      preHandler: authenticateToken,
      schema: {
        summary: '',
        decription: '',
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
    getFavoriteController
  )
}
