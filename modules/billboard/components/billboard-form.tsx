"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import { createBillboard, updateBillboard } from "../actions"

interface BillboardFormProps {
  storeId: string
  billboard?: Billboard
}

export const billboardSchema = z.object({
  label: z.string().min(3).max(255),
})
type FormData = z.infer<typeof billboardSchema>

export const BillboardForm: FC<BillboardFormProps> = ({
  billboard,
  storeId,
}) => {
  const { run, isPending } = useServerAction()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: billboard?.label ?? "",
    },
  })

  const onSubmit = (data: FormData) => {
    if (billboard) {
      run({
        action: updateBillboard.bind(null, billboard.id, data),
      })
    } else {
      run({
        action: createBillboard.bind(null, storeId, data),
        onSuccess: () => router.push(`/${storeId}/billboards`),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billboard Name</FormLabel>
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
