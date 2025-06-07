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
import { signRoute } from './routes/signup.route'
import { loginRoute } from './routes/login.route'
import { authServer } from './routes/authServer.route'
import { profile } from './routes/profile.route'
import { connectDb } from './config/connect'
import { historyRoute } from './routes/hisory.route'

// criando conexao com mongo

connectDb()

const app = fastify()

app.register(signRoute)
app.register(loginRoute)
app.register(profile)
app.register(authServer)
app.register(historyRoute)

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
