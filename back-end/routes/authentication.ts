import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export function authentication( app ) {
    dotenv.config()

    const users = [
        {
          db_username: 'Leo',
          db_password: 'Leo123'
        },
        {
          db_username: 'Ywao',
          db_title: 'Ywao123'
        }
      ]

    // verifica se o usuario esta em users e se o token no headder
    // da requisicao bate com o ACCESS_TOKEN_SECRET 
    app.get('/authen', authenticateToken, ( req, res ) => {
        res.json(users.filter(user => user.db_username === req.user.username))
    })

    function authenticateToken ( req, res, next ) {
        const authHeader = req.headers['Authorization'] // obtendo token no headder
        const token = authHeader && authHeader.split(' ')[1]
        if ( token == null ) return res.status( 401 )
        
        // verificando se token eh autenticado ( bate com o access secret )
        jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
            console.log( err )
            if ( err ) return res.json({ message: err })
            req.user = user
            next()
        })
    }
}

