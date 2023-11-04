"use client"

import { useRouter } from "next/navigation"
import { useToast } from "@/store/use-toast-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { apiClient } from "@/lib/api-client"
import { storeSchema } from "@/lib/validation-schemas/create-store"
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

import { DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

type FormData = z.infer<typeof storeSchema>

export const CreateStoreModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const { toast } = useToast()
  const form = useForm<FormData>({
    resolver: zodResolver(storeSchema),
  })
  const router = useRouter()

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
