import { z } from "zod";

export const updateCardSettingsDto = z.object({
  fontFamily: z.string()
});

export type UpdateCardSettingsDto = z.infer<typeof updateCardSettingsDto>;
