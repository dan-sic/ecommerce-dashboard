import { z } from "zod"

import { ALLOWED_IMAGE_TYPES, UPLOAD_MAX_FILE_SIZE } from "@/lib/consts"

export const billboardSchema = z.object({
  label: z.string().min(3).max(255),
  file: z
    .any()
    .refine(
      (file) => {
        if (!file) return true
        return file.size < UPLOAD_MAX_FILE_SIZE
      },
      `File cannot be larger than ${UPLOAD_MAX_FILE_SIZE / (1024 * 1024)} MB.`
    )
    .refine(
      (file) => {
        if (!file) return true
        console.log(file.type)
        return ALLOWED_IMAGE_TYPES.includes(file.type)
      },
      `File must be one of ${ALLOWED_IMAGE_TYPES.map(
        (t) => "." + t.split("/")[1]
      ).join(", ")}.`
    )
    .nullable(),
  imageId: z.string().nullable(),
})

export type BillboardFormData = z.infer<typeof billboardSchema>

export const billboardIdParams = z.object({
  storeId: z.string(),
  billboardId: z.string(),
})
