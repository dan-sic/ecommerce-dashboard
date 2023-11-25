import { FC } from "react"
import { redirect } from "next/navigation"
import { getStore } from "@/modules/store/data"

import { getSessionUser } from "@/lib/auth-options"

const RootLayout: FC<React.PropsWithChildren> = async ({ children }) => {
  const user = await getSessionUser()

  const store = await getStore({ userId: user.id })

  if (store) {
    return redirect(`/${store.id}`)
  }

  return <>{children}</>
}

export default RootLayout
