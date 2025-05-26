import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

// faz as validacoes
// verifica se access token eh valido e faz serializa (da a permissao)
// o token deve ser mandado no headder na requisicao

export function authServer(app) {
  dotenv.config()

  const users = [
    {
      db_username: 'Leo',
      db_content: 'Leo123'
    },
    {
      db_username: 'Ywao',
      db_content: 'Ywao123'
    }
  ]

  // verifica se o usuario esta em users e se o token no headder
  // da requisicao bate com o ACCESS_TOKEN_SECRET
  app.get('/authenticate', { preHandler: authenticateToken }, (req, res) => {
    // TO-DO: procurar no banco async-await
    const user = users.filter(u => u.db_username === req.user.username)
    if (user.length === 0)
      return res.code(404).send({ message: 'Usuario nao autenticado' })

    return res.send(user)
  })

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] // obtendo token no headder
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401)

    // verificando se token eh autenticado ( bate com o access secret )
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.send({ message: err })
      req.user = user
      next() // sai do preHandler
    })
  }
}
