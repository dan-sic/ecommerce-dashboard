import { useRouter } from "next/navigation"
import { useModalStore } from "@/store/use-modal-store"
import { useToast } from "@/store/use-toast-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"
import { queryKeys } from "@/lib/consts/query-keys"
import { getRandomId } from "@/lib/utils"

import { BillboardClientModel, BillboardFormData } from "../types"

export const useCreateBillboard = () => {
  const { toast } = useToast()
  const router = useRouter()
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
    onMutate: async ({ data, storeId }) => {
      toast({ title: "Store created" })

      router.push(`/${storeId}/billboards`)

      await client.cancelQueries({ queryKey: queryKeys.billboards })

      const previousSnapshot = client.getQueryData<BillboardClientModel[]>(
        queryKeys.billboards
      )

      client.setQueryData<BillboardClientModel[]>(
        queryKeys.billboards,
        (old) => [
          {
            id: getRandomId(),
            label: data.label,
            createdAt: new Date().toISOString(),
            imageId: null,
            storeId,
            temp: true,
          },
          ...(old ?? []),
        ]
      )

      return { previousSnapshot }
    },
    onError: (error, data, context) => {
      console.log(error)
      toast({ title: "Something went wrong" })
      client.setQueryData(queryKeys.billboards, context?.previousSnapshot)
    },
    onSettled: () => {
      client.invalidateQueries(queryKeys.billboards)
    },
  })
}
