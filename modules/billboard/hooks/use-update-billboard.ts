import { useRouter } from "next/navigation"
import { useModalStore } from "@/store/use-modal-store"
import { useToast } from "@/store/use-toast-store"
import { useMutation } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"

import { BillboardFormData } from "../types"

export const useUpdateBillboard = () => {
  const { toast } = useToast()
  const router = useRouter()
  const { closeModal } = useModalStore()

  return useMutation({
    mutationFn: ({
      data,
      storeId,
      billboardId,
    }: {
      data: BillboardFormData
      storeId: string
      billboardId: string
    }) => {
      const formData = new FormData()
      formData.append(
        "data",
        JSON.stringify({ label: data.label, imageId: data.imageId })
      )
      formData.append("file", data.file as Blob)

      return apiClient.put(
        `stores/${storeId}/billboards/${billboardId}`,
        formData
      )
    },
    onSuccess: (data, { storeId }) => {
      toast({ title: "Store updated!" })
      closeModal()
      router.refresh()
      router.push(`/${storeId}/billboards`)
    },
    onError: (error) => {
      toast({ title: "Something went wrong" })
    },
  })
}
