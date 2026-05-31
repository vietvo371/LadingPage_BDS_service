import Image from 'next/image'

const PARTNERS = [
  { src: '/images/logo-doi-tac/logo-sweco.jpg',         alt: 'SWECO',         role: 'Quy Hoạch Tổng Thể'   },
  { src: '/images/logo-doi-tac/logo-shms.png',          alt: 'SHMS',          role: 'Quản Lý Nghỉ Dưỡng'   },
  { src: '/images/logo-doi-tac/logo-gioforma.png',      alt: 'GioForma',      role: 'Kiến Trúc & Thiết Kế' },
  { src: '/images/logo-doi-tac/logo-djcoalition.webp',  alt: 'DJC Coalition', role: 'Phát Triển Đầu Tư'    },
  { src: '/images/logo-doi-tac/logo-100architects.jpg', alt: '100architects', role: 'Kiến Trúc Cảnh Quan'  },
]

const DOUBLED = [...PARTNERS, ...PARTNERS]

export default function PartnersStrip() {
  return (
    <section className="border-t border-[#ebebeb] bg-white py-12 overflow-hidden">
      {/* Label */}
      <div className="max-w-[1320px] mx-auto px-8 mb-10 text-center">
        <p className="text-[10px] text-[#bbb] tracking-[5px] uppercase font-medium">
          Được Bảo Chứng Bởi
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-20 marquee-track" style={{ width: 'max-content' }}>
          {DOUBLED.map((p, i) => (
            <div key={`${p.alt}-${i}`} className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-default">
              {/* Logo */}
              <div className="relative h-9 w-36">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-contain opacity-85 hover:opacity-100 transition-opacity duration-300"
                  sizes="144px"
                />
              </div>
              {/* Role label */}
              <span className="text-[9px] text-[#d0d0d0] tracking-[2.5px] uppercase group-hover:text-[#e06f46] transition-colors duration-300 whitespace-nowrap font-medium">
                {p.role}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
