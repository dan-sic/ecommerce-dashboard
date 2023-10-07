'use client'

import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}