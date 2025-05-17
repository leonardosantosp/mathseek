import { verifyPassword } from '../utils/hash'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export function loginRoute(app) {
  dotenv.config()

  app.post('/login', async (req, res) => {
    const { email, password } = req.body

    const hashPassword =
      '$2b$10$/OjRjRxm2rGDV41dzgHZzO8V1T4KuzxNh6tlcdBmQr6MJhWWA6ZCG'

    const isPassword = await verifyPassword(password, hashPassword)

    if (!isPassword) {
      return res.status(400).send({ message: 'Invalid Password' })
    }

    //dados do usuário
    const accessToken = jwt.sign(
      { id: '1', email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    )

    const refreshToken = jwt.sign(
      { id: '1' },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )

    return res.status(200).send({ accessToken, refreshToken })
  })

  app.post('/refresh', async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken

      const decoded = jwt.verify(refreshToken)

      const newAccessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      )

      return res.send({ accessToken: newAccessToken })
    } catch (error) {
      return res.code(401).send({ message: 'Invalid refresh token' })
    }
  })
}
