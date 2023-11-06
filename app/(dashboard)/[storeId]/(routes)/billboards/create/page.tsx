import { FC } from "react"
import { BillboardForm } from "@/modules/billboard/components/billboard-form"

import { Separator } from "@/components/ui/separator"

interface Props {
  params: { storeId: string }
}

const CreateBillboardPage: FC<Props> = async ({ params }) => {
  return (
    <>
      <div>
        <h1 className="text-5xl font-bold">Create Billboard</h1>
        <span className="text-sm font-medium text-gray-400">
          Add a New Billboard
        </span>
      </div>
      <Separator className="mb-5 mt-2" />
      <BillboardForm storeId={params.storeId} />
    </>
  )
}

export default CreateBillboardPage
