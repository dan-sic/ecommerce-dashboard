import { create } from "zustand"

type ModalName = "create-store"

interface Store {
  activeModals: ModalName[]
  openModal: (modalName: ModalName) => void
  closeModal: (modalName: ModalName) => void
}

const useModalStore = create<Store>((set) => ({
  activeModals: [],
  openModal: (modalName) =>
    set((state) => ({ activeModals: [...state.activeModals, modalName] })),
  closeModal: (modalName) =>
    set((state) => ({
      activeModals: state.activeModals.filter((name) => name !== modalName),
    })),
}))

const useIsModalOpen = (modalName: ModalName) => {
  return useModalStore((state) => state.activeModals.includes(modalName))
}

const useCloseModal = (modalName: ModalName) => {
  return useModalStore((state) => state.closeModal.bind(null, modalName))
}

const useOpenModal = (modalName: ModalName) => {
  return useModalStore((state) => state.openModal.bind(null, modalName))
}

export { useModalStore, useIsModalOpen, useOpenModal, useCloseModal }
