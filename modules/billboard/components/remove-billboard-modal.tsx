"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { useModalStore } from "@/store/use-modal-store"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useRemoveBillboard } from "../hooks/use-remove-billboard"

interface DeleteBillboardModalProps {
  storeId: string
  billboardId: string
  onSuccess?: () => void
}

export const RemoveBillboardModal: FC<DeleteBillboardModalProps> = ({
  storeId,
  billboardId,
  onSuccess,
}) => {
  const { closeModal } = useModalStore()
  const { mutate, isLoading } = useRemoveBillboard()
  const router = useRouter()

  return (
    <>
      <DialogHeader>
        <DialogTitle>Remove Billboard</DialogTitle>
        <DialogDescription>
          Are you sure you want to remove this billboard?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="ghost" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          isLoading={isLoading}
          onClick={() =>
            mutate(
              { storeId, billboardId },
              {
                onSuccess: () => {
                  closeModal()
                  router.refresh()
                  onSuccess?.()
                },
              }
            )
          }
        >
          Confirm
        </Button>
      </DialogFooter>
    </>
  )
}
