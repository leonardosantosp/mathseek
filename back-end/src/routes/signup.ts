import { hashPassword } from '../utils/hash'

export function authRoute(app) {
  app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body

    const hashedPassword = await hashPassword(password)

    const user = {
      name: name,
      email: email,
      password: hashedPassword
    }

    return res.status(201).send(user)
  })
}
