import { createUserController } from '../controllers/user.controller'
import { createUserDto } from '../dto/user/createUser.dto'
import { userSchema } from '../schemas/user.schema'
import { z } from 'zod'

// calls para criacao de usuario
export function signRoute(app) {
  // sign um usuario
  app.post(
    '/signup',
    {
      schema: {
        summary: '',
        description: '',
        tags: [''],
        body: createUserDto,
        response: {
          201: userSchema,
          400: z.object({
            message: z.string()
          }),
          409: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string(),
            error: z.string()
          })
        }
      }
    },
    createUserController
  )
}
