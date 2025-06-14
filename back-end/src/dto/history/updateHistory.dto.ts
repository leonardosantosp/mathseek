import { z } from "zod";

export const updateHistoryDto = z.number();

export type UpdateHistoryDto = z.infer<typeof updateHistoryDto>;
