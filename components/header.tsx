"use client"

import { FC } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

export const Header: FC = () => {
  const { data } = useSession()
  const userName = data?.user?.name
  return (
    <header className="flex h-20 items-center bg-gray-200 p-5">
      {userName && <span>Hello {userName}</span>}
      <Button className="ml-auto" onClick={() => signOut()}>
        Sign Out
      </Button>
    </header>
  )
}
