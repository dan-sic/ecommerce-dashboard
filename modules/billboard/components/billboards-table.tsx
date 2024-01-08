"use client"

import { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Loader2 } from "lucide-react"

import { apiClient } from "@/lib/api-client"
import { queryKeys } from "@/lib/consts/query-keys"
import { formatDate } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/data-table"

import { BillboardClientModel } from "../types"
import { BillboardTableActions } from "./billboards-table-actions"

interface BillboardsTableProps {
  storeId: string
}

const columnHelper = createColumnHelper<BillboardClientModel>()

const columns = [
  columnHelper.accessor("label", {
    header: () => "Label",
    cell: (data) => (
      <div className="flex space-x-2">
        <span>{data.getValue()}</span>
        {data.row.original.temp && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date Added",
    cell: (data) => <span>{formatDate(new Date(data.getValue()))}</span>,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => (
      <BillboardTableActions
        billboard={props.row.original}
        disabled={props.row.original.temp}
      />
    ),
    meta: {
      tdClassName: "text-right",
    },
  }),
]

export const BillboardsTable: FC<BillboardsTableProps> = ({ storeId }) => {
  const { data } = useQuery({
    queryKey: queryKeys.billboards,
    queryFn: () =>
      apiClient
        .get<BillboardClientModel[]>(`/stores/${storeId}/billboards`)
        .then((res) => res.data),
  })

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Label..."
          value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("label")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} />
    </div>
  )
}
