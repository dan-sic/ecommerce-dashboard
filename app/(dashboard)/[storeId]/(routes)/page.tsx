import { FC } from "react"
import { getStore } from "@/modules/store/data"

interface Props {
  params: { storeId: string }
}

const StorePage: FC<Props> = async ({ params }) => {
  const store = await getStore({ storeId: params.storeId })

  return (
    <>
      <h1 className="text-3xl">Store name: {store?.name}</h1>
    </>
  )
}

export default StorePage
