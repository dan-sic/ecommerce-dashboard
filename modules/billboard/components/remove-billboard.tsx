"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { useModalStore } from "@/store/use-modal-store"
import { Billboard } from "@prisma/client"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

import { RemoveBillboardModal } from "./remove-billboard-modal"

interface RemoveBillboardProps {
  billboard: Billboard
}

export const RemoveBillboard: FC<RemoveBillboardProps> = ({ billboard }) => {
  const { openModal } = useModalStore()
  const router = useRouter()

  const handleOnClick = () => {
    openModal(() => {
      return (
        <RemoveBillboardModal
          billboardId={billboard.id}
          storeId={billboard.storeId}
          onSuccess={() => {
            router.refresh()
            router.replace(`/${billboard.storeId}/billboards`)
          }}
        />
      )
    })
  }

  return (
    <Button variant="destructive" onClick={handleOnClick}>
      <Trash className="h-5 w-5" />
      <span className="sr-only">Remove Billboard</span>
    </Button>
  )
}
