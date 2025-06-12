import { z } from "zod";

export const updateHistoryDto = z.array(z.number());

export type UpdateHistoryDto = z.infer<typeof updateHistoryDto>;
