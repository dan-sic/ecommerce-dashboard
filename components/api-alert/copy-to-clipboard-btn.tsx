"use client"

import { Copy } from "lucide-react"

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"

import { Button } from "../ui/button"

export const CopyToClipBoardBtn = ({ content }: { content: string }) => {
  const copy = useCopyToClipboard()
  return (
    <Button variant="outline" size="sm" onClick={() => copy(content)}>
      <Copy className="h-4 w-4" />
    </Button>
  )
}
