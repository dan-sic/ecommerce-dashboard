"use client"

import { FC, useMemo } from "react"
import { Billboard } from "@prisma/client"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"

import { formatDate } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { BillboardTableActions } from "./billboards-table-actions"

interface BillboardsTableProps {
  billboards: Billboard[]
}

const columnHelper = createColumnHelper<Billboard>()

const columns = [
  columnHelper.accessor("label", {
    header: () => "Label",
    cell: (data) => <span>{data.getValue()}</span>,
    size: 200,
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date Added",
    cell: (data) => <span>{formatDate(data.getValue())}</span>,
    size: 200,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <BillboardTableActions billboard={props.row.original} />,
    size: 50,
  }),
]

export const BillboardsTable: FC<BillboardsTableProps> = ({ billboards }) => {
  const table = useReactTable({
    data: billboards,
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
                <TableCell key={cell.id}>
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
