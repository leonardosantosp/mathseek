import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function authenticateToken(request, reply, next) {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return reply.code(401).send({ message: 'Token ausente' })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return reply.code(401).send({ message: 'Token inválido' })
    request.user = user
    next()
  })
}
