import { useToast } from "@/store/use-toast-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"
import { queryKeys } from "@/lib/consts/query-keys"

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
    onSuccess: () => {
      client.invalidateQueries(queryKeys.billboards)
      toast({ title: "Billboard removed" })
    },
    onError: () => {
      toast({ title: "Something went wrong" })
    },
  })
}
