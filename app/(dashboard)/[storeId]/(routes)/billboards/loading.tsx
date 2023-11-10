import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Billboards</h1>
          <span className="text-sm font-medium text-gray-400">
            Manage billboards
          </span>
        </div>
      </div>
      <Separator className="mb-5 mt-2" />
      <div className="space-y-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </>
  )
}

export default Loading
