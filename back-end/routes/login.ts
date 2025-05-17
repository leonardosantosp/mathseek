import { verifyPassword } from '../utils/hash'
import dotenv from 'dotenv'

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
    const accessToken = app.jwt.sign(
      { id: '1', email: email },
      { expiresIn: '10s' }
    )

    const refreshToken = app.jwt.sign({ id: '1' }, { expiresIn: '7d' })

    return res.status(200).send({ accessToken, refreshToken })
  })

  app.post('/refresh', async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken

      const decoded = app.jwt.verify(refreshToken)

      const newAccessToken = app.jwt.sign(
        { id: decoded.id },
        { expiresIn: '30s' }
      )

      return res.send({ accessToken: newAccessToken })
    } catch (error) {
      return res.code(401).send({ message: 'Invalid refresh token' })
    }
  })
}
