import { getGeneralSettingsController } from "../controllers/generalSettings.controller";
import { z } from "zod";
import { authenticateToken } from "../services/registerAuthServer.service";

export function generalSettingsRoute(app) {
  app.get(
    "/users/me/general-settings",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Get General Settings",
        description:
          "Retrieves the general settings for the authenticated user. This includes the selected theme color, background image URL, and preferred output method. Requires a valid access token in the Authorization header.",
        tags: ["User", "Settings"],
        response: {
          200: z.object({
            themeColor: z.string(),
            backgroundImage: z.string(),
            outputMethod: z.string()
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
    getGeneralSettingsController
  );
}
