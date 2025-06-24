import { z } from "zod";

export const createLoginDto = z.object({
  username: z.string().email(),
  password: z.string()
});
