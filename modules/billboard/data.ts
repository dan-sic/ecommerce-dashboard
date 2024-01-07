import { cache } from "react"
import { z } from "zod"

import prisma from "@/lib/db"

import { billboardClientModelSchema } from "./consts/billboard-schema"

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
  billboardClientModelSchema.parse(billboard)
