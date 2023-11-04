"use client"

import { useEffect } from "react"
import { useOpenModal } from "@/store/use-modal-store"

import { CreateStoreModal } from "@/components/create-store-modal"

export default function Root() {
  const openModal = useOpenModal()

  useEffect(() => {
    openModal(({ closeModal }) => <CreateStoreModal {...{ closeModal }} />)
  }, [openModal])

  return null
}
