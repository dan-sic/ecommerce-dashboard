import { signOut } from "next-auth/react"

import prisma from "@/lib/db"
import { Button } from "@/components/ui/button"

import { StoreSelect } from "./store-select"

export const Header = async () => {
  const stores = await prisma.store.findMany()

  return (
    <header className="flex h-20 items-center bg-gray-200 p-5">
      <StoreSelect stores={stores} />
      {/* <Button className="ml-auto" onClick={() => signOut()}>
        Sign Out
      </Button> */}
    </header>
  )
}
