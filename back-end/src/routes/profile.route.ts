import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { userSchema } from '../schemas/user.schema'
import {
  deleteUserController,
  getUserByIdController,
  getUserByUsernameController
} from '../controllers/user.controller'
import { authenticateToken } from '../services/registerAuthServer.service'

// calls para recuperar info de user

export function profile(app: FastifyInstance) {
  // encontra usuario
  app.get(
    '/user/me',
    {
      preHandler: authenticateToken,
      schema: {
        summary: '',
        description: '',
        tags: [''],

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

  app.delete(
    '/user/me',
    {
      preHandler: authenticateToken,
      schema: {
        summary: '',
        description: '',
        tags: [''],
        response: {
          204: {
            description: 'no content',
            type: 'null'
          },
          400: z.object({
            message: z.string()
          }),
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
    deleteUserController
  )
}
