import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Swapo Scholar - Student Book Marketplace",
  description: "Don't let great books gather dust. India's student-to-student book marketplace for JEE, NEET, and CBSE preparation.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-gray-100 antialiased transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
