"use client"

import { FC, useState, useTransition } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"

import { getS3FileUrl } from "@/lib/get-s3-file-url"
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

import { BillboardFormData, billboardSchema } from "../consts/billboard-schema"
import { useCreateBillboard } from "../hooks/use-create-billboard"
import { useUpdateBillboard } from "../hooks/use-update-billboard"

interface BillboardFormProps {
  storeId: string
  billboard?: Billboard
}

export const BillboardForm: FC<BillboardFormProps> = ({
  billboard,
  storeId,
}) => {
  const [isPending, startTransition] = useTransition()
  const createBillboard = useCreateBillboard()
  const updateBillboard = useUpdateBillboard()

  const form = useForm<BillboardFormData>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: billboard?.label ?? "",
      file: null,
      imagePreviewUrl: billboard?.imageId
        ? getS3FileUrl(billboard.imageId)
        : "",
    },
  })
  const imagePreviewUrl = form.watch("imagePreviewUrl")

  const onSubmit = async (data: BillboardFormData) => {
    if (billboard) {
      startTransition(() => {
        updateBillboard(billboard, data)
      })
    } else {
      startTransition(() => {
        createBillboard(storeId, data)
      })
    }
  }

  const setImagePreview = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      form.setValue("imagePreviewUrl", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    form.setValue("imagePreviewUrl", "", { shouldDirty: true })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2 md:w-1/2"
      >
        {!!imagePreviewUrl && (
          <div
            className="relative mb-10"
            style={{ width: "500px", height: "300px" }}
          >
            <img
              src={imagePreviewUrl}
              alt="Image preview"
              className="h-full w-full object-contain"
            />
            <Button
              className="absolute right-0 top-0"
              onClick={clearImage}
              variant="destructive"
            >
              <label>
                <X className="h-4 w-4" />
              </label>
            </Button>
          </div>
        )}
        {!imagePreviewUrl && (
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
                    accept=".jpeg,.png,.webp"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
        <Button
          disabled={!form.formState.isDirty}
          isLoading={isPending}
          type="submit"
        >
          {billboard ? "Save Changes" : "Create"}
        </Button>
      </form>
    </Form>
  )
}
