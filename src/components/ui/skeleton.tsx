import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg" />
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
      <div className="absolute inset-0 bg-black/30" />
      <div className="flex flex-col items-center px-4 py-16 text-white relative z-10 w-full max-w-6xl">

        <div className="h-12 bg-gray-300/50 rounded-lg w-3/4 md:w-2/3 lg:w-1/2 mb-6" />
     
        <div className="h-6 bg-gray-300/50 rounded-lg w-2/3 md:w-1/2 mb-3" />
        <div className="h-6 bg-gray-300/50 rounded-lg w-1/2 md:w-1/3 mb-8" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <div className="h-11 w-32 bg-white/80 rounded-lg" />
          <div className="h-11 w-32 bg-white/80 rounded-lg" />
        </div>
        
        <div className="mt-2 max-w-xl w-full mx-auto bg-white/80 rounded-full p-1 flex items-center">
          <div className="flex-1 h-11 rounded-full" />
          <div className="h-11 w-11 rounded-full bg-gray-300/50 shrink-0" />
        </div>
      </div>
    </div>
  )
}