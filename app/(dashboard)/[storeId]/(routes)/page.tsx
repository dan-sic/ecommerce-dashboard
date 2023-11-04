import { FC } from "react"

import prisma from "@/lib/db"
import { Header } from "@/components/header"

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
      <Header />
      <main className="flex items-center justify-center">
        <h1 className="text-3xl">Store name: {store?.name}</h1>
      </main>
    </>
  )
}

export default StorePage
