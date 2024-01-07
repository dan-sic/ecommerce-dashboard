import { z } from "zod"

import { billboardSchema, newBillboardSchema } from "./consts/billboard-schema"

export type BillboardClientModel = z.infer<typeof billboardSchema>

export type BillboardFormData = z.infer<typeof newBillboardSchema>
