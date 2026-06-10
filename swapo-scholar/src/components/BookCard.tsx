"use client"
import { useRef } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Sparkles } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/context/ToastContext"
import { motion, useMotionValue, useSpring } from "framer-motion"
import type { Book } from "@/data/books"

export default function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToCart, cart } = useCart()
  const { addToast } = useToast()
  const discount = Math.round(((book.mrp - book.price) / book.mrp) * 100)
  const inCart = cart.find(i => i.id === book.id)
  const wishlisted = isWishlisted(book.id)
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const glareX = useMotionValue("50%")
  const glareY = useMotionValue("50%")

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8)
    rotateX.set(-((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8)
    glareX.set(`${((e.clientX - rect.left) / rect.width) * 100}%`)
    glareY.set(`${((e.clientY - rect.top) / rect.height) * 100}%`)
  }
  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0) }

  const glowClass = book.condition === "Mint" ? "glow-mint" : book.condition === "Good" ? "glow-good" : book.condition === "Annotated" ? "glow-annotated" : "glow-worn"

  return (
    <motion.div ref={cardRef} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 shadow-sm hover:shadow-xl transition-shadow duration-300 ${glowClass}`}>
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(0,240,255,0.08) 0%, transparent 60%)` }} />
      <Link href={`/book/${book.id}`} className="block relative overflow-hidden aspect-[3/4] bg-gray-50 dark:bg-gray-800/40">
        <img src={book.image} alt={book.title} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm ${book.condition === "Mint" ? "text-[#00f0ff] bg-[#00f0ff]/10 dark:bg-[#00f0ff]/20" : book.condition === "Good" ? "text-[#10b981] bg-[#10b981]/10 dark:bg-[#10b981]/20" : book.condition === "Annotated" ? "text-[#8b5cf6] bg-[#8b5cf6]/10 dark:bg-[#8b5cf6]/20" : "text-[#f59e0b] bg-[#f59e0b]/10 dark:bg-[#f59e0b]/20"}`}>{book.condition}</span>
          {discount > 20 && <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-secondary text-white shadow-sm flex items-center gap-1"><Sparkles className="w-2.5 h-2.5" /> Save {discount}%</span>}
          {book.highlyAnnotated && <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#f97316] text-white shadow-sm">Annotated</span>}
        </div>
        <motion.button whileTap={{ scale: 0.75 }} onClick={e => { e.preventDefault(); toggleWishlist(book); addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist!") }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md z-10 ${wishlisted ? "bg-secondary text-white" : "bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-secondary backdrop-blur-sm"}`}>
          <Heart className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} />
        </motion.button>
        {!book.stock && <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-10"><span className="text-white font-bold text-sm bg-black/60 px-5 py-2.5 rounded-xl border border-white/10">Sold Out</span></div>}
      </Link>
      <div className="p-8">
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/5 dark:bg-primary/10 px-2.5 py-0.5 rounded-md">{book.examType}</span>
          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-400">Class {book.class}</span>
        </div>
        <Link href={`/book/${book.id}`}><h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-primary dark:hover:text-primary transition-colors leading-snug min-h-[2.5em]">{book.title}</h3></Link>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-medium truncate">{book.author}</p>
        <div className="flex items-center gap-1.5 mt-5">
          <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{book.rating}</span>
          <span className="text-[10px] text-gray-300 dark:text-gray-600 mx-1">•</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{book.subject}</span>
        </div>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100 dark:border-gray-700/30">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-primary">₹{book.price}</span>
            <span className="text-[11px] font-medium text-gray-400 line-through">₹{book.mrp}</span>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={e => { e.preventDefault(); if (book.stock) { addToCart(book); addToast(inCart ? "Quantity updated!" : "Added to cart!") } }} disabled={!book.stock}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-200 flex items-center gap-1.5 ${book.stock ? inCart ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-primary text-white hover:shadow-lg hover:shadow-primary/30 active:scale-95" : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"}`}>
            <ShoppingCart className="w-3 h-3" />{!book.stock ? "Sold" : inCart ? "Added" : "Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
