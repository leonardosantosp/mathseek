import { z } from 'zod'

export const resultSchema = z.object({
  _id: z.string(),
  title: z.string(),
  url: z.string(),
  content: z.string(),
  reading_time: z.number(),
  access_count: z.number().optional(),
  dt_creation: z.string(),
})
