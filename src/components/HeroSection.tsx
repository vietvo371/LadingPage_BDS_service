import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-bleed aerial photo */}
      <Image
        src="/images/ngoai-that/phoi-canh-tong-the.jpg"
        alt="Coastal Quảng Ngãi — Phối cảnh tổng thể"
        fill
        priority
        quality={95}
        className="object-cover object-center"
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e12]/92 via-[#0b0e12]/35 to-[#0b0e12]/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e12]/65 via-[#0b0e12]/10 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-24 pt-48">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-7">
            <div className="w-14 h-px bg-[#c9a870]" />
            <p className="text-[#c9a870] text-[10px] tracking-[6px] uppercase font-sans">
              Khu Đô Thị Nghỉ Dưỡng · Quảng Ngãi
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold leading-[1.04] mb-6 text-white">
            <span className="block text-6xl md:text-7xl lg:text-8xl tracking-tight">COASTAL</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl text-[#c9a870] italic tracking-tight">
              Quảng Ngãi
            </span>
          </h1>

          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-sans font-light">
            Nơi làn gió biển miền Trung gặp gỡ kiến trúc đẳng cấp quốc tế —
            một chốn an cư, nghỉ dưỡng và đầu tư lý tưởng cho thế hệ tinh hoa.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href="#lien-he"
              className="bg-[#c9a870] text-[#0b0e12] px-8 py-4 text-[11px] font-bold tracking-[3px] uppercase
                hover:bg-[#dfc090] transition-colors duration-300 shadow-[0_0_40px_rgba(201,168,112,0.3)]"
            >
              Đăng Ký Nhận Thông Tin
            </a>
            <a
              href="#mat-bang"
              className="border border-white/30 text-white px-8 py-4 text-[11px] font-semibold tracking-[3px] uppercase
                hover:border-[#c9a870] hover:text-[#c9a870] transition-all duration-300"
            >
              Xem Mặt Bằng
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-white/10">
            {[
              { val: '8',       lbl: 'Phân Khu Sản Phẩm' },
              { val: '5',       lbl: 'Đối Tác Quốc Tế'   },
              { val: 'Ven Biển',lbl: 'Vị Trí Đắc Địa'    },
              { val: '2026',    lbl: 'Mở Bán Giai Đoạn 1' },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <div className="font-serif text-2xl md:text-3xl font-bold text-[#c9a870]">{val}</div>
                <div className="text-white/35 text-[10px] mt-1 font-sans tracking-[2px] uppercase">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3 text-white/20">
        <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        <span className="text-[9px] tracking-[4px] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
      </div>

      {/* Badge bottom-left */}
      <div className="absolute bottom-8 left-6 md:left-10 hidden md:flex items-center gap-2 text-white/25">
        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a870] animate-pulse" />
        <span className="text-[9px] tracking-[3px] uppercase font-sans">Quảng Ngãi · Việt Nam</span>
      </div>
    </section>
  )
}
