import { FC } from "react"
import { notFound } from "next/navigation"
import { BillboardForm } from "@/modules/billboard/components/billboard-form"
import { billboardIdParams } from "@/modules/billboard/consts/billboard-schema"
import { getBillboard } from "@/modules/billboard/data"

import prisma from "@/lib/db"
import { validateSchema } from "@/lib/validate-schema"
import { Separator } from "@/components/ui/separator"

interface Props {
  params: { storeId: string; billboardId: string }
}

const EditBillboardPage: FC<Props> = async ({ params }) => {
  const { storeId, billboardId } = validateSchema(params, billboardIdParams)
  const billboard = await getBillboard(billboardId, storeId)

  if (!billboard) {
    notFound()
  }

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold">Edit Billboard</h1>
        <span className="text-sm font-medium text-gray-400">
          Manage Billboard Details
        </span>
      </div>
      <Separator className="mb-5 mt-2" />
      <BillboardForm storeId={params.storeId} billboard={billboard} />
    </>
  )
}

export default EditBillboardPage
