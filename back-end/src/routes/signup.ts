import { UserSchema } from '../models/user.schema'
import { hashPassword } from '../utils/hash'

// calls para criacao de usuario
export function signRoute(app) {
  // sign um usuario
  app.post('/signup', async (req, res) => {
    try{
      const { username, email, password } = req.body

      const hashedPassword = await hashPassword(password)

      // criando usuario maneira 1 
      const user = await UserSchema.create({
        username: username,
        email: email,
        password: password,
        hashedPassword: hashedPassword
        // avatar
        // status
        // config
      })

      // criando usuario maneira 2 
      // const user = new UserSchema({
      //   username: username,
      //   email: email,
      //   password: password,
      //   hashedPassword: hashedPassword
      // })

      // const isSaved = await user.save();

      return res.status(201).send(user);

    } catch ( err ) {
      return res.status(500).send({ message : err });
    }
  })
}
