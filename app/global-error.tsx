"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

// import { inter } from "./layout"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className={""}>
        <div className="grid h-screen place-content-center bg-white px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200">500</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Something went wrong
            </p>

            <p className="mt-4 text-gray-500">{error.message}</p>

            <Button onClick={reset}>Try Again</Button>
          </div>
        </div>
      </body>
    </html>
  )
}
