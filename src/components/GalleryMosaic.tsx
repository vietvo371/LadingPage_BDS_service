'use client'
import { useState } from 'react'
import Image from 'next/image'
import GalleryModal from './GalleryModal'

// Dùng ảnh render đẹp (02, 03) thay spec sheet (01)
const MOSAIC_GRID = [
  { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-03.png', alt: 'Dinh Thự — hồ bơi view sông' },
  { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-02.png', alt: 'Biệt Thự Song Lập' },
  { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-03.png', alt: 'Nhà Công Viên' },
  { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-02.png', alt: 'Nhà Quảng Trường' },
]

export default function GalleryMosaic() {
  const [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <>
      {/* ── Mosaic Gallery — JamesEdition layout ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(320px, 55vw, 620px)' }}
      >
        <div className="flex h-full gap-[3px]">

          {/* Big image LEFT ~58% */}
          <div
            className="relative cursor-pointer group overflow-hidden"
            style={{ flex: '58 0 0%' }}
            onClick={() => setGalleryOpen(true)}
          >
            <Image
              src="/images/ngoai-that/phoi-canh-tong-the.jpg"
              alt="Coastal Quảng Ngãi — Phối cảnh tổng thể"
              fill priority quality={92}
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="58vw"
            />
            {/* Bottom gradient + label */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 pointer-events-none">
              <p className="text-white/60 text-[10px] tracking-[4px] uppercase mb-1.5 font-medium">Khu Đô Thị Nghỉ Dưỡng</p>
              <p className="text-white font-bold text-2xl leading-tight drop-shadow-sm">Coastal Quảng Ngãi</p>
              <p className="text-white/55 text-[13px] mt-1">Xã Tư Nghĩa · Quảng Ngãi</p>
            </div>
          </div>

          {/* 2 × 2 grid RIGHT ~42% */}
          <div className="grid grid-cols-2 gap-[3px]" style={{ flex: '42 0 0%' }}>
            {MOSAIC_GRID.map((img, i) => (
              <div
                key={img.src}
                className="relative overflow-hidden cursor-pointer group bg-[#f0f0f0]"
                onClick={() => setGalleryOpen(true)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-500"
                  sizes="21vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* "Xem tất cả" button — JamesEdition style, absolute bottom-right */}
        <button
          onClick={() => setGalleryOpen(true)}
          className="absolute bottom-5 right-5 flex items-center gap-2 bg-white hover:bg-[#f9f9f9]
            border border-[#ddd] hover:border-[#bbb]
            text-[#1a1a1a] text-[13px] font-semibold px-4 py-2.5 rounded-lg
            shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
            transition-all duration-200 z-10"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="#1a1a1a"/>
            <rect x="10" y="1" width="5" height="5" rx="1" fill="#1a1a1a"/>
            <rect x="1" y="10" width="5" height="5" rx="1" fill="#1a1a1a"/>
            <rect x="10" y="10" width="5" height="5" rx="1" fill="#1a1a1a"/>
          </svg>
          Xem tất cả hình ảnh
        </button>
      </div>

      {/* Professional Gallery Modal */}
      <GalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  )
}
