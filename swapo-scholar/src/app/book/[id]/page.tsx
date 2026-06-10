"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, ShoppingCart, Star, Sparkles, BookOpen, MapPin, Award, Share2 } from "lucide-react"
import { books } from "@/data/books"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { useToast } from "@/context/ToastContext"
import BookCard from "@/components/BookCard"

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const book = books.find(b => b.id === Number(id))
  const { addToCart, cart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToast } = useToast()
  const [selectedImage, setSelectedImage] = useState(0)

  if (!book) return <div className="pt-32 pb-24 text-center"><h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Book not found</h1><Link href="/shop" className="text-primary text-sm font-semibold mt-4 inline-block">← Back to shop</Link></div>

  const discount = Math.round(((book.mrp - book.price) / book.mrp) * 100)
  const inCart = cart.find(i => i.id === book.id)
  const similarBooks = books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4)

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-primary mb-8 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 group">
              <img src={book.images?.[selectedImage] || book.image} alt={book.title} className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" />
              {discount > 20 && <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-secondary text-white text-xs font-bold flex items-center gap-1 shadow-lg"><Sparkles className="w-3 h-3" /> Save {discount}%</div>}
              <button onClick={() => { toggleWishlist(book); addToast(isWishlisted(book.id) ? "Removed from wishlist" : "Added to wishlist!") }} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all shadow-md"><Heart className="w-4 h-4" fill={isWishlisted(book.id) ? "currentColor" : "none"} /></button>
            </div>
            {book.images && book.images.length > 1 && <div className="flex gap-3">{book.images.map((img, i) => <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImage ? "border-primary shadow-sm" : "border-transparent opacity-60 hover:opacity-100"}`}><img src={img} alt="" className="w-full h-full object-contain p-2" /></button>)}</div>}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 dark:bg-primary/10 px-3 py-1 rounded-lg">{book.examType}</span>
              <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">Class {book.class}</span>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${book.condition === "Mint" ? "text-[#00f0ff] bg-[#00f0ff]/10" : book.condition === "Good" ? "text-[#10b981] bg-[#10b981]/10" : book.condition === "Annotated" ? "text-[#8b5cf6] bg-[#8b5cf6]/10" : "text-[#f59e0b] bg-[#f59e0b]/10"}`}>{book.condition}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-4">{book.title}</h1>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-6">by {book.author} · {book.subject}</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-baseline gap-3"><span className="text-4xl font-black text-primary">₹{book.price}</span><span className="text-lg font-medium text-gray-400 line-through">₹{book.mrp}</span></div>
              {discount > 0 && <span className="px-3 py-1 rounded-xl bg-secondary/10 text-secondary text-xs font-bold">{discount}% OFF</span>}
            </div>

            {/* Seller Info */}
            {book.owner && <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/30 mb-8"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">{book.owner.name[0]}</div><div><div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{book.owner.name}</div><div className="flex items-center gap-2 text-xs text-gray-400 mt-1"><MapPin className="w-3 h-3" />{book.owner.city} · <Award className="w-3 h-3" />{book.owner.karmaXP} Karma</div></div></div></div>}

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">{book.description}</p>

            {book.highlyAnnotated && <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 mb-8"><div className="flex items-start gap-3"><BookOpen className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><div><h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Highly Annotated</h4><p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">This book contains handwritten notes, highlights, and margin annotations — perfect for understanding tricky concepts faster.</p></div></div></div>}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => { addToCart(book); addToast(inCart ? "Quantity updated!" : "Added to cart!") }} disabled={!book.stock} className={`flex-1 px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${book.stock ? "gradient-bg text-white hover:shadow-xl hover:shadow-primary/30 active:scale-95" : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"}`}><ShoppingCart className="w-4 h-4" />{!book.stock ? "Sold Out" : inCart ? "Update Cart" : "Add to Cart"}</motion.button>
              <button onClick={() => { toggleWishlist(book); addToast(isWishlisted(book.id) ? "Removed from wishlist" : "Saved to wishlist!") }} className={`px-6 py-3.5 rounded-xl font-bold text-xs transition-all border-2 ${isWishlisted(book.id) ? "bg-secondary/10 text-secondary border-secondary/30" : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-secondary/30 hover:text-secondary"}`}><Heart className="w-4 h-4 inline-block" fill={isWishlisted(book.id) ? "currentColor" : "none"} /></button>
              <button className="px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-primary transition-all"><Share2 className="w-4 h-4" /></button>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-700/30"><div><span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Pages</span><p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">{book.pages}</p></div><div><span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Edition</span><p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">{book.edition}</p></div><div><span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Language</span><p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">{book.language}</p></div><div><span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Condition</span><p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">{book.condition}</p></div></div>
          </motion.div>
        </div>

        {/* Similar Books */}
        {similarBooks.length > 0 && <section><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center"><h2 className="text-2xl md:text-4xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">Similar <span className="gradient-text">Books</span></h2></motion.div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{similarBooks.map((b, i) => <BookCard key={b.id} book={b} index={i} />)}</div></section>}
      </div>
    </div>
  )
}
