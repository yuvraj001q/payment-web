"use client"
import Link from "next/link"
import { Search, BookOpen, ShoppingBag } from "lucide-react"

function EmptyState({ icon, title, description, actionLabel, actionHref }: { icon: React.ReactNode; title: string; description: string; actionLabel?: string; actionHref?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center mb-5 text-primary">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs mb-6">{description}</p>
      {actionLabel && actionHref && <Link href={actionHref} className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">{actionLabel}</Link>}
    </div>
  )
}

export function EmptySearch({ query }: { query?: string }) { return <EmptyState icon={<Search className="w-8 h-8" />} title={query ? `No results for "${query}"` : "No books found"} description={query ? "Try a different search term or adjust your filters." : "Try adjusting your filters to see more books."} actionLabel="Browse All Books" actionHref="/shop" /> }
export function EmptyCart() { return <EmptyState icon={<ShoppingBag className="w-8 h-8" />} title="Your cart is empty" description="Start browsing the marketplace to add books to your cart." actionLabel="Browse Books" actionHref="/shop" /> }
export function EmptyWishlist() { return <EmptyState icon={<BookOpen className="w-8 h-8" />} title="No saved books yet" description="When you find books you love, tap the heart icon to save them here." actionLabel="Discover Books" actionHref="/shop" /> }
