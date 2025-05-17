import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  validatorCompiler,
  serializerCompiler
} from 'fastify-type-provider-zod'
import cors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { searchRoutes } from './routes/elasticsearch.route'
import { authRoute } from './routes/signup'
import fastifyJwt from '@fastify/jwt'
import dotenv from 'dotenv'
import { loginRoute } from './routes/login'
import { profile } from './routes/profile'

dotenv.config()
const jwtSecret = process.env.ACCESS_TOKEN_SECRET

const app = fastify()

if (!jwtSecret) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined in .env')
}

app.register(authRoute)
app.register(loginRoute)
app.register(profile)

app.register(fastifyJwt, {
  secret: jwtSecret
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// app.register(cors, {
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
// })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Mathseek',
      version: '0.0.1'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(searchRoutes)

app.listen({ port: 3333 }, (err, address) => {
  console.log(`app listening at ${address}`)
  if (err) {
    app.log.error(err)
  }
})
