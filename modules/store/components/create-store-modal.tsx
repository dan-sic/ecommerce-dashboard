"use client"

import { useRouter } from "next/navigation"
import { storeSchema } from "@/modules/store/consts/store-schema"
import { useToast } from "@/store/use-toast-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type FormData = z.infer<typeof storeSchema>

export const CreateStoreModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(storeSchema),
  })
  const router = useRouter()
  const { toast } = useToast()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormData) => apiClient.post<Store>("/stores", data),
    onSuccess: (data) => {
      toast({ title: "Store created!" })
      closeModal()
      router.refresh()
      router.replace(`/${data.data.id}`)
    },
    onError: (error) => {
      toast({ title: "Something went wrong" })
    },
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create New Store</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="f.eg. Store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button isLoading={isLoading} className="w-full" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
