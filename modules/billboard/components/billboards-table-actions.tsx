"use client"

import { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useOpenModal } from "@/store/use-modal-store"
import { Billboard } from "@prisma/client"
import { Edit, MoreVertical, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RemoveBillboardModal } from "./remove-billboard-modal"

interface BillboardTableActionsProps {
  billboard: Billboard
}

export const BillboardTableActions: FC<BillboardTableActionsProps> = ({
  billboard,
}) => {
  const openModal = useOpenModal()
  const router = useRouter()

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
        <DropdownMenuItem
          onClick={() =>
            openModal(() => {
              return (
                <RemoveBillboardModal
                  billboardId={billboard.id}
                  storeId={billboard.storeId}
                  onSuccess={() => router.refresh()}
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
