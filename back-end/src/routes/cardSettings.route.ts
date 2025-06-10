import { getCardSettingsController } from "../controllers/cardSettings.controller";
import { z } from "zod";
import { authenticateToken } from "../services/registerAuthServer.service";

export function cardSettingsRoute(app) {
  app.get(
    "/users/me/card-settings",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "",
        description: "",
        tags: [""],
        response: {
          200: z.object({
            fontFamily: z.string(),
            folders: z.array(z.number()),
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
