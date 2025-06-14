import {
  getShortcutsController,
  updateShortcutsController
} from "../controllers/shortcut.controller";
import { z } from "zod";
import { authenticateToken } from "../services/registerAuthServer.service";
import { updateShortcutsDto } from "../dto/shortcuts/updateShortcuts.dto";
import { userSchema } from "../schemas/user.schema";

export function shortcutRoute(app) {
  app.get(
    "/users/me/shortcuts",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "Get User Shortcuts",
        description:
          "Retrieves the list of shortcut IDs associated with the currently authenticated user.",
        tags: ["User Shortcuts"],
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
    getShortcutsController
  );

  app.patch(
    "/users/me/shortcuts",
    {
      preHandler: authenticateToken,
      schema: {
        summary: "",
        description: "",
        tags: [""],
        body: z.object({
          quickAccess: updateShortcutsDto,
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
    updateShortcutsController
  );
}
