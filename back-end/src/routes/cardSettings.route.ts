import { getCardSettingsController } from "../controllers/cardSettings.controller";
import { z } from "zod";
import { authenticateToken } from "../services/registerAuthServer.service";

export function cardSettingsRoute(app) {
  app.get(
    "/users/me/card-settings",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Get Card Settings",
        description:
          "Returns the authenticated user's card settings, including preferred font, folders, quick access items, favorites, and history. Requires a valid access token in the Authorization header.",
        tags: ["User", "Card Settings"],
        response: {
          200: z.object({
            fontFamily: z.string(),
            folders: z.array(
              z.object({
                folderName: z.string(),
                list: z.array(z.number())
              })
            ),
            quickAccess: z.array(z.number()),
            favorite: z.array(z.number()),
            history: z.array(z.number())
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
    getCardSettingsController
  );
}
