import { FC } from "react"

import prisma from "@/lib/db"

import { DarkMode } from "./dark-mode"
import { Navbar } from "./navbar"
import { SignOut } from "./sign-out"
import { StoreSelect } from "./store-select"

interface Props {
  storeId: string
}

export const Header: FC<Props> = async ({ storeId }) => {
  const stores = await prisma.store.findMany()

  return (
    <header className="bottom-1 flex h-20 items-center space-x-5 border bg-card p-5">
      <StoreSelect stores={stores} />
      <Navbar storeId={storeId} />
      <div className="!ml-auto">
        <DarkMode />
        <SignOut />
      </div>
    </header>
  )
}
