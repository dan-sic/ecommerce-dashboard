import { useModalStore } from "@/store/use-modal-store"
import { Billboard } from "@prisma/client"

import { useServerAction } from "@/lib/use-server-action"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { removeBillboard } from "../actions"

export const useRemoveBillboard = () => {
  const { isPending, run } = useServerAction()
  const { openModal, closeModal } = useModalStore()

  const action = (billboard: Billboard) => {
    openModal(() => (
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
            isLoading={isPending}
            onClick={() => {
              run({
                action: removeBillboard.bind(null, billboard.id),
                onSuccess: () => closeModal(),
              })
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </>
    ))
  }

  return action
}
