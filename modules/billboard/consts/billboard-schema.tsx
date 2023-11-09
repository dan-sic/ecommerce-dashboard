"use client"

import { z } from "zod"

export const billboardSchema = z.object({
  label: z.string().min(3).max(255),
  file: z.instanceof(File).nullable(),
})
export type BillboardFormData = z.infer<typeof billboardSchema>
