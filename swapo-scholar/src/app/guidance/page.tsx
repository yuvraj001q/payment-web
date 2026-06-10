"use client"
import { motion } from "framer-motion"
import { BookOpen, Star, Award, Sparkles, Quote } from "lucide-react"
import { seniorStories, testimonials, faqs } from "@/data/books"

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } }
const stagger = { animate: { transition: { staggerChildren: 0.06 } } }

export default function GuidancePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6"><BookOpen className="w-3 h-3" /> Senior Guidance</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-6">Learn from <span className="gradient-text">those who've been there</span></h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">Real advice from senior JEE, NEET & CBSE toppers. Read their journeys, tips, and the books that got them through.</p>
        </motion.div>

        {/* Senior Stories */}
        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {seniorStories.map(s => (
            <motion.div key={s.name} variants={fadeUp} className="group p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">{s.name[0]}</div>
                <div><div className="font-bold text-sm text-gray-800 dark:text-gray-100">{s.name}</div><div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">{s.college} · {s.exam} {s.year}</div></div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">{s.tips.map(t => <span key={t} className="px-2.5 py-1 rounded-lg bg-primary/5 dark:bg-primary/10 text-primary text-[10px] font-semibold">{t}</span>)}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic mb-5">"{s.story}"</p>
              <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-700/30">
                <div className="flex items-center gap-1.5"><Star className="w-3 h-3 text-amber-400" fill="currentColor" /><span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{s.rating.toFixed(1)}</span></div>
                <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 flex items-center gap-1"><Award className="w-3 h-3" />{s.karmaXP} Karma</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="mb-24">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">What students <span className="gradient-text">say about us</span></h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map(t => (
              <div key={t.name} className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 hover:shadow-lg transition-shadow">
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 italic">"{t.content}"</p>
                <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-primary/70 flex items-center justify-center text-white text-xs font-bold">{t.name[0]}</div><div><div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t.name}</div><div className="text-[10px] text-gray-400">{t.role}</div></div></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <div className="text-center mb-12"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">FAQ</span><h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">Got <span className="gradient-text">questions?</span></h2></div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 cursor-pointer hover:border-gray-200 dark:hover:border-gray-600 transition-all">
                <summary className="flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-100 list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}<span className="text-gray-300 dark:text-gray-600 transition-transform group-open:rotate-45 text-lg">+</span>
                </summary>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
