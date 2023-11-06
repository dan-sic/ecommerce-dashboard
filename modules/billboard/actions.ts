"use server"

import { revalidatePath } from "next/cache"
import { Billboard } from "@prisma/client"

import prisma from "@/lib/db"

export const createBillboard: ServerAction = async (
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
