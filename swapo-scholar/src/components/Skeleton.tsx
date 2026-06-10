export function BookCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40">
      <div className="aspect-[3/4] skeleton" />
      <div className="p-8 space-y-4">
        <div className="flex gap-2"><div className="h-4 w-16 rounded skeleton" /><div className="h-4 w-12 rounded skeleton" /></div>
        <div className="h-4 w-full rounded skeleton" /><div className="h-3 w-2/3 rounded skeleton" />
        <div className="flex gap-1"><div className="h-3 w-12 rounded skeleton" /><div className="h-3 w-1 rounded skeleton" /><div className="h-3 w-16 rounded skeleton" /></div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700/30"><div className="h-6 w-20 rounded skeleton" /><div className="h-9 w-20 rounded-xl skeleton" /></div>
      </div>
    </div>
  )
}

export function TextSkeleton({ className = "" }: { className?: string }) { return <div className={`skeleton rounded ${className}`} /> }
export function ButtonSkeleton({ className = "" }: { className?: string }) { return <div className={`skeleton rounded-xl ${className}`} /> }
