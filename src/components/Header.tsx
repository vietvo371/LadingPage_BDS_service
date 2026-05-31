'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const NAV = [
  ['#tong-quan',  'Tổng Quan'],
  ['#tien-ich',   'Tiện Ích'],
  ['#du-an',      'Dự Án'],
  ['#khu-vuc',    'Khám Phá Khu Vực'],
  ['#lien-he',    'Liên Hệ Tư Vấn'],
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 h-[60px] transition-all duration-300
      bg-white border-b border-[#e5e5e5]
      ${scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)]' : 'shadow-none'}`}>
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="/images/logo/logo-coastal-clean.png"
            alt="Coastal Quảng Ngãi"
            width={140}
            height={44}
            className="h-[44px] w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(([href, label]) => (
            <a key={href} href={href}
              className="text-[13px] text-[#555] hover:text-[#e06f46] transition-colors font-medium whitespace-nowrap">
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a href="#lien-he"
            className="hidden md:inline-flex bg-[#e06f46] hover:bg-[#c45a33] text-white
              px-5 py-2 text-[13px] font-semibold rounded transition-colors whitespace-nowrap">
            Tư Vấn Chi Tiết
          </a>
          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-1">
            <svg className="w-5 h-5 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#e5e5e5] px-5 py-4 flex flex-col gap-4">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="text-[14px] text-[#333] hover:text-[#e06f46] font-medium py-1">
              {label}
            </a>
          ))}
          <a href="#lien-he" onClick={() => setOpen(false)}
            className="bg-[#e06f46] text-white text-center py-2.5 text-[13px] font-semibold rounded mt-1">
            Tư Vấn Chi Tiết
          </a>
        </div>
      )}
    </header>
  )
}
