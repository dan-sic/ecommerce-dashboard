"use client"

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { millisecondsToMinutes, minutesToMilliseconds } from "date-fns"
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: minutesToMilliseconds(5),
      cacheTime: minutesToMilliseconds(5),
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
