import { getFavoriteController } from "../controllers/favorite.controller";
import { authenticateToken } from "../services/registerAuthServer.service";
import { z } from "zod";

export function favoriteRoute(app) {
  app.get(
    "/users/me/favorites",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Get Favorite Items",
        decription:
          "Retrieves a list of favorite item IDs associated with the authenticated user. Requires a valid access token provided in the Authorization header.",
        tags: ["User", "Favorites"],
        response: {
          200: z.array(z.number()),
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
    getFavoriteController
  );
}
