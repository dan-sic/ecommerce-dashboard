"use server"

import { revalidatePath } from "next/cache"
import { Billboard } from "@prisma/client"

import prisma from "@/lib/db"

export const createBillboard = async (
  storeId: string,
  data: Pick<Billboard, "label">
) => {
  try {
    const billboard = await prisma.billboard.create({
      data: {
        label: data.label,
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
    await prisma.billboard.update({
      where: { id: billboardId },
      data,
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

export const deleteBillboard: ServerAction = async (billboardId: string) => {
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
