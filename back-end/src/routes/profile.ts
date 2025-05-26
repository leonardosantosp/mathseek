import type { FastifyInstance } from 'fastify'

export function profile(app: FastifyInstance) {
  app.addHook('onRequest', async (req, res) => {
    try {
      await req.jwtVerify()
    } catch (error) {
      return res.status(401).send({ error })
    }
  })

  app.get('/profile', req => {
    return req.user
  })
}
