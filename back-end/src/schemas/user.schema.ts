import { z } from "zod";

const configSchema = z.object({
  backgroundImage: z.string(),
  fontFamily: z.string(),
  outputMethod: z.string(),
  themeColor: z.string(),
  favorite: z.array(z.number()),
  folders: z.array(
    z.object({
      foldernName: z.string(),
      list: z.array(z.number())
    })
  ),
  quickAccess: z.array(z.number())
});

export const userSchema = z.object({
  _id: z.instanceof(Object).transform(id => id.toString()),
  username: z.string(),
  email: z.string(),
  status: z.string(),
  history: z.array(z.number()),
  avatar: z.string(),
  hashedPassword: z.string(),
  config: configSchema,
  createdAt: z.date(),
  updatedAt: z.date()
});
