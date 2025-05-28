import { UserSchema } from '../models/user.schema'
import { hashPassword } from '../utils/hash'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// calls para criacao de usuario
export function signRoute(app) {
  dotenv.config()

  // sign um usuario
  app.post('/signup', async (req, reply) => {
    try{
      const { username, email, password } = req.body

       // verificar ser usuario eh unico
      const userExist = await UserSchema.findOne({ username : username })

      if ( userExist != undefined ) return reply.code(409).send({ message : 'Usuario ja existe'})

      const hashedPassword = await hashPassword(password)

      const user = await UserSchema.create({
        username: username,
        email: email,
        hashedPassword: hashedPassword,
      })

      // sempre jogar um objeto em jwt.sign. se jwt.sign(username, process...) -> erro 500 internal server error
      const access_token = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m'});

      return reply.code(201).send({ user : user, access_token: access_token });

    } catch ( err ) {
      return reply.code(500).send({ message : err });
    }
  })
}
