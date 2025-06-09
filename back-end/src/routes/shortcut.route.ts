import { getShortcutsController } from '../controllers/shortcut.controller'
import { z } from 'zod'
import { authenticateToken } from '../services/registerAuthServer.service'

export function shortcutRoute(app) {
  app.get(
    '/users/me/shortcuts',
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
    getShortcutsController
  )
}
