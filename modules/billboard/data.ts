import { cache } from "react"
import { z } from "zod"

import prisma from "@/lib/db"

import { billboardSchema } from "./consts/billboard-schema"

export const getBillboards = cache(async (storeId: string) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return billboards.map(mapToBillboardClientModel)
})

export const getBillboard = cache(
  async (billboardId: string, storeId: string) => {
    const billboard = await prisma.billboard.findFirst({
      where: {
        id: billboardId,
        storeId,
      },
    })

    return mapToBillboardClientModel(billboard)
  }
)

export const mapToBillboardClientModel = (billboard: unknown) =>
  billboardSchema.parse(billboard)
