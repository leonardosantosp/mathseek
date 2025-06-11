import { createUserController } from "../controllers/user.controller";
import { createUserDto } from "../dto/user/createUser.dto";
import { userSchema } from "../schemas/user.schema";
import { z } from "zod";

// calls para criacao de usuario
export function signRoute(app) {
  // sign um usuario
  app.post(
    "/signup",
    {
      schema: {
        summary: "Register a New User",
        description:
          "Creates a new user account in the system. Requires a unique username and a valid email. Returns the newly created user object upon success.",
        tags: ["Auth"],
        body: createUserDto,
        response: {
          201: userSchema,
          400: z.object({
            message: z.string()
          }),
          409: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string(),
            error: z.string()
          })
        }
      }
    },
    createUserController
  );
}
