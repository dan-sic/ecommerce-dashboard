import { FC } from "react"
import { notFound, redirect } from "next/navigation"
import { getStore } from "@/modules/store/data"

import { getSessionUser } from "@/lib/auth-options"
import { Header } from "@/components/header/header"

interface Props extends React.PropsWithChildren {
  params: { storeId: string }
}
const StoreLayout: FC<Props> = async ({ children, params }) => {
  const user = await getSessionUser()

  const store = await getStore({ storeId: params.storeId, userId: user.id })

  if (!store) {
    notFound()
  }

  return (
    <>
      <Header storeId={params.storeId} />
      <main className="p-10">{children}</main>
    </>
  )
}

export default StoreLayout
