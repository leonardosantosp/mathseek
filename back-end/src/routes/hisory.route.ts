import { getHistoryController } from "../controllers/history.controller";
import { authenticateToken } from "../services/registerAuthServer.service";
import { z } from "zod";

export function historyRoute(app) {
  app.get(
    "/users/me/history",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Get User History",
        description:
          "Retrieves the history of accessed or used items for the authenticated user. Requires a valid access token in the Authorization header.",
        tags: ["User", "History"],
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
    getHistoryController
  );
}
