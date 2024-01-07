import { useRouter } from "next/navigation"
import { useModalStore } from "@/store/use-modal-store"
import { useToast } from "@/store/use-toast-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"
import { queryKeys } from "@/lib/consts/query-keys"

import { BillboardFormData } from "../types"

export const useCreateBillboard = () => {
  const { toast } = useToast()
  const router = useRouter()
  const { closeModal } = useModalStore()
  const client = useQueryClient()

  return useMutation({
    mutationFn: ({
      data,
      storeId,
    }: {
      data: BillboardFormData
      storeId: string
    }) => {
      const formData = new FormData()
      formData.append("data", JSON.stringify({ label: data.label }))
      formData.append("file", data.file as Blob)

      return apiClient.post(`stores/${storeId}/billboards`, formData)
    },
    onSuccess: (data, { storeId }) => {
      toast({ title: "Store created!" })
      closeModal()
      client.invalidateQueries(queryKeys.billboards)
      router.push(`/${storeId}/billboards`)
    },
    onError: (error) => {
      toast({ title: "Something went wrong" })
    },
  })
}
