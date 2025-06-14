import {
  getHistoryController,
  updateHistoryController
} from "../controllers/history.controller";
import { authenticateToken } from "../services/registerAuthServer.service";
import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { updateHistoryDto } from "../dto/history/updateHistory.dto";

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

  app.patch(
    "/users/me/history",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Update user history",
        description:
          "Updates the `history` field of the currently authenticated user. The request body must contain an array of numbers representing the new history.",
        tags: ["User", "History"],
        body: z.object({
          history: updateHistoryDto,
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
    updateHistoryController
  );
}
