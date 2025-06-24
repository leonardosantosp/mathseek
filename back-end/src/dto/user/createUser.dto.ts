import { z } from "zod";

export const createUserDto = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string()
});

export type CreateUserDto = z.infer<typeof createUserDto>;
