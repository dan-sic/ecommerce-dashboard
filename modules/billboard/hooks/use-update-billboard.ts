import { useRouter } from "next/navigation"
import { useToast } from "@/store/use-toast-store"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { Billboard } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

import { s3Client } from "@/lib/s3-client"

import { addImageToBillboard, updateBillboard } from "../actions"
import { BillboardFormData } from "../consts/billboard-schema"

const UPLOAD_MAX_FILE_SIZE = 1000000

export const useUpdateBillboard = () => {
  const { toast } = useToast()
  const router = useRouter()

  const action = async (billboard: Billboard, data: BillboardFormData) => {
    const { success, error } = await updateBillboard(billboard.id, {
      label: data.label,
      ...(!data.file && !data.imagePreviewUrl && { imageId: null }),
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

        const { url, fields } = await createPresignedPost(s3Client, {
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
          Key: imageId,
          Fields: {
            key: imageId,
          },
          Conditions: [
            ["starts-with", "$Content-Type", "image/"],
            ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
          ],
        })

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

        await addImageToBillboard(billboard.id, imageId)
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

    router.refresh()
    router.push(`/${billboard.storeId}/billboards`)
  }

  return action
}
