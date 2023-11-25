import { cache } from "react"

import prisma from "@/lib/db"

export const getStore = cache(
  async ({ storeId, userId }: { storeId?: string; userId?: string }) =>
    await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    })
)
