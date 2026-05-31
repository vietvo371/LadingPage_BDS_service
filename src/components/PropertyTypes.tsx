'use client'
import { useState } from 'react'
import Image from 'next/image'

const TYPES = [
  {
    id:     'dinh-thu-tri-lieu',
    label:  'Dinh Thự Trị Liệu',
    tag:    '8 căn',
    folder: 'dinh-thu-tri-lieu',
    start:  1, count: 8,
    specs:  { 'Diện Tích Lô': '380 – 558 m²', 'Tổng DT Xây Dựng': '400 m²', 'Số Tầng': '2 tầng', 'Chiều Cao': '7.5 m' },
    desc:   'Không gian nghỉ dưỡng trị liệu cao cấp, tích hợp tiện ích spa & wellness, hướng tới lối sống cân bằng toàn diện.',
  },
  {
    id:     'biet-thu-bien-don-lap',
    label:  'Biệt Thự Biển Đơn Lập',
    tag:    'Hạn chế',
    folder: 'biet-thu-bien-don-lap',
    start:  1, count: 8,
    specs:  { 'Diện Tích Lô': '300 – 450 m²', 'Tổng DT Xây Dựng': '350 m²', 'Số Tầng': '3 tầng', 'Chiều Cao': '10 m' },
    desc:   'Biệt thự đơn lập sát biển, riêng tư tuyệt đối. Tầm nhìn panorama ra biển Đông — báu vật hiếm của dự án.',
  },
  {
    id:     'biet-thu-bien-song-lap',
    label:  'Biệt Thự Biển Song Lập',
    tag:    'Phổ biến',
    folder: 'biet-thu-bien-song-lap',
    start:  1, count: 8,
    specs:  { 'Diện Tích Lô': '200 – 320 m²', 'Tổng DT Xây Dựng': '280 m²', 'Số Tầng': '3 tầng', 'Chiều Cao': '10 m' },
    desc:   'Biệt thự song lập view biển, thiết kế hiện đại kết hợp truyền thống, phù hợp gia đình nhiều thế hệ.',
  },
  {
    id:     'nha-cong-vien',
    label:  'Nhà Công Viên',
    tag:    'Đáng sống',
    folder: 'nha-cong-vien',
    start:  1, count: 8,
    specs:  { 'Diện Tích Lô': '150 – 220 m²', 'Tổng DT Xây Dựng': '190 m²', 'Số Tầng': '3 tầng', 'Chiều Cao': '9.5 m' },
    desc:   'Nhà phố cao cấp tiếp giáp công viên xanh nội khu, không khí trong lành, lý tưởng cho gia đình trẻ.',
  },
  {
    id:     'nha-quang-truong',
    label:  'Nhà Quảng Trường',
    tag:    'Thương mại',
    folder: 'nha-quang-truong',
    start:  1, count: 7,
    specs:  { 'Diện Tích Lô': '120 – 180 m²', 'Tổng DT Xây Dựng': '160 m²', 'Số Tầng': '4 tầng', 'Chiều Cao': '13 m' },
    desc:   'Shophouse mặt tiền quảng trường trung tâm — vị trí kinh doanh đắt giá, kết hợp an cư và thương mại.',
  },
  {
    id:     'nha-dai-lo',
    label:  'Nhà Đại Lộ',
    tag:    'Shophouse',
    folder: 'nha-dai-lo',
    start:  1, count: 6,
    specs:  { 'Diện Tích Lô': '100 – 160 m²', 'Tổng DT Xây Dựng': '145 m²', 'Số Tầng': '4 tầng', 'Chiều Cao': '13 m' },
    desc:   'Shophouse đại lộ chính — mặt tiền rộng, vị trí thương mại hàng đầu, khai thác kinh doanh tối ưu.',
  },
  {
    id:     'nha-ven-song',
    label:  'Nhà Ven Sông',
    tag:    'Lãng mạn',
    folder: 'nha-ven-song',
    start:  1, count: 7,
    specs:  { 'Diện Tích Lô': '160 – 240 m²', 'Tổng DT Xây Dựng': '200 m²', 'Số Tầng': '3 tầng', 'Chiều Cao': '9.5 m' },
    desc:   'Nhà phố view sông thơ mộng, không gian sống lãng mạn bên dòng nước xanh trong của sông Trà Khúc.',
  },
  {
    id:     'nha-vuon',
    label:  'Nhà Vườn',
    tag:    'Thiên nhiên',
    folder: 'nha-vuon',
    start:  3, count: 5,
    specs:  { 'Diện Tích Lô': '220 – 380 m²', 'Tổng DT Xây Dựng': '230 m²', 'Số Tầng': '2 tầng', 'Chiều Cao': '7.5 m' },
    desc:   'Biệt thự nhà vườn rộng rãi, thiên nhiên chan hòa, sân vườn riêng tư — lý tưởng cho nghỉ dưỡng cuối tuần.',
  },
]

