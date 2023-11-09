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
  console.log("addImageToBillboard", billboardId, imageId)
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
      message: "Billboard has been added.",
    },
  }
}

export const updateBillboard: ServerAction = async (
  billboardId: string,
  data: Pick<Billboard, "label">
) => {
  try {
    await prisma.billboard.update({
      where: { id: billboardId },
      data,
    })

    revalidatePath("(dashboard)/[storeId]/billboards", "page")

    return {
      success: {
        message: "Billboard data has been updated.",
      },
    }
  } catch (e: unknown) {
    return { error: { message: "Something went wrong." } }
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
