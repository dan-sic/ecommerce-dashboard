"use client"

import { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface Props {
  storeId: string
}

export const Navbar: FC<Props> = ({ storeId }) => {
  const pathname = usePathname()
  return (
    <nav className="flex items-center space-x-3">
      <Link
        href={`/${storeId}`}
        className={cn(
          pathname === `/${storeId}` ? "font-semibold" : "font-normal"
        )}
      >
        Overview
      </Link>
      <Link
        href={`/${storeId}/settings`}
        className={cn(
          pathname === `/${storeId}/settings` ? "font-medium" : "font-normal"
        )}
      >
        Settings
      </Link>
    </nav>
  )
}
