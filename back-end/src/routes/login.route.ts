import dotenv from "dotenv";
import {
  loginController,
  refreshController
} from "../controllers/login.controller";
import { z } from "zod";
import { createLoginDto } from "../dto/login/createLogin.dto";
import { userSchema } from "../schemas/user.schema";

export function loginRoute(app) {
  dotenv.config();

  // loga usuario e gera access_token e refreseh_token
  app.post(
    "/login",
    {
      schema: {
        summary: "Authenticate User",
        description:
          "Authenticates a user using email and password credentials. Returns user info and JWT tokens (access and refresh).",
        tags: ["Auth"],
        body: createLoginDto,
        response: {
          200: z.object({
            user: userSchema,
            isPassword: z.boolean(),
            accessToken: z.string(),
            refreshToken: z.string()
          }),
          401: z.object({
            message: z.string()
          }),
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
    loginController
  );

  app.post(
    "/refresh",
    {
      schema: {
        summary: "Refresh Access Token",
        description:
          "Generates a new access token using a valid refresh token. The refresh token must be provided in the request body.",
        tags: ["Auth"],
        body: z.object({
          refreshToken: z.string()
        }),
        response: {
          200: z.object({
            accessToken: z.string()
          }),
          401: z.object({
            message: z.string()
          })
        }
      }
    },
    refreshController
  );
}
