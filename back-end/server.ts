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

const app = fastify()

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
