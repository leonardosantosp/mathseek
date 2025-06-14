import { z } from "zod";

export const updateShortcutsDto = z.array(z.number());

export type UpdateShortcutsDto = z.infer<typeof updateShortcutsDto>;
