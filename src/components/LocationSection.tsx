export default function LocationSection() {
  return (
    <section id="vi-tri" className="py-28 bg-[#0b0e12]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-px bg-[#c9a870]" />
          <span className="text-[#c9a870] text-[10px] tracking-[5px] uppercase font-sans">Vị Trí Chiến Lược</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — text */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.1] mb-8 text-white">
              Tọa Lạc Tại<br />
              <span className="text-[#c9a870]">Vùng Đất Vàng</span><br />
              Duyên Hải Miền Trung
            </h2>

            <p className="text-white/50 leading-relaxed mb-10 font-sans text-[15px]">
              Quảng Ngãi hội tụ đủ yếu tố lý tưởng: bờ biển dài trong xanh, núi non hùng vĩ,
              sông ngòi thơ mộng và khí hậu trong lành bốn mùa. Coastal Quảng Ngãi khai thác
              tối đa địa thế tự nhiên để kiến tạo không gian sống độc nhất vô nhị.
            </p>

            {/* Distance list */}
            <div className="space-y-0">
              {[
                { icon: '✈', label: 'Sân Bay Chu Lai',             time: '15 phút'           },
                { icon: '🏖', label: 'Bờ Biển Mỹ Khê Quảng Ngãi', time: 'Tiếp giáp'         },
                { icon: '🏙', label: 'Trung tâm TP. Quảng Ngãi',   time: '10 phút'           },
                { icon: '🛣', label: 'Cao tốc Đà Nẵng – Quảng Ngãi','time': 'Kết nối trực tiếp'},
                { icon: '🌊', label: 'Đà Nẵng',                     time: '1 giờ 30 phút'    },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-5 border-b border-white/[0.07]
                    hover:bg-white/[0.02] transition-colors px-2 -mx-2 cursor-default group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg w-7 text-center opacity-70">{item.icon}</span>
                    <span className="text-white/60 text-sm font-sans group-hover:text-white/80 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[#c9a870] text-sm font-semibold font-sans tracking-wide">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — map placeholder with decorative design */}
          <div className="relative h-[460px] lg:h-[540px] bg-[#14181e] border border-white/[0.07] overflow-hidden">
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(201,168,112,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,112,1) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* Decorative compass */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 rounded-full border border-[#c9a870]/20 flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-full border border-[#c9a870]/10 flex items-center justify-center">
                  <div className="text-3xl">📍</div>
                </div>
                {/* Compass ticks */}
                {['N', 'E', 'S', 'W'].map((dir, i) => (
                  <span
                    key={dir}
                    className="absolute text-[9px] text-[#c9a870]/40 font-sans tracking-widest"
                    style={{
                      top:    i === 0 ? '-18px' : i === 2 ? 'calc(100% + 4px)' : '50%',
                      left:   i === 3 ? '-18px' : i === 1 ? 'calc(100% + 4px)' : '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {dir}
                  </span>
                ))}
              </div>
              <div className="text-center">
                <p className="text-white/25 text-sm font-sans tracking-[3px] uppercase">Quảng Ngãi</p>
                <p className="text-white/15 text-xs font-sans mt-1">Duyên Hải Miền Trung · Việt Nam</p>
              </div>
              <p className="text-[#c9a870]/40 text-[10px] font-sans tracking-[2px] uppercase mt-4">
                Bản đồ chi tiết cập nhật sớm
              </p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#c9a870]/30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#c9a870]/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#c9a870]/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#c9a870]/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
