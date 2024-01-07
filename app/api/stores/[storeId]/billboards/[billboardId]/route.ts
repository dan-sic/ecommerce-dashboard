import {
  billboardIdParams,
  newBillboardSchema,
} from "@/modules/billboard/consts/billboard-schema"
import {
  getBillboard,
  mapToBillboardClientModel,
} from "@/modules/billboard/data"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { v4 as uuidv4 } from "uuid"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { UPLOAD_MAX_FILE_SIZE } from "@/lib/consts"
import prisma from "@/lib/db"
import { getEnvVariable } from "@/lib/get-env-variable"
import { s3Client } from "@/lib/s3-client"
import { validateSchema } from "@/lib/validate-schema"

const GET = apiRequestMiddleware({
  handler: async (_, { params }) => {
    const { storeId, billboardId } = validateSchema(params, billboardIdParams)

    const billboard = await getBillboard(billboardId, storeId)

    return new Response(JSON.stringify(billboard), { status: 200 })
  },
  isProtectedRoute: false,
})

const PUT = apiRequestMiddleware({
  handler: async (req: Request, { params }) => {
    const { storeId, billboardId } = validateSchema(params, billboardIdParams)

    const body = await req.formData()
    const parsedData = JSON.parse((body.get("data") as string) ?? "{}")
    const file = body.get("file") instanceof File ? body.get("file") : null

    const validatedData = validateSchema(
      { ...parsedData, file },
      newBillboardSchema
    )

    let imageId = validatedData.imageId

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

    const billboard = await prisma.billboard.update({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label: validatedData.label,
        imageId,
      },
    })

    return new Response(JSON.stringify(mapToBillboardClientModel(billboard)), {
      status: 200,
    })
  },
})

const DELETE = apiRequestMiddleware({
  handler: async (_, { params }) => {
    const { billboardId } = validateSchema(params, billboardIdParams)

    await prisma.billboard.delete({
      where: { id: billboardId },
    })

    return new Response(JSON.stringify({}), { status: 200 })
  },
})

export { GET, PUT, DELETE }

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
