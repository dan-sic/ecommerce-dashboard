import { FC } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

import prisma from "@/lib/db"
import { Button } from "@/components/ui/button"

import { StoreSelect } from "./store-select"

interface Props {
  storeId: string
}

export const Header: FC<Props> = async ({ storeId }) => {
  const stores = await prisma.store.findMany()

  return (
    <header className="flex h-20 items-center space-x-5 bg-gray-200 p-5">
      <StoreSelect stores={stores} />
      <nav className="flex items-center space-y-5">
        <Link href={`/${storeId}/settings`}>Settings</Link>
      </nav>
      {/* <Button className="ml-auto" onClick={() => signOut()}>
        Sign Out
      </Button> */}
    </header>
  )
}
