"use client"

import { useEffect } from "react"
import { useOpenModal } from "@/store/use-modal-store"

import { CreateStoreModal } from "@/components/create-store-modal"
import { Header } from "@/components/header"

export default function Home() {
  const openModal = useOpenModal()

  useEffect(() => {
    openModal(({ closeModal }) => <CreateStoreModal {...{ closeModal }} />)
  }, [])

  return (
    <>
      <Header />
      <main className="flex items-center justify-center">
        <h1 className="text-3xl">Homepage</h1>
      </main>
    </>
  )
}
