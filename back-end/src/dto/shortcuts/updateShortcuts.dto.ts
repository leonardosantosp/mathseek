import { z } from "zod";

export const updateShortcutsDto = z.number();

export type UpdateShortcutsDto = z.infer<typeof updateShortcutsDto>;
