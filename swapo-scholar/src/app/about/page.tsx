"use client"
import { motion } from "framer-motion"
import { BookOpen, Target, Heart, Zap, Sparkles } from "lucide-react"

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } }

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6"><Sparkles className="w-3 h-3" /> Our Story</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-6">Built by <span className="gradient-text">students</span>, for students</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">We believe no student should pay full price for textbooks. Swapo Scholar connects student sellers with student buyers — making education affordable and sustainable.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            { icon: <BookOpen className="w-6 h-6" />, title: "Our Mission", desc: "Make academic books accessible and affordable for every Indian student. No student should ever have to choose between buying a textbook and lunch." },
            { icon: <Target className="w-6 h-6" />, title: "Our Vision", desc: "Create India's largest student-to-student knowledge exchange platform — where books, notes, and guidance flow freely between batches." },
            { icon: <Heart className="w-6 h-6" />, title: "Why We Exist", desc: "We've been there. We know how expensive JEE, NEET & CBSE prep can be. Swapo Scholar is our answer to a broken system where books cost a fortune and gather dust after exams." },
            { icon: <Zap className="w-6 h-6" />, title: "Our Impact", desc: "10,000+ books listed, ₹50 lakh+ saved by students, and a growing community of 5,000+ student changemakers across India." },
          ].map(item => (
            <motion.div key={item.title} variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 group hover:shadow-lg hover:border-primary/20 transition-all">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-12 md:p-20 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-6">Join the <span className="gradient-text">movement</span></h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mx-auto mb-10">Whether you're buying, selling, or sharing guidance — you're building a legacy that helps the next batch of aspirants.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4"><a href="/shop" className="px-8 py-3.5 gradient-bg text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all">Start Exploring</a><a href="/sell" className="px-8 py-3.5 rounded-xl font-bold text-sm border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary transition-all">Sell Your Books</a></div>
        </motion.div>
      </div>
    </div>
  )
}
