import { FC } from "react"
import { BillboardForm } from "@/modules/billboard/components/billboard-form"

import prisma from "@/lib/db"
import { Separator } from "@/components/ui/separator"

interface Props {
  params: { storeId: string; billboardId: string }
}

const EditBillboardPage: FC<Props> = async ({ params }) => {
  const billboard = await prisma.billboard.findFirst({
    where: {
      id: params.billboardId,
    },
  })

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold">Edit Billboard</h1>
        <span className="text-sm font-medium text-gray-400">
          Manage Billboard Details
        </span>
      </div>
      <Separator className="mb-5 mt-2" />
      <BillboardForm storeId={params.storeId} billboard={billboard!} />
    </>
  )
}

export default EditBillboardPage
