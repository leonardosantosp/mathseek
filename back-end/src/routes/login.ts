import { verifyPassword } from '../utils/hash'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserSchema } from '../models/user.schema'


export function loginRoute(app) {
  dotenv.config()

  // loga usuario e gera access_token
  app.post('/login', async (req, res) => {
    const { username, password } = req.body // na geracao do token apenas o username

    const isUser = await UserSchema.findOne({ username : username }); // password = password

    if ( !isUser ) return res.status(404).send ({ message : 'Usuario nao encontrado' })

    const isPassword =  await verifyPassword(password, isUser.hashedPassword)

    if ( !isPassword ) return res.stauts(400).send({ message: 'Senha invalida' })

    const access_token = jwt.sign({username: username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m'});

    res.send({user : isUser, access_token: access_token});
  })


  app.post('/refresh', async (req, res) => {
    try {

      const refresh_token = req.body.refresh_token

      if ( refresh_token == null ) return res.status(401) // refreshtoken null

      jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {

        // console.log( err )
        if ( err ) return res.json({ errorInVerification: err })
        const new_access_token = jwt.sign({ user: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m'})
      
        return res.send({new_access_token : new_access_token})
        
      })

    } catch (error) {

      return res.code(401).send({ message: 'Invalid refresh token' })

    }
  })
}
