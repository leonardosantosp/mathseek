import { z } from "zod";
import { getFoldersController } from "../controllers/folder.controller";
import { authenticateToken } from "../services/registerAuthServer.service";

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
}
