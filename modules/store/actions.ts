"use server"

import { revalidatePath } from "next/cache"
import { Store } from "@prisma/client"

import { DatabaseError } from "@/lib/database-error"
import prisma from "@/lib/db"

export const updateStore: ServerAction = async (
  storeId: string,
  data: Pick<Store, "name">
) => {
  try {
    await prisma.store.update({
      where: { id: storeId },
      data,
    })

    revalidatePath("(dashboard)/[storeId]", "layout")

    return {
      success: {
        message: "Store data has been updated.",
      },
    }
  } catch (e: unknown) {
    if (DatabaseError.isUniqueConstraintViolation(e)) {
      return {
        error: {
          message:
            "Store data could not be updated. Store name must be unique.",
        },
      }
    } else {
      return { error: { message: "Something went wrong." } }
    }
  }
}

export const deleteStore: ServerAction = async (storeId: string) => {
  try {
    await prisma.store.delete({
      where: { id: storeId },
    })

    revalidatePath("(dashboard)/[storeId]", "layout")

    return {
      success: {
        message: "Store has been removed.",
      },
    }
  } catch (e: unknown) {
    return { error: { message: "Something went wrong." } }
  }
}
