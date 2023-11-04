"use client"

import { FC, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useOpenModal } from "@/store/use-modal-store"
import { Store } from "@prisma/client"
import { PlusCircle, Store as StoreIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { validateSchema } from "@/lib/validate-schema"
import { storeIdParam } from "@/lib/validation-schemas/create-store"
import { Input, Search } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { CreateStoreModal } from "../create-store-modal"
import { Button } from "../ui/button"

interface StoreSelectProps {
  stores: Store[]
}

export const StoreSelect: FC<StoreSelectProps> = ({ stores }) => {
  const [query, setQuery] = useState("")
  const params = useParams()
  const router = useRouter()
  const openModal = useOpenModal()

  const { storeId } = validateSchema(params, storeIdParam)

  return (
    <Select
      value={storeId}
      onOpenChange={() => setQuery("")}
      onValueChange={(value) => router.push(`/${value}`)}
    >
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center space-x-2">
          <StoreIcon className="h-4 w-4" />
          <SelectValue placeholder="Theme" />
        </div>
      </SelectTrigger>
      <SelectContent className="p-2">
        <Search
          placeholder="Search store..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Separator className="mt-2" />
        <p className="my-2 text-sm font-bold">Stores</p>
        {stores.map((store) => (
          <SelectItem
            key={store.id}
            value={store.id}
            className={cn(
              query && !store.name.toLowerCase().includes(query.toLowerCase())
                ? "hidden"
                : "block"
            )}
          >
            {store.name}
          </SelectItem>
        ))}
        <Separator className="mt-2" />
        <Button
          className="w-full text-left"
          variant="ghost"
          onClick={() =>
            openModal(({ closeModal }) => (
              <CreateStoreModal {...{ closeModal }} />
            ))
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Store
        </Button>
      </SelectContent>
    </Select>
  )
}