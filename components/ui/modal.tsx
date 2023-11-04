"use client"

import { useModalStore } from "@/store/use-modal-store"

import { Dialog, DialogContent } from "@/components/ui/dialog"

export const Modal = () => {
  const { modal, closeModal } = useModalStore()
  return (
    <Dialog open={!!modal} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[425px]">{modal}</DialogContent>
    </Dialog>
  )
}
