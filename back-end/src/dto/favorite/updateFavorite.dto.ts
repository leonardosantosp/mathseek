import { z } from "zod";

export const updateFavoriteDto = z.array(z.number());

export type UpdateFavoriteDto = z.infer<typeof updateFavoriteDto>;
