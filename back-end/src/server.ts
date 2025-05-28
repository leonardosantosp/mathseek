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
import { signRoute } from './routes/signup'
import dotenv from 'dotenv'
import { loginRoute } from './routes/login'
import { authServer } from './routes/authServer'
import { profile } from './routes/profile'
import { connectDb, mongoose } from './config/connect'

dotenv.config()

// criando conexao com mongo

const uri = "mongodb://localhost:27017/elastic_db"




mongoose.connect ( uri ).then(() => console.log( 'MongoDB conectado em ', uri ))
                        .catch( err => {
                          console.log( "Erro na conexao com MongoDB", err )
                          process.exit(1)
                        });
                      
// ===============

// connectDb() // conectando com o atlas db

const app = fastify()

app.register(signRoute)
app.register(loginRoute)
app.register(profile)
app.register(authServer)

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
