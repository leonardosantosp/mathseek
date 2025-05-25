import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export function authServer(app) {
    dotenv.config()
  
    app.post('/login', async (req, res) => {
      const { username, password } = req.body
      const user = { username: username, password: password }
  
      //dados do usuário
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1min' })
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
  
      return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, accessSecret: process.env.ACCESS_TOKEN_SECRET, refreshSecret:process.env.REFRESH_TOKEN_SECRET })
    })
  
    // renovando ACCESS_TOKEN com REFRESH_TOKEN
    app.post('/refresh', async (req, res) => {
        const refreshToken = req.body.refreshToken
        if( refreshToken == null ) return res.status(401)
        // if( refreshTokens.includes( refreshToken ) ) return res.status(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, ( err, user ) => {
          console.log( err )
          if ( err ) return res.json({ errorInVerification: err })
          const newAccessToken = generateAccessToken({ name: user.username })
          return res.send({ newAccessToken: newAccessToken })
        })
    })
  
    // to-do deletar refresh tokens
    app.delete('/logout', (req, res) => {
      // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
      res.sendStatus(204)
    })
  
    function generateAccessToken( user ) {
      return jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' } )
    }
}
  