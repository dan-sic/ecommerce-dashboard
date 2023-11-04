import { FC } from "react"
import { redirect } from "next/navigation"

import { getSessionUser } from "@/lib/auth-options"
import prisma from "@/lib/db"

const RootLayout: FC<React.PropsWithChildren> = async ({ children }) => {
  const user = await getSessionUser()

  const store = await prisma.store.findFirst({
    where: {
      userId: user.id,
    },
  })

  if (store) {
    return redirect(`/${store.id}`)
  }

  return <>{children}</>
}

export default RootLayout
