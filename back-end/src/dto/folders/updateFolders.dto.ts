import { z } from "zod";

export const updateFoldersDto = z.object({
  folderName: z.string(),
  wikipages: z.array(z.number())
});

export type UpdateFoldersDto = z.infer<typeof updateFoldersDto>;
