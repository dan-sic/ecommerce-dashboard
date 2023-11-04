import { create } from "zustand"

interface Store {
  modal: React.ReactElement | null
  openModal: (
    cb: (props: { closeModal: () => void }) => React.ReactElement
  ) => void
  closeModal: () => void
}

const useModalStore = create<Store>((set) => ({
  modal: null,
  openModal: (cb) =>
    set((state) => ({ modal: cb({ closeModal: state.closeModal }) })),
  closeModal: () =>
    set(() => ({
      modal: null,
    })),
}))

// const useCloseModal = (modalName: ModalName) => {
//   return useModalStore((state) => state.closeModal.bind(null, modalName))
// }

const useOpenModal = () => {
  return useModalStore((state) => state.openModal)
}

export { useModalStore, useOpenModal }
