import { useToast } from "@/store/use-toast-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"
import { queryKeys } from "@/lib/consts/query-keys"

import { BillboardClientModel } from "../types"

export const useRemoveBillboard = () => {
  const { toast } = useToast()
  const client = useQueryClient()

  return useMutation({
    mutationFn: ({
      storeId,
      billboardId,
    }: {
      storeId: string
      billboardId: string
    }) => apiClient.delete(`stores/${storeId}/billboards/${billboardId}`),
    onMutate: async ({ billboardId, storeId }) => {
      toast({ title: "Store removed" })

      const previousSnapshot = client.getQueryData<BillboardClientModel[]>(
        queryKeys.billboards
      )

      client.setQueryData<BillboardClientModel[]>(
        queryKeys.billboards,
        (old) => [...(old?.filter((b) => b.id !== billboardId) ?? [])]
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
