"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  MousePointerClick,
  QrCode,
  Globe,
  Shield,
  BarChart3,
  Zap,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BlackHoleBackground from "@/components/background/BlackHoleBackground";

const features = [
  {
    icon: LayoutGrid,
    title: "Bento Grid Layout",
    description:
      "Premium glassmorphic tiles that convert visitors into customers.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    link: "/register",
  },
  {
    icon: QrCode,
    title: "QR Code Engine",
    description: "Generate custom QR codes with your branding and analytics.",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=400&fit=crop",
    link: "/register",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track views, clicks, QR scans, devices, and countries.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    link: "/register",
  },
  {
    icon: Globe,
    title: "Local SEO Power",
    description: "Auto-generated schema markup and Open Graph tags.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    link: "/register",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and secure password hashing.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    link: "/register",
  },
  {
    icon: Zap,
    title: "Flash Offers",
    description: "Create urgency with live countdown timers.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
    link: "/register",
  },
];

const stats = [
  { label: "Businesses", value: "0" },
  { label: "Pages Created", value: "0" },
  { label: "QR Scans", value: "0" },
  { label: "Click-through", value: "0" },
];

const faqs = [
  {
    q: "What is Predator Grid?",
    a: "A premium Bento-Grid landing page builder for local businesses. Unlike Linktree's simple vertical stack, we use interactive glassmorphic tiles designed to maximize conversions.",
  },
  {
    q: "How is this different from Linktree?",
    a: "Linktree gives you a vertical list of buttons. Predator Grid gives you a premium Bento Grid with interactive tiles, flash offers, WhatsApp integration, QR codes, analytics, and local SEO.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes! Pro and Business plans support custom domains. Point your domain to your Predator Grid page seamlessly.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes! Our free plan includes 1 Bento Grid page with up to 6 tiles, basic analytics, and QR code generation.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-white">
      <BlackHoleBackground />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Zap className="h-6 w-6 text-indigo-400" />
            Predator Grid
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link href="/register" className="btn-primary text-sm !px-4 !py-2">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              The Linktree Killer for Local Businesses
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Your Business Deserves
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                More Than Links
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create high-converting Bento Grid landing pages with interactive
              glassmorphic tiles, flash offers, WhatsApp integration, and
              real-time analytics.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary !px-8 !py-3.5 text-base">
                Start Building Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="btn-secondary !px-8 !py-3.5 text-base">
                See How It Works
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
              <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[360px] sm:h-[420px]">
                <div className="col-span-2 row-span-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 p-5 flex flex-col justify-end">
                  <span className="text-xs text-indigo-400 font-medium mb-1">
                    Featured
                  </span>
                  <span className="text-lg font-semibold">
                    Summer Menu Launch
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    50% off all new items
                  </span>
                </div>
                <div className="col-span-1 row-span-1 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10 p-3 flex flex-col justify-end">
                  <span className="text-xs font-medium text-green-400">
                    WhatsApp
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Chat Now
                  </span>
                </div>
                <div className="col-span-1 row-span-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-white/10 p-3 flex flex-col justify-end">
                  <span className="text-xs font-medium text-amber-400">
                    Flash Sale
                  </span>
                  <span className="text-lg font-bold mt-1">47:23:11</span>
                  <span className="text-xs text-muted-foreground">
                    30% off
                  </span>
                </div>
                <div className="col-span-1 row-span-1 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 p-3 flex flex-col justify-end">
                  <span className="text-xs font-medium text-blue-400">
                    Menu
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    View Menu
                  </span>
                </div>
                <div className="col-span-1 row-span-1 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-white/10 p-3 flex flex-col justify-end">
                  <span className="text-xs font-medium text-pink-400">
                    Reviews
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    4.9 ★
                  </span>
                </div>
                <div className="col-span-2 row-span-1 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-purple-400">
                      Location
                    </span>
                    <span className="text-xs text-muted-foreground block mt-1">
                      123 Main St, Delhi
                    </span>
                  </div>
                  <Globe className="h-5 w-5 text-purple-400" />
                </div>
                <div className="col-span-1 row-span-1 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-white/10 p-3 flex flex-col justify-end">
                  <span className="text-xs font-medium text-red-400">
                    Video
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Watch
                  </span>
                </div>
                <div className="col-span-2 row-span-1 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-teal-400">
                      Book a Table
                    </span>
                    <span className="text-xs text-muted-foreground block mt-1">
                      Reserve Now
                    </span>
                  </div>
                  <MousePointerClick className="h-5 w-5 text-teal-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything Your Business Needs
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Not just links. A complete micro-conversion website in every tile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={f.link}
                  className="block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all group h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <f.icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Trusted by Growing Businesses
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white/40">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ml-4 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Ready to Kill Your Linktree?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                Join thousands of local businesses using Predator Grid to
                convert visitors into customers.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 btn-primary mt-8 !px-8 !py-3.5 text-base"
              >
                Start Free Today
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-indigo-400" />
              Predator Grid
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/login" className="hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-white transition-colors"
              >
                Register
              </Link>
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Predator Grid. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
