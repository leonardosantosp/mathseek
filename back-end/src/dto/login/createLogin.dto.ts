import { z } from "zod";

export const createLoginDto = z.object({
  username: z.string(),
  password: z.string()
});
