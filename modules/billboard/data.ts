import { cache } from "react"

import prisma from "@/lib/db"

export const getBillboards = cache(
  async (storeId: string) =>
    await prisma.billboard.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
)
