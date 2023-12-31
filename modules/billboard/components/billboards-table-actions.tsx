"use client"

import { FC } from "react"
import Link from "next/link"
import { useOpenModal } from "@/store/use-modal-store"
import { Edit, MoreVertical, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { BillboardClientModel } from "../types"
import { RemoveBillboardModal } from "./remove-billboard-modal"

interface BillboardTableActionsProps {
  billboard: BillboardClientModel
  disabled?: boolean
}

export const BillboardTableActions: FC<BillboardTableActionsProps> = ({
  billboard,
  disabled,
}) => {
  const openModal = useOpenModal()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
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
        <DropdownMenuItem
          onClick={() =>
            openModal(() => {
              return (
                <RemoveBillboardModal
                  billboardId={billboard.id}
                  storeId={billboard.storeId}
                />
              )
            })
          }
        >
          <Trash className="mr-2 h-4 w-4" />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
