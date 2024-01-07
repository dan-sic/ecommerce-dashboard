"use client"

import { FC, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"

import { apiClient } from "@/lib/api-client"
import { queryKeys } from "@/lib/consts/query-keys"
import { cn, formatDate } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { BillboardClientModel } from "../types"
import { BillboardTableActions } from "./billboards-table-actions"

interface BillboardsTableProps {
  storeId: string
}

const columnHelper = createColumnHelper<BillboardClientModel>()

const columns = [
  columnHelper.accessor("label", {
    header: () => "Label",
    cell: (data) => <span>{data.getValue()}</span>,
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date Added",
    cell: (data) => <span>{formatDate(new Date(data.getValue()))}</span>,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <BillboardTableActions billboard={props.row.original} />,
    meta: {
      tdClassName: "text-right",
    },
  }),
]

export const BillboardsTable: FC<BillboardsTableProps> = ({ storeId }) => {
  const { data } = useQuery({
    queryKey: queryKeys.billboards,
    queryFn: () =>
      apiClient.get<BillboardClientModel[]>(`/stores/${storeId}/billboards`),
  })

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(header.column.columnDef.meta?.thClassName)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              className="border-none text-gray-400 hover:bg-gray-100/25"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(cell.column.columnDef.meta?.tdClassName)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
