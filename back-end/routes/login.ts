import { verifyPassword } from '../utils/hash'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export function loginRoute(app) {
  dotenv.config()

  app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = { username: username }; // melhor so incluir username na autenticacao

    
    // TO-DO: autenticacao da senha

    // const hashPassword =
    //   '$2b$10$/OjRjRxm2rGDV41dzgHZzO8V1T4KuzxNh6tlcdBmQr6MJhWWA6ZCG'

    // const isPassword = await verifyPassword(password, hashPassword)

    // if (!isPassword) {
    //   return res.status(400).send({ message: 'Invalid Password' })
    // }

    //dados do usuário
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '3m'});

    const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn : '10m' });

    return res.status(200).send({ user: user, access_token: access_token, refresh_token: refresh_token, accessSecret: process.env.ACCESS_TOKEN_SECRET, refreshSecret:process.env.REFRESH_TOKEN_SECRET })
  })

  function generateAccessToken ( user ) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '3m' })
  }



  // app.post('/login', async (req, res) => {
  //   const { email, password } = req.body

  //   const hashPassword =
  //     '$2b$10$/OjRjRxm2rGDV41dzgHZzO8V1T4KuzxNh6tlcdBmQr6MJhWWA6ZCG'

  //   const isPassword = await verifyPassword(password, hashPassword)

  //   if (!isPassword) {
  //     return res.status(400).send({ message: 'Invalid Password' })
  //   }

  //   //dados do usuário
  //   const accessToken = jwt.sign(
  //     { id: '1', email: email },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     { expiresIn: '10s' }
  //   )

  //   const refreshToken = jwt.sign(
  //     { id: '1' },
  //     process.env.REFRESH_TOKEN_SECRET,
  //     { expiresIn: '7d' }
  //   )

  //   return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, accessSecret: process.env.ACCESS_TOKEN_SECRET, refreshSecret:process.env.REFRESH_TOKEN_SECRET })
  // })

  app.post('/refresh', async (req, res) => {
    try {

      const refresh_token = req.body.refresh_token

      if ( refresh_token == null ) return res.status(401) // refreshtoken = n

      jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {

        // console.log( err )
        if ( err ) return res.json({ errorInVerification: err })
        const new_access_token = generateAccessToken({ user: user.username })
      
        return res.send({new_access_token : new_access_token})
        
      });

    } catch (error) {

      return res.code(401).send({ message: 'Invalid refresh token' })

    }
  })
}

//   app.post('/refresh', async (req, res) => {
//     try {
//       const refreshToken = req.body.refreshToken

//       const decoded = jwt.verify(refreshToken)

//       const newAccessToken = jwt.sign(
//         { id: decoded.id },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '30s' }
//       )

//       return res.send({ accessToken: newAccessToken })
//     } catch (error) {
//       return res.code(401).send({ message: 'Invalid refresh token' })
//     }
//   })
// }
