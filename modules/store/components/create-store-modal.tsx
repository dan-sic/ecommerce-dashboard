"use client"

import { useRouter } from "next/navigation"
import { storeSchema } from "@/modules/store/consts/store-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useServerAction } from "@/lib/use-server-action"
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

import { createStore } from "../actions"

type FormData = z.infer<typeof storeSchema>

export const CreateStoreModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const { isPending, run } = useServerAction()
  const form = useForm<FormData>({
    resolver: zodResolver(storeSchema),
  })
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    run({
      action: createStore.bind(null, data),
      onSuccess: (store) => {
        closeModal()
        router.refresh()
        router.replace(`/${store.id}`)
      },
    })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create New Store</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
            <Button isLoading={isPending} className="w-full" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
