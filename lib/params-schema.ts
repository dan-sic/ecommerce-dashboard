import { z } from "zod"

export const pathParamsSchema = z.object({
  storeId: z.string(),
  billboardId: z.string(),
})
