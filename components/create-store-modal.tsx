"use client"

import { useModalStore } from "@/store/use-modal-store"
import { useToast } from "@/store/use-toast-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { apiClient } from "@/lib/api-client"
import { storeSchema } from "@/lib/validation-schemas/create-store"
import { AppDialog } from "@/components/ui/app-dialog"
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

import { DialogHeader, DialogTitle } from "./ui/dialog"

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

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormData) => apiClient.post("/stores", data),
    onSuccess: () => {
      toast({ title: "Store created!" })
      closeModal()
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
          <AppDialog.Footer>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </AppDialog.Footer>
        </form>
      </Form>
    </>
  )
}
