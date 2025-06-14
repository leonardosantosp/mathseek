import { z } from "zod";

export const updateGeneralSettingsDto = z.object({
  backgroundImage: z.string().optional(),
  outputMethod: z.string().optional(),
  themeColor: z.string().optional()
});

export type UpdateGeneralSettingsDto = z.infer<typeof updateGeneralSettingsDto>;
