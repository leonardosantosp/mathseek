import { z } from "zod";

export const updateGeneralSettingsDto = z.object({
  backgroundImage: z.string(),
  outputMethod: z.string(),
  themeColor: z.string()
});

export type UpdateGeneralSettingsDto = z.infer<typeof updateGeneralSettingsDto>;
