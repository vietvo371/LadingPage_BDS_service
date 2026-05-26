'use client'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#0d0b08]/90 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
        : 'bg-[#0d0b08]/65 backdrop-blur-md'
    }`}>
      {/* Gold accent line on top */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#b8922a] via-[#f0c84a] to-[#b8922a]" />

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="font-serif text-2xl font-bold tracking-widest">
          <span className="text-white">COASTAL</span>
          <span className="text-[#f0c84a]"> QN</span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            ['#templates',  'Kho Mẫu'],
            ['#referral',   'Chương Trình 100k'],
            ['#contact',    'Liên Hệ'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="relative text-sm font-semibold text-white/80 hover:text-[#f0c84a] transition-colors tracking-wide
                after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f0c84a]
                after:transition-all after:duration-300 hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-[#b8922a] hover:bg-[#f0c84a] text-white hover:text-[#1c1916]
            px-6 py-2.5 text-sm font-bold rounded-sm tracking-wide transition-all duration-300
            shadow-[0_0_20px_rgba(184,146,42,0.4)] hover:shadow-[0_0_28px_rgba(240,200,74,0.6)]"
        >
          Tải Bảng Giá
        </a>
      </div>
    </header>
  )
}
