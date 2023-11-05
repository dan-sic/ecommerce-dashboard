import { FC } from "react"

import prisma from "@/lib/db"

interface Props {
  params: { storeId: string }
}

const StorePage: FC<Props> = async ({ params }) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return (
    <>
      <h1 className="text-3xl">Store name: {store?.name}</h1>
    </>
  )
}

export default StorePage
