import { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

import prisma from "@/lib/db"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Navbar } from "./navbar"
import { StoreSelect } from "./store-select"

interface Props {
  storeId: string
}

export const Header: FC<Props> = async ({ storeId }) => {
  const stores = await prisma.store.findMany()

  return (
    <header className="flex h-20 items-center space-x-5 bg-gray-200 p-5">
      <StoreSelect stores={stores} />
      <Navbar storeId={storeId} />

      {/* <Button className="ml-auto" onClick={() => signOut()}>
        Sign Out
      </Button> */}
    </header>
  )
}
