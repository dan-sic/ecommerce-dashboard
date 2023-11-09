"use client"

import { FC, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/store/use-toast-store"
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

import { getS3FileUrl } from "@/lib/get-s3-file-url"
import { useServerAction } from "@/lib/use-server-action"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { addImageToBillboard, updateBillboard } from "../actions"
import { BillboardFormData, billboardSchema } from "../consts/billboard-schema"
import { useCreateBillboard } from "../hooks/use-create-billboard"

interface BillboardFormProps {
  storeId: string
  billboard?: Billboard
}

export const BillboardForm: FC<BillboardFormProps> = ({
  billboard,
  storeId,
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    billboard?.imageId ? getS3FileUrl(billboard.imageId) : ""
  )
  const [isPending, startTransition] = useTransition()
  const createBillboard = useCreateBillboard()

  const form = useForm<BillboardFormData>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: billboard?.label ?? "",
      file: null,
    },
  })

  const onSubmit = async (data: BillboardFormData) => {
    if (billboard) {
      // run({
      //   action: updateBillboard.bind(null, billboard.id, data),
      // })
    } else {
      startTransition(() => {
        createBillboard(storeId, data)
      })
    }
  }
  const setImagePreview = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        {!!imagePreviewUrl && (
          <div className="relative" style={{ width: "500px", height: "300px" }}>
            <Image
              src={imagePreviewUrl}
              fill={true}
              objectFit="contain"
              alt="Image preview"
            />
          </div>
        )}
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    onChange(e.target.files![0])
                    setImagePreview(e.target.files![0])
                  }}
                  accept=".jpeg,.png"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isPending} type="submit">
          {billboard ? "Save Changes" : "Create"}
        </Button>
      </form>
    </Form>
  )
}
