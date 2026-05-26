'use client'

export default function HeroCinematic() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-screen background photo — minimal overlay so image shows */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/resort.png)' }}
      />
      {/* Subtle gradient only at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/85 via-[#0d0b09]/30 to-transparent" />
      {/* Very light vignette left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09]/60 via-transparent to-transparent" />

      {/* Content anchored bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-[#d4a83a] text-xs tracking-[5px] uppercase font-sans mb-5">
            Bàn giao trong 24 giờ · Chuẩn Mobile
          </p>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.08] mb-6 text-white">
            Landing Page BĐS<br />
            <span className="text-[#d4a83a]">Đẳng Cấp</span> — Chỉ 1 Triệu
          </h1>

          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-sans">
            Giải pháp tối ưu dành riêng cho môi giới dự án Coastal Quảng Ngãi.
            Tăng tính chuyên nghiệp, tối ưu ads và hứng trọn khách hàng tiềm năng.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a href="#templates"
              className="bg-[#b8922a] text-white px-8 py-3.5 text-sm font-semibold rounded-sm hover:bg-[#d4a83a] transition-colors shadow-lg">
              Xem 3 Mẫu Thiết Kế →
            </a>
            <a href="#contact"
              className="border border-white/40 text-white px-8 py-3.5 text-sm font-semibold rounded-sm hover:bg-white/10 transition-colors">
              Tư Vấn Miễn Phí
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-10 pt-8 border-t border-white/15">
            {[['3','Mẫu Độc Quyền'],['24h','Bàn Giao'],['99%','Chuẩn Mobile'],['< 2s','Tốc Độ Load']].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="font-serif text-3xl font-bold text-[#d4a83a]">{val}</div>
                <div className="text-white/50 text-xs mt-1 font-sans">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 text-white/30">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
        <span className="text-[10px] tracking-widest uppercase rotate-90 origin-center translate-y-4">Scroll</span>
      </div>
    </section>
  )
}
