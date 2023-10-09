"use client"

import { useEffect, useState } from "react"

interface Props extends React.PropsWithChildren {}

export const ClientOnly = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  if (!isMounted) return null

  return <>{children}</>
}
