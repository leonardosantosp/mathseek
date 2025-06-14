import { z } from "zod";
import {
  getFoldersController,
  updateFoldersController
} from "../controllers/folder.controller";
import { authenticateToken } from "../services/registerAuthServer.service";
import { updateFoldersDto } from "../dto/folders/updateFolders.dto";
import { userSchema } from "../schemas/user.schema";

export function folderRoute(app) {
  app.get(
    "/users/me/folders",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Get User Folders",
        description:
          "Fetches all folders associated with the authenticated user. Each folder contains a name and a list of item IDs. Requires a valid access token in the Authorization header.",
        tags: ["User", "Folders"],
        response: {
          200: z.array(
            z.object({
              folderName: z.string(),
              list: z.array(z.number())
            })
          ),
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
    getFoldersController
  );

  app.patch(
    "/users/me/folders",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "",
        description: "",
        tags: [""],
        body: z.object({
          folders: z.array(updateFoldersDto)
        }),
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
    updateFoldersController
  );
}
