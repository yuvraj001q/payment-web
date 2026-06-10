"use client"
import { ThemeProvider } from "@/context/ThemeContext"
import { CartProvider } from "@/context/CartContext"
import { WishlistProvider } from "@/context/WishlistContext"
import { ToastProvider } from "@/context/ToastContext"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>{children}</ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
