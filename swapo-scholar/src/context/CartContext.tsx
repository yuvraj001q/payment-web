"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Book } from "@/data/books"

interface CartItem extends Book { quantity: number }
interface CartContextType { cart: CartItem[]; addToCart: (book: Book) => void; removeFromCart: (id: number) => void; updateQuantity: (id: number, qty: number) => void; clearCart: () => void; totalItems: number; totalPrice: number }

const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => { try { const s = localStorage.getItem("ss-cart"); return s ? JSON.parse(s) : [] } catch { return [] } })
  useEffect(() => { localStorage.setItem("ss-cart", JSON.stringify(cart)) }, [cart])
  const addToCart = (book: Book) => setCart(prev => { const ex = prev.find(i => i.id === book.id); return ex ? prev.map(i => i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...book, quantity: 1 }] })
  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id))
  const updateQuantity = (id: number, qty: number) => qty <= 0 ? removeFromCart(id) : setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  const clearCart = () => setCart([])
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  return <CartContext value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>{children}</CartContext>
}

export const useCart = () => useContext(CartContext)
