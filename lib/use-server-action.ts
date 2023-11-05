import { useTransition } from "react"
import { useToast } from "@/store/use-toast-store"

export const useServerAction = () => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const run = ({
    action,
    onError,
    onSuccess,
  }: {
    action: ServerAction
    onSuccess?: (data: any) => void
    onError?: () => void
  }) => {
    startTransition(async () => {
      const { success, error } = await action()

      if (success) {
        toast({
          title: success.message,
        })

        onSuccess?.(success.data)
      }

      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        })

        onError?.()
      }
    })
  }

  return {
    run,
    isPending,
  }
}
