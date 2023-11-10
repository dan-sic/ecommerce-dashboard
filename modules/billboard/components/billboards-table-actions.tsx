"use client"

import { FC } from "react"
import Link from "next/link"
import { Billboard } from "@prisma/client"
import { Edit, MoreVertical, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRemoveBillboard } from "../hooks/use-remove-billboard"

interface BillboardTableActionsProps {
  billboard: Billboard
}

export const BillboardTableActions: FC<BillboardTableActionsProps> = ({
  billboard,
}) => {
  const removeBillboard = useRemoveBillboard()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <Link href={`/${billboard.storeId}/billboards/${billboard.id}`}>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => removeBillboard(billboard)}>
          <Trash className="mr-2 h-4 w-4" />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
