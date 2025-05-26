import { verifyPassword } from '../utils/hash'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export function loginRoute(app) {
  dotenv.config()


  // loga usuario e gera access_token e refreseh_token 
  app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = { username: username }; // melhor so incluir username na autenticacao

    
    // TO-DO: autenticacao da senha


    // na teoria essa senha encriptada ja pode ser gerada quando o usuario se cadastrar
    //TO-DO: fazer ecrpt no sign in
    async function hashPassword (password: string ) {
      const salt = await bcrypt.genSalt(10) // valor de salt = 10
      return bcrypt.hash(password, salt)
    }

    const hashedPassword = await hashPassword(password);

    //

    // verificando senha passada no body com senha encrypt
    async function verifyPassword ( password: string, hash: string ) {
      return bcrypt.compare ( password, hash)
    }

    const isPassword =  await verifyPassword(password, hashedPassword)

    if ( !isPassword ) return res.stauts(400).send({ message: 'Invalid Password' })
    
    // const hashPassword =
    //   '$2b$10$/OjRjRxm2rGDV41dzgHZzO8V1T4KuzxNh6tlcdBmQr6MJhWWA6ZCG'

    // const isPassword = await verifyPassword(password, hashPassword)

    // if (!isPassword) {
    //   return res.status(400).send({ message: 'Invalid Password' })
    // }

    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '3m'});

    const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn : '10m' });

    return res.status(200).send({ user: user,password: password, hashedPassword: hashedPassword, isPassword: isPassword, access_token: access_token, refresh_token: refresh_token, accessSecret: process.env.ACCESS_TOKEN_SECRET, refreshSecret:process.env.REFRESH_TOKEN_SECRET })
  })


  // TO-DO: melhorar implementacao
  // gera o access_token 
  // function generateAccessToken ( user ) {
  //   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '3m' })
  // }

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
