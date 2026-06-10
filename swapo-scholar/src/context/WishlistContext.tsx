"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Book } from "@/data/books"

interface WishlistContextType { wishlist: Book[]; toggleWishlist: (book: Book) => void; isWishlisted: (id: number) => boolean; removeFromWishlist: (id: number) => void }

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Book[]>(() => { try { const s = localStorage.getItem("ss-wishlist"); return s ? JSON.parse(s) : [] } catch { return [] } })
  useEffect(() => { localStorage.setItem("ss-wishlist", JSON.stringify(wishlist)) }, [wishlist])
  const toggleWishlist = (book: Book) => setWishlist(prev => prev.find(i => i.id === book.id) ? prev.filter(i => i.id !== book.id) : [...prev, book])
  const isWishlisted = (id: number) => wishlist.some(i => i.id === id)
  const removeFromWishlist = (id: number) => setWishlist(prev => prev.filter(i => i.id !== id))
  return <WishlistContext value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist }}>{children}</WishlistContext>
}

export const useWishlist = () => useContext(WishlistContext)
