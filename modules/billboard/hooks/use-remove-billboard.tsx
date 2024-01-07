import { useToast } from "@/store/use-toast-store"
import { useMutation } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"

export const useRemoveBillboard = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({
      storeId,
      billboardId,
    }: {
      storeId: string
      billboardId: string
    }) => apiClient.delete(`stores/${storeId}/billboards/${billboardId}`),
    onSuccess: () => {
      toast({ title: "Billboard removed" })
    },
    onError: () => {
      toast({ title: "Something went wrong" })
    },
  })
}
