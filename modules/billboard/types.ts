import { z } from "zod"

import {
  billboardClientModelSchema,
  newBillboardSchema,
} from "./consts/billboard-schema"

export type BillboardClientModel = z.infer<
  typeof billboardClientModelSchema
> & {
  temp?: boolean
}

export type BillboardFormData = z.infer<typeof newBillboardSchema>
