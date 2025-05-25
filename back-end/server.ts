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
// import { loginRoute } from './routes/login'
import { authServer } from './routes/authServer'
import { profile } from './routes/profile'
import { authentication } from './routes/authentication'
// import jwt from 'jsonwebtoken'


dotenv.config()
const jwtSecret = process.env.DEFAULT_TOKEN_SECRET

const app = fastify()

const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]


// if (!jwtSecret) {
//   throw new Error('REGISTER_TOKEN_SECRET is not defined in .env')
// }

app.register(authRoute)
app.register(authServer)
app.register(profile)
app.register(authentication)

// app.register(fastifyJwt, {
//   secret: jwtSecret
// })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
})

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
