"use client"

import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useServerAction } from "@/lib/use-server-action"
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

import { updateStore } from "../actions"

interface StoreSettingsFormProps {
  store: Store
}

type FormData = z.infer<typeof storeSchema>

export const StoreSettingsForm: FC<StoreSettingsFormProps> = ({ store }) => {
  const { run, isPending } = useServerAction()

  const form = useForm<FormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store.name,
    },
  })

  const onSubmit = (data: FormData) => {
    run({
      action: updateStore.bind(null, store.id, data),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isPending} type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  )
}
