import { FC } from "react"
import { Trash } from "lucide-react"

import prisma from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header/header"

import { RemoveStore } from "./components/remove-store"
import { StoreSettingsForm } from "./components/store-settings-form"

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Settings</h1>
          <span className="text-sm font-medium text-gray-400">
            Manage store preferences
          </span>
        </div>
        <RemoveStore store={store!} />
      </div>
      <Separator className="mb-5 mt-2" />
      <StoreSettingsForm store={store!} />
    </>
  )
}

export default StorePage
