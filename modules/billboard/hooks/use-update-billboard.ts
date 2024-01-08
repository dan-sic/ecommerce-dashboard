import { useRouter } from "next/navigation"
import { useToast } from "@/store/use-toast-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"
import { queryKeys } from "@/lib/consts/query-keys"

import { BillboardClientModel, BillboardFormData } from "../types"

export const useUpdateBillboard = () => {
  const { toast } = useToast()
  const router = useRouter()
  const client = useQueryClient()

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
    onMutate: async ({ data, storeId, billboardId }) => {
      toast({ title: "Store updated!" })

      router.push(`/${storeId}/billboards`)

      await client.cancelQueries({ queryKey: queryKeys.billboards })

      const previousSnapshot = client.getQueryData<BillboardClientModel[]>(
        queryKeys.billboards
      )

      client.setQueryData<BillboardClientModel[]>(
        queryKeys.billboards,
        (old) =>
          old?.map((billboard) =>
            billboard.id === billboardId
              ? { ...billboard, ...data, temp: true }
              : billboard
          ) ?? []
      )

      return { previousSnapshot }
    },
    onError: (error, data, context) => {
      toast({ title: "Something went wrong" })
      client.setQueryData(queryKeys.billboards, context?.previousSnapshot)
    },
    onSettled: () => {
      client.invalidateQueries(queryKeys.billboards)
    },
  })
}
