import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-400 pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:rotate-12">S</div>
              <span className="font-bold text-xl text-white tracking-tight">Swapo<span className="text-primary">Scholar</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">India's student-to-student book marketplace. Sell your old books, help a junior, and build a stronger academic community.</p>
          </div>
          {[
            { title: "Explore", links: [{ href: "/shop", label: "Browse Books" }, { href: "/sell", label: "Sell Books" }, { href: "/guidance", label: "Senior Guidance" }] },
            { title: "Company", links: [{ href: "/about", label: "About Us" }, { href: "/contact", label: "Contact" }, { href: "/contact", label: "FAQ" }] },
            { title: "Community", links: [{ href: "/guidance", label: "Student Stories" }, { href: "/shop", label: "Top Books" }, { href: "/about", label: "How It Works" }] },
          ].map(section => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((link, i) => <Link key={i} href={link.href} className="block text-sm text-gray-500 hover:text-primary transition-colors duration-200">{link.label}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">© 2025 Swapo Scholar. Made with ❤️ for students, by students.</p>
          <div className="flex justify-center gap-8">{[ "Privacy", "Terms", "Cookies" ].map(item => <span key={item} className="text-sm text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">{item}</span>)}</div>
        </div>
      </div>
    </footer>
  )
}
