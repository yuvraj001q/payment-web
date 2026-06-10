"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, TrendingUp, Users, Sparkles, Star, ShoppingCart, Shield } from "lucide-react"
import { books, categories, testimonials } from "@/data/books"
import BookCard from "@/components/BookCard"

const stagger = { animate: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } }

export default function HomePage() {
  const featured = books.filter(b => b.featured).slice(0, 4)
  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="absolute inset-0 bg-grid opacity-[0.04] dark:opacity-[0.07]" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-xs font-semibold mb-10 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" /> India's Student-to-Student Book Market
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-6">
              Don't let great<br /><span className="gradient-text">books gather dust</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12">Sell your old JEE, NEET & CBSE books to juniors. Buy at insane discounts. Build your academic legacy.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="group relative px-8 py-3.5 gradient-bg text-white rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:scale-95 inline-flex items-center gap-2">
                Shop Books <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/sell" className="px-8 py-3.5 rounded-xl text-sm font-bold border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary transition-all duration-300 active:scale-95 inline-flex items-center gap-2">
                Start Selling <TrendingUp className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 max-w-3xl mx-auto">
            {[
              { value: "10K+", label: "Books Listed" }, { value: "₹50L+", label: "Student Savings" }, { value: "5K+", label: "Happy Students" }, { value: "95%", label: "Satisfaction" },
            ].map(s => <div key={s.label} className="text-center p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-gray-700/30"><div className="text-2xl md:text-3xl font-black text-primary tracking-tight">{s.value}</div><div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{s.label}</div></div>)}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Browse by Category</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">Find what you need</h2>
        </motion.div>
        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(cat => (
            <motion.div key={cat.name} variants={fadeUp}>
              <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="group relative block p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10"><span className="text-3xl mb-4 block">{cat.icon}</span><h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-1 group-hover:text-primary transition-colors">{cat.name}</h3><p className="text-[11px] text-gray-400 dark:text-gray-500">{cat.count} books</p></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured */}
      <section className="bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="flex items-center justify-between mb-12">
            <div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Featured</span><h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">Handpicked for you</h2></div>
            <Link href="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4">View All <ArrowRight className="w-3.5 h-3.5" /></Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((book, i) => <BookCard key={book.id} book={book} index={i} />)}
          </div>
          <div className="text-center mt-12 sm:hidden"><Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View All <ArrowRight className="w-3.5 h-3.5" /></Link></div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="flex items-center justify-between mb-12">
          <div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Top Rated</span><h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">Students love these</h2></div>
          <Link href="/shop?sort=rating" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4">View All <ArrowRight className="w-3.5 h-3.5" /></Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topRated.map((book, i) => <BookCard key={book.id} book={book} index={i} />)}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-primary/[0.02] to-transparent">
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">How It Works</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">Simple as 1, 2, 3</h2>
          </motion.div>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: "01", icon: <BookOpen className="w-6 h-6" />, title: "Find Your Book", desc: "Browse hundreds of JEE, NEET & CBSE books at student-friendly prices." },
              { step: "02", icon: <ShoppingCart className="w-6 h-6" />, title: "Buy or Swap", desc: "Add to cart and check out. Pay less than half the MRP. Simple." },
              { step: "03", icon: <Shield className="w-6 h-6" />, title: "Build Your Legacy", desc: "Sell your used books back. Help juniors. Earn karma XP and grow your Study Lineage." },
            ].map(item => (
              <motion.div key={item.step} variants={fadeUp} className="relative p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 text-center group hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-4 -right-4 text-5xl font-black text-primary/5 dark:text-primary/10 select-none leading-none">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">What students say</h2>
        </motion.div>
        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <motion.div key={t.name} variants={fadeUp} className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "text-amber-400" : "text-gray-200 dark:text-gray-600"}`} fill={i < t.rating ? "currentColor" : "none"} />)}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">{t.name[0]}</div><div><div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t.name}</div><div className="text-[10px] text-gray-400 dark:text-gray-500">{t.role}</div></div></div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-5" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-6">Ready to start your<br/><span className="gradient-text">academic journey?</span></h2>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto mb-10">Join thousands of students who are saving money and building their academic legacy.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-10 py-4 gradient-bg text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95">Explore the Marketplace <ArrowRight className="w-4 h-4" /></Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-dark-bg to-transparent" />
      </section>
    </div>
  )
}
