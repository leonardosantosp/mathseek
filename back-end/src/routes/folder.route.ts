import { z } from 'zod'
import { getFoldersController } from '../controllers/folder.controller'
import { authenticateToken } from '../services/registerAuthServer.service'

export function folderRoute(app) {
  app.get(
    '/users/me/folders',
    {
      preHandler: authenticateToken,
      schema: {
        summary: '',
        description: '',
        tags: [''],
        response: {
          200: z.array(
            z.object({
              folderName: z.string(),
              list: z.array(z.number())
            })
          ),
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
    getFoldersController
  )
}
