"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, Camera, Upload, CheckCircle, Sparkles, TrendingUp, Users, Award } from "lucide-react"
import { useToast } from "@/context/ToastContext"

export default function SellPage() {
  const { addToast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", city: "", bookTitle: "", author: "", subject: "", examType: "JEE", condition: "Good", mrp: "", price: "", description: "" })

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.bookTitle || !form.phone) return; addToast("Listing submitted! We'll review and get back to you."); setSubmitted(true) }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6"><DollarSign className="w-3 h-3" /> Start Earning</div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-6">Sell your <span className="gradient-text">used books</span></h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mb-12">Turn your old books into cash. List your used JEE, NEET & CBSE books and connect with students who need them.</p>
            <div className="space-y-8">
              {[
                { icon: <TrendingUp className="w-5 h-5" />, title: "AI-Powered Pricing", desc: "Our engine suggests the best price based on condition, demand & market trends." },
                { icon: <Users className="w-5 h-5" />, title: "5K+ Active Students", desc: "Join a thriving community of student buyers and sellers across India." },
                { icon: <Award className="w-5 h-5" />, title: "Earn Karma XP", desc: "Every sale earns you Karma points and grows your Study Lineage." },
              ].map(item => <div key={item.title} className="flex gap-5"><div className="w-12 h-12 rounded-xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary shrink-0">{item.icon}</div><div><h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">{item.title}</h3><p className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">{item.desc}</p></div></div>)}
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
            {submitted ? (
              <div className="p-12 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-primary" /></div>
                <h2 className="text-2xl font-black tracking-tighter text-gray-800 dark:text-gray-100 mb-3">Listing Submitted!</h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed mb-8">Our team will review your book and get back to you within 24 hours. You'll earn Karma XP for your contribution!</p>
                <button onClick={() => setSubmitted(false)} className="px-8 py-3 gradient-bg text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">List Another Book</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 space-y-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Book Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Book Title</label><input value={form.bookTitle} onChange={e => setForm({ ...form, bookTitle: e.target.value })} placeholder="e.g. Physics Galaxy" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" required /></div>
                  <div className="sm:col-span-2"><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Author</label><input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author name" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" /></div>
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Subject</label><input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Physics" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" /></div>
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Exam Type</label><select value={form.examType} onChange={e => setForm({ ...form, examType: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary"><option>JEE</option><option>NEET</option><option>CBSE</option></select></div>
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Condition</label><select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary"><option>Mint</option><option selected>Good</option><option>Annotated</option><option>Worn</option></select></div>
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">MRP (₹)</label><input type="number" value={form.mrp} onChange={e => setForm({ ...form, mrp: e.target.value })} placeholder="Original price" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" /></div>
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Your Price (₹)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Your selling price" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" /></div>
                  <div className="sm:col-span-2"><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Tell buyers about the book's condition, any highlights, etc." className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all resize-none" /></div>
                </div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">Your Info</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Your Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" /></div>
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" required /></div>
                  <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">City</label><input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Your city" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" /></div>
                  <div className="sm:col-span-2"><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Book Photos</label><div className="flex items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/20 cursor-pointer hover:border-primary/50 transition-all"><div className="text-center"><Camera className="w-6 h-6 text-gray-300 dark:text-gray-600 mx-auto mb-1" /><span className="text-xs text-gray-400 dark:text-gray-500">Tap to upload photos</span></div></div></div>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} type="submit" className="w-full py-3.5 gradient-bg text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all">Submit Listing</motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
