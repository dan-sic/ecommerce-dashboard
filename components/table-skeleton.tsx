import { FC } from "react"

import { Skeleton } from "./ui/skeleton"

export const TableSkeleton: FC = () => {
  return (
    <div className="space-y-3">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <Skeleton className="h-10 w-full" key={`skeleton-${i}`} />
        ))}
    </div>
  )
}
