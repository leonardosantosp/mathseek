import { z } from "zod";

export const updateProfileDto = z.object({
  username: z.string().optional(),
  status: z.string().optional(),
  avatar: z.string().optional()
});

export type UpdateProfileDto = z.infer<typeof updateProfileDto>;
