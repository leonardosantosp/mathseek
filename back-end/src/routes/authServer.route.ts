import { authenticateToken } from "../services/registerAuthServer.service";
import { authServerController } from "../controllers/registerAuthServer.controller";
import { z } from "zod";
import { userSchema } from "../schemas/user.schema";

// faz as validacoes
// verifica se access token eh valido e faz serializa (da a permissao)
// o token deve ser mandado no headder na requisicao

export function authServer(app) {
  // verifica se o usuario esta em users e se o token no headder
  // da requisicao bate com o ACCESS_TOKEN_SECRET
  app.get(
    "/authenticate",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Validate Access Token",
        description:
          "This endpoint validates the access token provided in the Authorization header. If the token is valid and corresponds to a known user, it returns the user data. Otherwise, it returns an error.",
        tags: ["Authentication"],
        response: {
          200: userSchema,
          404: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string(),
            error: z.string()
          })
        }
      }
    },
    authServerController
  );
}
