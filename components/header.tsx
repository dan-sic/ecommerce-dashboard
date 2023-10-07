'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Header: FC = () => {
  const { data } = useSession()
  const userName = data?.user?.name
  return (
    <header className="bg-gray-200 h-20 flex p-5 items-center">
      {userName && <span>Hello {userName}</span>}
      <Button className="ml-auto" onClick={() => signOut()}>
        Sign Out
      </Button>
    </header>
  )
}