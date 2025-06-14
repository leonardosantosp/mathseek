import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import {
  deleteUserController,
  getUserByIdController,
  getUserByUsernameController,
  updateProfileController
} from "../controllers/user.controller";
import { authenticateToken } from "../services/registerAuthServer.service";
import { updateProfileDto } from "../dto/profile/updateProfile.dto";

// calls para recuperar info de user

export function profile(app: FastifyInstance) {
  // encontra usuario
  app.get(
    "/user/me",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Get Authenticated User",
        description:
          "Retrieves the profile information of the currently authenticated user.",
        tags: ["User"],

        response: {
          200: userSchema,
          400: z.object({
            message: z.string()
          }),
          404: z.object({
            message: z.string()
          }),
          500: z.object({
            error: z.string(),
            message: z.string()
          })
        }
      }
    },
    getUserByIdController
  );

  app.get(
    "/user/search/:username",
    {
      schema: {
        summary: "Search User by Username",
        description:
          "Searches for a user by their username and returns their public profile information.",
        tags: ["User"],
        params: z.object({
          username: z.string()
        }),
        response: {
          200: userSchema,
          404: z.object({
            message: z.string()
          }),
          500: z.object({
            error: z.string(),
            message: z.string()
          })
        }
      }
    },
    getUserByUsernameController
  );

  app.delete(
    "/user/me",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Delete Authenticated User",
        description:
          "Deletes the currently authenticated user from the system.",
        tags: ["User"],
        response: {
          204: {
            description: "no content",
            type: "null"
          },
          400: z.object({
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
    deleteUserController
  );

  app.patch(
    "/users/me/profile",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "",
        description: "",
        tags: [""],
        body: updateProfileDto,
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
    updateProfileController
  );
}
