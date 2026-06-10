"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send, MessageSquare, Sparkles, CheckCircle } from "lucide-react"
import { useToast } from "@/context/ToastContext"

export default function ContactPage() {
  const { addToast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.name || !form.email || !form.message) return; addToast("Message sent! We'll get back to you soon."); setSubmitted(true) }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6"><MessageSquare className="w-3 h-3" /> Get in Touch</div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white mb-6">We'd love to <span className="gradient-text">hear from you</span></h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mb-12">Have a question, suggestion, or just want to say hi? Drop us a message and we'll get back to you within 24 hours.</p>
            <div className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@swaposcholar.com" },
                { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "India (Remote-First)" },
                { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 98765 43210" },
              ].map(item => <div key={item.label} className="flex items-center gap-5"><div className="w-12 h-12 rounded-xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div><div><div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{item.label}</div><p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.value}</p></div></div>)}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
            {submitted ? (
              <div className="p-12 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-black tracking-tighter text-gray-800 dark:text-gray-100 mb-3">Message Sent!</h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Thanks for reaching out! Our team will respond within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="px-8 py-3 gradient-bg text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 space-y-5">
                <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" required /></div>
                <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" required /></div>
                <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Subject</label><input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all" /></div>
                <div><label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5 block">Message</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell us what's on your mind..." className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-primary transition-all resize-none" required /></div>
                <motion.button whileTap={{ scale: 0.97 }} type="submit" className="w-full py-3.5 gradient-bg text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send Message</motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
