import { FC, PropsWithChildren, ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Separator } from "./ui/separator"

interface PageSectionProps {
  heading: React.ReactElement<typeof H1>
  contentSide?: ReactNode
  description?: React.ReactElement<typeof SectionDescription>
  className?: string
}

const PageSectionRoot: FC<PageSectionProps> = ({
  heading,
  contentSide,
  description,
  className,
}) => {
  return (
    <>
      <div className={cn("flex items-center justify-between", className)}>
        <div className="space-y-3">
          {heading}
          {description}
        </div>
        {contentSide}
      </div>
      <Separator className="mb-5 mt-2" />
    </>
  )
}

export const H1 = ({ children }: PropsWithChildren) => {
  return <h1 className="text-5xl font-bold">{children}</h1>
}

export const H2 = ({ children }: PropsWithChildren) => {
  return <h1 className="text-4xl font-bold">{children}</h1>
}

export const SectionDescription = ({ children }: PropsWithChildren) => {
  return <p className="text-sm font-medium text-gray-400">{children}</p>
}

export const PageSection = Object.assign(PageSectionRoot, {
  Heading1: H1,
  Heading2: H2,
  Description: SectionDescription,
})
