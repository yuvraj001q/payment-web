"use client"
import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { books, categories } from "@/data/books"
import BookCard from "@/components/BookCard"
import { BookCardSkeleton } from "@/components/Skeleton"
import { EmptySearch } from "@/components/EmptyState"

const conditions = ["All", "Mint", "Good", "Annotated", "Worn"]
const sortOptions = ["Newest", "Price: Low", "Price: High", "Rating", "Discount"]

export default function ShopPage() {
  return <Suspense fallback={<div className="pt-32 pb-24"><div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}</div></div></div>}><ShopContent /></Suspense>
}

function ShopContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const initialCategory = searchParams.get("category") || "All"
  const [search, setSearch] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    let result = [...books]
    if (search) { const q = search.toLowerCase(); result = result.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.subject.toLowerCase().includes(q)) }
    if (selectedCategory !== "All") result = result.filter(b => b.category === selectedCategory)
    if (selectedCondition !== "All") result = result.filter(b => b.condition === selectedCondition)
    switch (sortBy) {
      case "Price: Low": result.sort((a, b) => a.price - b.price); break
      case "Price: High": result.sort((a, b) => b.price - a.price); break
      case "Rating": result.sort((a, b) => b.rating - a.rating); break
      case "Discount": result.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp); break
      default: break
    }
    return result
  }, [search, selectedCategory, selectedCondition, sortBy])

  const filtersActive = selectedCategory !== "All" || selectedCondition !== "All" || search
  const clearFilters = () => { setSearch(""); setSelectedCategory("All"); setSelectedCondition("All"); setSortBy("Newest") }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-4">Book <span className="gradient-text">Marketplace</span></h1>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-xl">Browse hundreds of second-hand JEE, NEET & CBSE books at student-friendly prices.</p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => { setSearch(e.target.value); setLoading(true); setTimeout(() => setLoading(false), 300) }} placeholder="Search by title, author, subject..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary transition-all" />
          </div>
          <div className="flex gap-3 items-center">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="pl-3 pr-8 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 outline-none focus:border-primary appearance-none cursor-pointer"><option>Sort</option>{sortOptions.map(o => <option key={o} value={o}>{o}</option>)}</select>
            {filtersActive && <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-3 rounded-xl bg-secondary/10 text-secondary text-xs font-semibold hover:bg-secondary/20 transition-all"><X className="w-3 h-3" /> Clear</button>}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", ...categories.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${selectedCategory === cat ? "bg-primary text-white shadow-sm" : "bg-white dark:bg-dark-card text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:text-primary"}`}>{cat}</button>
          ))}
        </div>

        {/* Condition Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {conditions.map(c => (
            <button key={c} onClick={() => setSelectedCondition(c)} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all uppercase tracking-wider ${selectedCondition === c ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800" : "bg-gray-100 dark:bg-gray-800/40 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}>{c}</button>
          ))}
          <span className="text-[10px] text-gray-300 dark:text-gray-600 self-center ml-2">({filtered.length} books)</span>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}</div>
        ) : filtered.length === 0 ? (
          <EmptySearch query={search} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((book, i) => <BookCard key={book.id} book={book} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
