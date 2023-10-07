import { Header } from '@/components/header'
import Image from 'next/image'

export default function Home() {
  return (
        <>
      <Header />
      <main className="flex items-center justify-center">
        <h1 className="text-3xl">Homepage</h1>
      </main>
    </>
  )
}
