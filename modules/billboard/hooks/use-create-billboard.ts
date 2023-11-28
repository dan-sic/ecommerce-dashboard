import { useRouter } from "next/navigation"
import { useToast } from "@/store/use-toast-store"
import { v4 as uuidv4 } from "uuid"

import {
  addImageToBillboard,
  createBillboard,
  getS3SignedUrl,
} from "../actions"
import { BillboardFormData } from "../consts/billboard-schema"

export const useCreateBillboard = () => {
  const { toast } = useToast()
  const router = useRouter()

  const action = async (storeId: string, data: BillboardFormData) => {
    const { success, error } = await createBillboard(storeId, {
      label: data.label,
    })

    if (error) {
      return toast({
        title: error.message,
        variant: "destructive",
      })
    }

    if (data.file) {
      try {
        const imageId = uuidv4()

        const { url, fields } = await getS3SignedUrl({ fileId: imageId })

        const uploadData: Record<string, any> = {
          ...fields,
          "Content-Type": data.file.type,
        }

        const formData = new FormData()
        for (const name in uploadData) {
          formData.append(name, uploadData[name])
        }

        formData.append("file", data.file)

        await fetch(url, {
          method: "POST",
          body: formData,
        })

        await addImageToBillboard(success.data.id, imageId)
      } catch {
        toast({
          title: "Image could not be uploaded",
          variant: "destructive",
        })
      }
    }

    toast({
      title: success.message,
    })

    router.push(`/${storeId}/billboards`)
  }

  return action
}
