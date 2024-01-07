import { revalidatePath } from "next/cache"
import {
  billboardIdParams,
  newBillboardSchema,
} from "@/modules/billboard/consts/billboard-schema"
import {
  getBillboards,
  mapToBillboardClientModel,
} from "@/modules/billboard/data"
import { storeIdParam } from "@/modules/store/consts/store-schema"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { v4 as uuidv4 } from "uuid"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { UPLOAD_MAX_FILE_SIZE } from "@/lib/consts"
import prisma from "@/lib/db"
import { getEnvVariable } from "@/lib/get-env-variable"
import { s3Client } from "@/lib/s3-client"
import { validateSchema } from "@/lib/validate-schema"

const GET = apiRequestMiddleware({
  handler: async (_, params) => {
    const { storeId } = validateSchema(params, storeIdParam)

    const billboards = await getBillboards(storeId)

    return new Response(JSON.stringify(billboards), { status: 200 })
  },
  isProtectedRoute: false,
})

const POST = apiRequestMiddleware({
  handler: async (req: Request, { params }) => {
    const { storeId } = validateSchema(params, storeIdParam)

    const body = await req.formData()
    const parsedData = JSON.parse((body.get("data") as string) ?? "{}")
    const file = body.get("file") instanceof File ? body.get("file") : null

    const validatedData = validateSchema(
      { ...parsedData, file },
      newBillboardSchema.pick({ label: true, file: true })
    )

    let imageId: string | null = null

    if (validatedData.file) {
      imageId = uuidv4()

      const { url, fields } = await getS3SignedUrl({ fileId: imageId })

      const uploadData: Record<string, any> = {
        ...fields,
        "Content-Type": validatedData.file.type,
      }

      const formData = new FormData()
      for (const name in uploadData) {
        formData.append(name, uploadData[name])
      }

      formData.append("file", validatedData.file)

      await fetch(url, {
        method: "POST",
        body: formData,
      })
    }

    const billboard = await prisma.billboard.create({
      data: {
        label: validatedData.label,
        storeId,
        imageId,
      },
    })

    revalidatePath("(dashboard)/[storeId]/billboards", "page")

    return new Response(JSON.stringify(mapToBillboardClientModel(billboard)), {
      status: 201,
    })
  },
})

export { GET, POST }

const getS3SignedUrl = async ({ fileId }: { fileId: string }) => {
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: getEnvVariable("S3_BUCKET_NAME"),
    Key: fileId,
    Fields: {
      key: fileId,
    },
    Conditions: [
      ["starts-with", "$Content-Type", "image/"],
      ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
    ],
  })

  return { url, fields }
}
