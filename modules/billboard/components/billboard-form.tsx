"use client"

import { FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"

import { ALLOWED_IMAGE_TYPES } from "@/lib/consts"
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

import { newBillboardSchema } from "../consts/billboard-schema"
import { useCreateBillboard } from "../hooks/use-create-billboard"
import { useUpdateBillboard } from "../hooks/use-update-billboard"
import { BillboardClientModel, BillboardFormData } from "../types"

interface BillboardFormProps {
  storeId: string
  billboard?: BillboardClientModel
}

export const BillboardForm: FC<BillboardFormProps> = ({
  billboard,
  storeId,
}) => {
  const { mutate: createBillboard, isLoading: isBillboardCreatePending } =
    useCreateBillboard()
  const { mutate: updateBillboard, isLoading: isBillboardUpdatePending } =
    useUpdateBillboard()
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    billboard?.imageId ? getS3FileUrl(billboard.imageId) : ""
  )

  const form = useForm<BillboardFormData>({
    resolver: zodResolver(newBillboardSchema),
    defaultValues: {
      label: billboard?.label ?? "",
      file: null,
      imageId: billboard?.imageId ?? null,
    },
    mode: "onChange",
  })

  const onSubmit = async (data: BillboardFormData) => {
    if (billboard) {
      updateBillboard({ billboardId: billboard.id, storeId, data })
    } else {
      createBillboard({ storeId, data })
    }
  }

  const clearImage = () => {
    setImagePreviewUrl("")
    form.setValue("file", null, { shouldDirty: true })
    form.setValue("imageId", null, { shouldDirty: true })
  }

  console.log(form.getValues())

  const updateImagePreview = async (file: File) => {
    // waiting for validation to complete before setting preview
    setTimeout(() => {
      if (!form.getFieldState("file").invalid) setImagePreview(file)
    }, 0)
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
                      const file = e.target.files![0]
                      onChange(file)
                      updateImagePreview(file)
                    }}
                    accept={ALLOWED_IMAGE_TYPES.map(
                      (t) => "." + t.split("/")[1]
                    ).join(",")}
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
          isLoading={isBillboardCreatePending || isBillboardUpdatePending}
          type="submit"
        >
          {billboard ? "Save Changes" : "Create"}
        </Button>
      </form>
    </Form>
  )
}
