import { FC } from "react"
import { RemoveStore } from "@/modules/store/components/remove-store"
import { StoreSettingsForm } from "@/modules/store/components/store-settings-form"

import prisma from "@/lib/db"
import { getEnvVariable } from "@/lib/get-env-variable"
import { Separator } from "@/components/ui/separator"
import { ApiAlert } from "@/components/api-alert"
import { ClientOnly } from "@/components/client-only"

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
      <Separator className="mb-5 mt-2" />
      <ClientOnly>
        <ApiAlert
          title="API_URL"
          description={`${getEnvVariable("NEXT_PUBLIC_APP_URL")}/api/${
            params.storeId
          }`}
          variant="public"
        />
      </ClientOnly>
    </>
  )
}

export default StorePage