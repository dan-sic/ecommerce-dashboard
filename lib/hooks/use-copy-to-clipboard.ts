import { useCallback } from "react"
import { useToast } from "@/store/use-toast-store"

export const useCopyToClipboard = () => {
  const { toast } = useToast()

  return useCallback(
    (content: string) => {
      navigator.clipboard.writeText(content)
      toast({ title: "Copied to clipboard." })
    },
    [toast]
  )
}
