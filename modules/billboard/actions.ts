"use server"

import { revalidatePath } from "next/cache"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { Billboard } from "@prisma/client"

import { UPLOAD_MAX_FILE_SIZE } from "@/lib/consts"
import prisma from "@/lib/db"
import { s3Client } from "@/lib/s3-client"
import { validateSchema } from "@/lib/validate-schema"

import { billboardSchema } from "./consts/billboard-schema"

export const createBillboard = async (
  storeId: string,
  data: Pick<Billboard, "label">
) => {
  try {
    const validatedData = validateSchema(
      data,
      billboardSchema.pick({ label: true })
    )

    const billboard = await prisma.billboard.create({
      data: {
        label: validatedData.label,
        storeId: storeId,
      },
    })

    revalidatePath("(dashboard)/[storeId]/billboards", "page")

    return {
      success: {
        message: "Billboard has been added.",
        data: billboard,
      },
    }
  } catch (e: unknown) {
    return { error: { message: "Something went wrong." } }
  }
}

export const addImageToBillboard = async (
  billboardId: string,
  imageId: string
) => {
  await prisma.billboard.update({
    where: {
      id: billboardId,
    },
    data: {
      imageId,
    },
  })

  return {
    success: {
      message: "Image has been added to billboard.",
    },
  }
}

export const updateBillboard: ServerAction = async (
  billboardId: string,
  data: Pick<Billboard, "label"> & { imageId: string | null }
) => {
  try {
    const validatedData = validateSchema(
      data,
      billboardSchema.pick({ label: true })
    )

    await prisma.billboard.update({
      where: { id: billboardId },
      data: {
        label: validatedData.label,
        imageId: data.imageId,
      },
    })

    revalidatePath("(dashboard)/[storeId]/billboards", "page")
    revalidatePath("(dashboard)/[storeId]/billboards/[billboardId]", "page")

    return {
      success: {
        message: "Billboard data has been updated.",
      },
    }
  } catch (e: unknown) {
    return { error: { message: "Something went wrong." } }
  }
}

export const removeBillboardImage = async (billboardId: string) => {
  await prisma.billboard.update({
    where: {
      id: billboardId,
    },
    data: {
      imageId: null,
    },
  })

  return {
    success: {
      message: "Billboard image has been removed.",
    },
  }
}

export const removeBillboard: ServerAction = async (billboardId: string) => {
  try {
    await prisma.billboard.delete({
      where: { id: billboardId },
    })

    revalidatePath("(dashboard)/[storeId]/billboards", "page")

    return {
      success: {
        message: "Billboard has been removed.",
      },
    }
  } catch (e: unknown) {
    return { error: { message: "Something went wrong." } }
  }
}

export const getS3SignedUrl = async ({ fileId }: { fileId: string }) => {
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
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
