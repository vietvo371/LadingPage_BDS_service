import Image from 'next/image'

const PARTNERS = [
  { src: '/images/logo-doi-tac/logo-sweco.jpg',        alt: 'SWECO',         role: 'Quy Hoạch Tổng Thể'   },
  { src: '/images/logo-doi-tac/logo-gioforma.png',     alt: 'GioForma',      role: 'Kiến Trúc & Thiết Kế' },
  { src: '/images/logo-doi-tac/logo-100architects.jpg', alt: '100architects', role: 'Kiến Trúc Cảnh Quan'  },
  { src: '/images/logo-doi-tac/logo-shms.png',         alt: 'SHMS',          role: 'Quản Lý Nghỉ Dưỡng'  },
  { src: '/images/logo-doi-tac/logo-djcoalition.webp', alt: 'DJC Coalition', role: 'Phát Triển Đầu Tư'    },
]

export default function PartnersSection() {
  return (
    <section id="doi-tac" className="py-28 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-px bg-[#c9a870]" />
          <span className="text-[#c9a870] text-[10px] tracking-[5px] uppercase font-sans">Đối Tác Chiến Lược</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1715] leading-[1.1]">
            Được Bảo Chứng Bởi<br />
            <span className="text-[#c9a870]">Danh Tiếng Quốc Tế</span>
          </h2>
          <p className="text-[#9c9187] text-sm font-sans max-w-xs leading-relaxed">
            Coastal Quảng Ngãi được phát triển cùng các đơn vị tư vấn, thiết kế và quản lý
            uy tín hàng đầu thế giới.
          </p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#e2d9cc]">
          {PARTNERS.map(p => (
            <div
              key={p.alt}
              className="bg-[#faf8f4] flex flex-col items-center justify-center gap-5 p-10 py-12
                hover:bg-[#f0ebe0] transition-colors duration-300 group cursor-default"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100"
                  sizes="200px"
                />
              </div>
              <div className="text-center">
                <div className="text-[#1a1715] text-xs font-semibold font-sans mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.alt}
                </div>
                <div className="text-[#9c9187] text-[9px] tracking-[2px] uppercase font-sans">{p.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider quote */}
        <div className="mt-20 text-center border-t border-[#e2d9cc] pt-16">
          <div className="w-8 h-px bg-[#c9a870] mx-auto mb-6" />
          <blockquote className="font-serif text-xl md:text-2xl text-[#1a1715] italic max-w-2xl mx-auto leading-relaxed">
            "Chúng tôi không chỉ xây những ngôi nhà —<br />
            chúng tôi kiến tạo những không gian sống đáng nhớ."
          </blockquote>
          <p className="text-[#9c9187] text-xs tracking-[3px] uppercase font-sans mt-5">
            Coastal Quảng Ngãi
          </p>
        </div>
      </div>
    </section>
  )
}
