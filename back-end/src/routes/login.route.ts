import dotenv from 'dotenv'
import {
  loginController,
  refreshController
} from '../controllers/login.controller'
import { z } from 'zod'
import { createLoginDto } from '../dto/login/createLogin.dto'
import { userSchema } from '../schemas/user.schema'

export function loginRoute(app) {
  dotenv.config()

  // loga usuario e gera access_token e refreseh_token
  app.post(
    '/login',
    {
      schema: {
        summary: '',
        description: '',
        tags: [''],
        body: createLoginDto,
        response: {
          200: z.object({
            user: userSchema,
            isPassword: z.boolean(),
            accessToken: z.string(),
            refreshToken: z.string()
          }),
          401: z.object({
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
    loginController
  )

  // TO-DO: melhorar implementacao
  // gera o access_token
  // function generateAccessToken ( user ) {
  //   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '3m' })
  // }

  app.post(
    '/refresh',
    {
      schema: {
        summary: '',
        description: '',
        tags: [''],
        body: z.object({
          refreshToken: z.string()
        }),
        response: {
          200: z.object({
            accessToken: z.string()
          }),
          401: z.object({
            message: z.string()
          })
        }
      }
    },
    refreshController
  )
}
