"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/context/ToastContext"
import { EmptyCart } from "@/components/EmptyState"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const { addToast } = useToast()

  if (cart.length === 0) return <div className="pt-32 pb-24"><div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24"><EmptyCart /></div></div>

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-12">
          <div><h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">Your <span className="gradient-text">Cart</span></h1><p className="text-sm text-gray-400 mt-2">{cart.length} {cart.length === 1 ? "book" : "books"}</p></div>
          <button onClick={() => { clearCart(); addToast("Cart cleared") }} className="text-xs font-semibold text-red-400 hover:text-red-500 transition-colors">Clear All</button>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 hover:shadow-md transition-shadow group">
                <Link href={`/book/${item.id}`} className="w-24 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/40">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain p-3" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/book/${item.id}`}><h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 hover:text-primary transition-colors line-clamp-1">{item.title}</h3></Link>
                  <p className="text-[11px] text-gray-400 mt-1">{item.author} · {item.subject}</p>
                  <div className="flex items-center gap-2 mt-2"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.condition === "Mint" ? "text-[#00f0ff] bg-[#00f0ff]/10" : item.condition === "Good" ? "text-[#10b981] bg-[#10b981]/10" : item.condition === "Annotated" ? "text-[#8b5cf6] bg-[#8b5cf6]/10" : "text-[#f59e0b] bg-[#f59e0b]/10"}`}>{item.condition}</span></div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-3"><button onClick={() => { if (item.quantity <= 1) { removeFromCart(item.id); addToast("Removed from cart") } else updateQuantity(item.id, item.quantity - 1) }} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary transition-all"><Minus className="w-3 h-3" /></button><span className="text-sm font-bold text-gray-800 dark:text-gray-200 w-5 text-center">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary transition-all"><Plus className="w-3 h-3" /></button></div>
                    <div className="flex items-center gap-3"><span className="text-lg font-black text-primary">₹{item.price * item.quantity}</span><button onClick={() => { removeFromCart(item.id); addToast("Removed from cart") }} className="text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/40 sticky top-32">
              <h3 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Subtotal</span><span className="font-semibold text-gray-800 dark:text-gray-200">₹{totalPrice}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Shipping</span><span className="text-xs font-medium text-primary">Free</span></div>
                <div className="border-t border-gray-100 dark:border-gray-700/30 pt-3 flex justify-between"><span className="font-bold text-gray-800 dark:text-gray-100">Total</span><span className="font-black text-lg text-primary">₹{totalPrice}</span></div>
              </div>
              <button className="w-full py-3.5 gradient-bg text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"><ShoppingBag className="w-4 h-4" /> Proceed to Checkout</button>
              <Link href="/shop" className="block text-center mt-4 text-xs font-semibold text-gray-400 hover:text-primary transition-colors">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
