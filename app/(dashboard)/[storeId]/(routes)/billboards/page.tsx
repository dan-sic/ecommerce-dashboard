import { FC } from "react"
import Link from "next/link"
import { BillboardsTable } from "@/modules/billboard/components/billboards-table"
import { PlusCircle } from "lucide-react"

import prisma from "@/lib/db"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Props {
  params: { storeId: string }
}

const BillboardsPage: FC<Props> = async ({ params }) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Billboards</h1>
          <span className="text-sm font-medium text-gray-400">
            Manage billboards
          </span>
        </div>
        <Link
          href={`/${params.storeId}/billboards/create`}
          className={buttonVariants()}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator className="mb-5 mt-2" />
      <BillboardsTable billboards={billboards} />
    </>
  )
}

export default BillboardsPage
