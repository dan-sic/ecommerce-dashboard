import { FC } from "react"
import { redirect } from "next/navigation"

import { getSessionUser } from "@/lib/auth-options"
import prisma from "@/lib/db"

interface Props extends React.PropsWithChildren {
  params: { storeId: string }
}
const StoreLayout: FC<Props> = async ({ children, params }) => {
  const user = await getSessionUser()

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  })

  if (!store) {
    return redirect(`/`)
  }

  return <>{children}</>
}

export default StoreLayout
