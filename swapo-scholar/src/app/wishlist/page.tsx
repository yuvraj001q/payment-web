"use client"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import BookCard from "@/components/BookCard"
import { EmptyWishlist } from "@/components/EmptyState"

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  if (wishlist.length === 0) return <div className="pt-32 pb-24"><div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24"><EmptyWishlist /></div></div>

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white flex items-center gap-4">
            Your <span className="gradient-text">Wishlist</span> <Heart className="w-6 h-6 text-primary" fill="currentColor" />
          </h1>
          <p className="text-sm text-gray-400 mt-2">{wishlist.length} saved {wishlist.length === 1 ? "book" : "books"}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((book, i) => <BookCard key={book.id} book={book} index={i} />)}
        </div>
      </div>
    </div>
  )
}
