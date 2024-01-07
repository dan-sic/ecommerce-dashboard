import { FC, Suspense } from "react"
import Link from "next/link"
import { BillboardsTable } from "@/modules/billboard/components/billboards-table"
import { PlusCircle } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { ApiList } from "@/components/api-list"
import { PageSection } from "@/components/page-section"
import { TableSkeleton } from "@/components/table-skeleton"

interface Props {
  params: { storeId: string }
}

const BillboardsPage: FC<Props> = async ({ params }) => {
  return (
    <>
      <PageSection
        heading={<PageSection.Heading1>Billboards</PageSection.Heading1>}
        description={
          <PageSection.Description>Manage billboards</PageSection.Description>
        }
        contentSide={
          <Link
            href={`/${params.storeId}/billboards/create`}
            className={buttonVariants()}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New
          </Link>
        }
      />
      <Suspense fallback={<TableSkeleton />}>
        <BillboardsTable storeId={params.storeId} />
      </Suspense>
      <PageSection
        className="mt-10"
        heading={<PageSection.Heading2>API</PageSection.Heading2>}
        description={
          <PageSection.Description>
            API Calls for Billboards
          </PageSection.Description>
        }
      />
      <ApiList
        entitityName={{
          singular: "billboard",
          plural: "billboards",
        }}
        storeId={params.storeId}
      />
    </>
  )
}

export default BillboardsPage
