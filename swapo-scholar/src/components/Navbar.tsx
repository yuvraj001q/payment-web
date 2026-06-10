"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Heart, Search, Sun, Moon, Menu, X } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { useTheme } from "@/context/ThemeContext"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { wishlist } = useWishlist()
  const { dark, toggleTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll) }, [])

  const links = [
    { href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { href: "/sell", label: "Sell" },
    { href: "/guidance", label: "Guidance" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" },
  ]
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`; setSearchOpen(false) }
  const isHome = pathname === "/"
  const transparent = isHome && !scrolled

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-6">
      <motion.nav
        animate={{ width: scrolled ? "auto" : "100%", maxWidth: scrolled ? "720px" : "1280px", borderRadius: scrolled ? "9999px" : "16px", boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.12)" : "0 0 0 transparent" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full ${transparent ? "bg-transparent border-none" : "glass-pill shadow-lg shadow-black/5 dark:shadow-black/20"}`}>
        <div className="flex items-center justify-between px-6" style={{ height: scrolled ? "52px" : "64px" }}>
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm transition-all duration-500 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-primary/40">S</div>
            <span className={`font-bold transition-all duration-300 ${scrolled ? "text-sm" : "text-lg"} tracking-tight ${transparent ? "text-white" : "text-gray-800 dark:text-white"}`}>Swapo<span className="text-primary">Scholar</span></span>
          </Link>
          <div className={`hidden lg:flex items-center gap-1 transition-all duration-300 ${scrolled ? "scale-90" : "scale-100"}`}>
            {links.map(link => (
              <Link key={link.href} href={link.href}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${pathname === link.href ? "bg-primary text-white shadow-lg shadow-primary/30" : transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/5"}`}>{link.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={toggleTheme} className={`p-2 rounded-xl transition-all duration-200 ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-primary/5"}`}>{dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            <button onClick={() => setSearchOpen(!searchOpen)} className={`p-2 rounded-xl transition-all duration-200 ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-primary/5"}`}><Search className="w-4 h-4" /></button>
            <Link href="/wishlist" className={`p-2 rounded-xl transition-all duration-200 relative ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-primary/5"}`}>
              <Heart className="w-4 h-4" />{wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">{wishlist.length}</span>}
            </Link>
            <Link href="/cart" className={`p-2 rounded-xl transition-all duration-200 relative ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-primary/5"}`}>
              <ShoppingCart className="w-4 h-4" />{totalItems > 0 && <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">{totalItems}</span>}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-primary/5"}`}>{menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}</button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`border-t ${transparent ? "border-white/10" : "border-gray-200/50 dark:border-gray-700/30"}`}>
              <div className="max-w-xl mx-auto px-6 py-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${transparent ? "text-white/50" : "text-gray-400"}`} />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search books..." className={`w-full pl-9 pr-3 py-2 rounded-xl outline-none transition-all text-xs ${transparent ? "bg-white/20 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50" : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-primary"}`} autoFocus />
                  </div>
                  <button type="submit" className="px-4 py-2 gradient-bg text-white rounded-xl text-xs font-semibold hover:shadow-lg transition-all shrink-0">Search</button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/30 overflow-hidden">
              <div className="px-6 py-3 space-y-1">
                {links.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition-all ${pathname === link.href ? "bg-primary/10 text-primary" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{link.label}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
