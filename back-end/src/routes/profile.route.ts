import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { userSchema } from '../schemas/user.schema'
import {
  getUserByIdController,
  getUserByUsernameController
} from '../controllers/user.controller'

// calls para recuperar info de user

export function profile(app: FastifyInstance) {
  // encontra usuario
  app.get(
    '/user/:id',
    {
      schema: {
        summary: '',
        description: '',
        tags: [''],
        params: z.object({
          id: z.string()
        }),
        response: {
          200: userSchema,
          400: z.object({
            message: z.string()
          }),
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
    getUserByIdController
  )

  app.get(
    '/user/search/:username',
    {
      schema: {
        summary: '',
        description: '',
        tags: [''],
        params: z.object({
          username: z.string()
        }),
        response: {
          200: userSchema,
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
    getUserByUsernameController
  )
}
