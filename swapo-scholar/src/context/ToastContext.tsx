"use client"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { CheckCircle, XCircle, Info, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Toast { id: number; message: string; type: string }
interface ToastContextType { addToast: (message: string, type?: string) => void }

const ToastContext = createContext<ToastContextType>({} as ToastContextType)

const icons: Record<string, React.ReactNode> = { success: <CheckCircle className="w-5 h-5 text-[#10b981]" />, error: <XCircle className="w-5 h-5 text-[#ef4444]" />, info: <Info className="w-5 h-5 text-[#00f0ff]" /> }
const borders: Record<string, string> = { success: "border-[#10b981]/30", error: "border-[#ef4444]/30", info: "border-[#00f0ff]/30" }
const glows: Record<string, string> = { success: "shadow-[0_0_20px_rgba(16,185,129,0.15)]", error: "shadow-[0_0_20px_rgba(239,68,68,0.15)]", info: "shadow-[0_0_20px_rgba(0,240,255,0.15)]" }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const addToast = useCallback((message: string, type = "success") => { const id = Date.now(); setToasts(prev => [...prev, { id, message, type }]); setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500) }, [])
  return (
    <ToastContext value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div key={t.id} initial={{ opacity: 0, x: 100, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 100, scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
              className={`pointer-events-auto relative flex items-center gap-3 px-5 py-3.5 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-[#18181b]/90 border ${borders[t.type] || borders.info} ${glows[t.type] || glows.info} cursor-pointer overflow-hidden`}>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${t.type === "success" ? "from-[#10b981]/5" : t.type === "error" ? "from-[#ef4444]/5" : "from-[#00f0ff]/5"} to-transparent`} />
              <div className="relative shrink-0">{icons[t.type] || icons.info}</div>
              <span className="relative text-sm font-medium text-gray-800 dark:text-gray-100 flex-1">{t.message}</span>
              <X className="relative w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0 transition-colors" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext>
  )
}

export const useToast = () => useContext(ToastContext)
