import { z } from "zod";
import {
  addOrRemoveItemInFolderController,
  getFolderByFolderNameController,
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
              wikipages: z.array(z.number())
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

  app.get(
    "/users/me/folders/:folderName",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "",
        description: "",
        tags: [""],
        params: z.object({
          folderName: z.string()
        }),
        response: {
          200: z.object({
            folderName: z.string(),
            wikipages: z.array(z.number())
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
    getFolderByFolderNameController
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
          folders: updateFoldersDto,
          type: z.string()
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

  app.patch(
    "/users/me/folders/:folderName/items",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "",
        description: "",
        tags: [""],
        params: z.object({
          folderName: z.string()
        }),
        body: z.object({
          type: z.string(),
          item: z.number()
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
    addOrRemoveItemInFolderController
  );
}
