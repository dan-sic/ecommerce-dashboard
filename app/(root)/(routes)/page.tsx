"use client"

import { useEffect } from "react"
import { CreateStoreModal } from "@/modules/store/components/create-store-modal"
import { useOpenModal } from "@/store/use-modal-store"

export default function Root() {
  const openModal = useOpenModal()

  useEffect(() => {
    openModal(({ closeModal }) => <CreateStoreModal {...{ closeModal }} />)
  }, [openModal])

  return null
}
