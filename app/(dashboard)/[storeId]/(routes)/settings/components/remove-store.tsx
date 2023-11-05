"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { useModalStore } from "@/store/use-modal-store"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"

import { useServerAction } from "@/lib/use-server-action"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { deleteStore } from "../actions/update-store"

interface RemoveStoreProps {
  store: Store
}

export const RemoveStore: FC<RemoveStoreProps> = ({ store }) => {
  const { run, isPending } = useServerAction()
  const { openModal, closeModal } = useModalStore()
  const router = useRouter()

  const handleOnClick = () => {
    openModal(() => (
      <>
        <DialogHeader>
          <DialogTitle>Remove Store</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this store?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              run({
                action: deleteStore.bind(null, store.id),
                onSuccess: () => router.push("/"),
              })
              closeModal()
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </>
    ))
    // run(updateStore.bind(null, store.id, data))
  }

  return (
    <Button variant="destructive" disabled={isPending} onClick={handleOnClick}>
      <Trash className="h-5 w-5" />
      <span className="sr-only">Remove Store</span>
    </Button>
  )
}
