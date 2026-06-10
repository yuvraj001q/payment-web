"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ThemeContextType { dark: boolean; toggleTheme: () => void }

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false)
  useEffect(() => { const d = localStorage.getItem("ss-theme") === "dark" || (!localStorage.getItem("ss-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches); setDark(d); document.documentElement.classList.toggle("dark", d) }, [])
  const toggleTheme = () => setDark(prev => { const n = !prev; localStorage.setItem("ss-theme", n ? "dark" : "light"); document.documentElement.classList.toggle("dark", n); return n })
  return <ThemeContext value={{ dark, toggleTheme }}>{children}</ThemeContext>
}

export const useTheme = () => useContext(ThemeContext)
