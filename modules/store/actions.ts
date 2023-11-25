"use server"

import { revalidatePath } from "next/cache"
import { Store } from "@prisma/client"

import { getSessionUser } from "@/lib/auth-options"
import { DatabaseError } from "@/lib/database-error"
import prisma from "@/lib/db"
import { validateSchema } from "@/lib/validate-schema"

import { storeSchema } from "./consts/store-schema"

export const createStore: ServerAction = async (data: Pick<Store, "name">) => {
  try {
    const validatedData = validateSchema(data, storeSchema)

    const user = await getSessionUser()

    const store = await prisma.store.create({
      data: {
        name: validatedData.name,
        userId: user!.id,
      },
    })

    revalidatePath("(dashboard)/[storeId]", "layout")

    return {
      success: {
        message: "Store has been added.",
        data: store,
      },
    }
  } catch (e: unknown) {
    if (DatabaseError.isUniqueConstraintViolation(e)) {
      return {
        error: {
          message: "Store could not be added. Store name must be unique.",
        },
      }
    } else {
      return { error: { message: "Something went wrong." } }
    }
  }
}

export const updateStore: ServerAction = async (
  storeId: string,
  data: Pick<Store, "name">
) => {
  try {
    const validatedData = validateSchema(data, storeSchema)

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
