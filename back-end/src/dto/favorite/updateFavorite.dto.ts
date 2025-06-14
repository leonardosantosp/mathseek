import { z } from "zod";

export const updateFavoriteDto = z.number();

export type UpdateFavoriteDto = z.infer<typeof updateFavoriteDto>;
