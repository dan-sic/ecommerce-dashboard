import { z } from "zod"

export const storeSchema = z.object({
  name: z.string().min(3).max(255),
})
