"use client"

import { FC } from "react"
import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "../ui/button"

interface SignOutProps {
  className?: string
}

export const SignOut: FC<SignOutProps> = ({ className }) => {
  return (
    <Button
      className={className}
      onClick={() => signOut()}
      variant="ghost"
      size="icon"
    >
      <LogOutIcon />
      <span className="sr-only">Sign Out</span>
    </Button>
  )
}