export default function PropertyTypes() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeImg, setActiveImg] = useState(0)

  const active = TYPES[activeTab]

  const images = Array.from({ length: active.count }, (_, i) => {
    const n = active.start + i
    return `/images/mau-nha/${active.folder}/${active.folder}-${String(n).padStart(2, '0')}.png`
  })

  const handleTab = (i: number) => {
    setActiveTab(i)
    setActiveImg(0)
  }

  return (
    <section id="mat-bang" className="py-28 bg-[#f0ebe0]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-px bg-[#c9a870]" />
          <span className="text-[#c9a870] text-[10px] tracking-[5px] uppercase font-sans">Phân Khu & Mặt Bằng</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1715] leading-[1.1]">
            8 Loại Sản Phẩm<br />
            <span className="text-[#c9a870]">Đẳng Cấp</span>
          </h2>
          <p className="text-[#9c9187] text-sm font-sans max-w-xs leading-relaxed">
            Mỗi phân khu mang phong cách kiến trúc riêng biệt, phù hợp với từng nhu cầu và gu thẩm mỹ.
          </p>
        </div>

        {/* Tab nav — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-6 px-6 mb-10">
          <div className="flex gap-2 min-w-max pb-1">
            {TYPES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleTab(i)}
                className={`px-5 py-2.5 text-[10px] font-bold tracking-[2px] uppercase transition-all duration-200 whitespace-nowrap
                  ${activeTab === i
                    ? 'bg-[#c9a870] text-[#0b0e12]'
                    : 'bg-white border border-[#e2d9cc] text-[#6b6459] hover:border-[#c9a870] hover:text-[#c9a870]'
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">

          {/* Left — gallery */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#e2d9cc]">
              <Image
                key={`${activeTab}-${activeImg}`}
                src={images[activeImg]}
                alt={`${active.label} — ${activeImg + 1}`}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-[#0b0e12]/75 text-white/80 text-[10px] px-3 py-1.5 font-sans tracking-[2px]">
                {String(activeImg + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
              {/* Tag */}
              <div className="absolute top-4 left-4 bg-[#c9a870] text-[#0b0e12] text-[9px] font-bold tracking-[2px] uppercase px-3 py-1.5">
                {active.tag}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-square overflow-hidden transition-all duration-200
                    ${activeImg === i
                      ? 'ring-2 ring-[#c9a870] ring-offset-1 ring-offset-[#f0ebe0]'
                      : 'opacity-50 hover:opacity-80'
                    }`}
                >
                  <Image src={src} alt={`thumb-${i}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setActiveImg(p => (p - 1 + images.length) % images.length)}
                className="w-10 h-10 border border-[#e2d9cc] hover:border-[#c9a870] text-[#6b6459] hover:text-[#c9a870] transition-colors flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={() => setActiveImg(p => (p + 1) % images.length)}
                className="w-10 h-10 border border-[#e2d9cc] hover:border-[#c9a870] text-[#6b6459] hover:text-[#c9a870] transition-colors flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>

          {/* Right — specs panel */}
          <div className="flex flex-col justify-between gap-8 bg-white border border-[#e2d9cc] p-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-[#c9a870]" />
                <span className="text-[#c9a870] text-[9px] tracking-[4px] uppercase font-sans">{active.tag}</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1715] mb-4 leading-snug">
                {active.label}
              </h3>

              <p className="text-[#6b6459] text-sm font-sans leading-relaxed mb-8">
                {active.desc}
              </p>

              {/* Specs */}
              <div className="space-y-0">
                <div className="text-[9px] tracking-[3px] uppercase text-[#9c9187] font-sans mb-3">Thông Số Kỹ Thuật</div>
                <div className="divide-y divide-[#f0ebe0]">
                  {Object.entries(active.specs).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-3.5">
                      <span className="text-[#9c9187] text-xs font-sans">{key}</span>
                      <span className="font-serif text-base font-semibold text-[#1a1715]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#lien-he"
              className="flex items-center justify-center gap-2 bg-[#0b0e12] text-white py-4
                text-[10px] font-bold tracking-[3px] uppercase
                hover:bg-[#c9a870] hover:text-[#0b0e12] transition-all duration-300 group"
            >
              Tư Vấn Phân Khu Này
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
