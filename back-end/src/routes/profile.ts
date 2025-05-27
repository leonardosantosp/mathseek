import type { FastifyInstance } from 'fastify'
import { UserSchema } from '../models/user.schema';

// calls para recuperar info de user

export function profile(app: FastifyInstance) {


  // nao ultilizando no momento
  // app.addHook('onRequest', async (req, res) => {
  //   try {
  //     await req.jwtVerify()
  //   } catch (error) {
  //     return res.status(401).send({ error })
  //   }
  // })


  // tipando parametros
  interface UserParams {
    id: string;
  }

  // encontra usuario
  app.get <{Params: UserParams }> ('/user/:id', async ( req, res ) => {
    const userId = req.params.id;

    // procurando user
    const user = await UserSchema.findById(userId);

    if ( !user ) {
      return res.status(401).send({ message: "Usuario nao encontrado!" })
    }

    // se usuario encontrado, ja carrega as configs dele?
    
    return res.status(201).send(user);
  })
}
