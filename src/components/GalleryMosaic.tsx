'use client'
import { useState, useEffect } from 'react'
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
  const [liked,   setLiked]   = useState(false)
  const [likes,   setLikes]   = useState(87)
  const [copied,  setCopied]  = useState(false)
  const [bounce,  setBounce]  = useState(false)

  useEffect(() => {
    const isLiked    = localStorage.getItem('coastal_liked') === '1'
    const storedLikes = parseInt(localStorage.getItem('coastal_likes') || '87')
    setLiked(isLiked)
    setLikes(storedLikes)
  }, [])

  const handleLike = () => {
    const next = liked ? likes - 1 : likes + 1
    setLiked(!liked)
    setLikes(next)
    if (!liked) { setBounce(true); setTimeout(() => setBounce(false), 600) }
    localStorage.setItem('coastal_liked', liked ? '0' : '1')
    localStorage.setItem('coastal_likes', String(next))
  }

  const handleShare = async () => {
    const url  = window.location.href
    const data = { title: 'Coastal Quảng Ngãi — Khu Đô Thị Nghỉ Dưỡng', url }
    if (navigator.share) { try { await navigator.share(data) } catch {} }
    else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

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

        {/* ── Share + Like buttons — top-right overlay ── */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white backdrop-blur-sm
              text-[#1a1a1a] text-[12px] font-semibold px-3.5 py-2 rounded-full
              shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-all border border-white/60"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
            </svg>
            {copied ? 'Đã sao chép!' : 'Chia sẻ'}
          </button>

          {/* Like / Save */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 backdrop-blur-sm
              text-[12px] font-semibold px-3.5 py-2 rounded-full transition-all
              shadow-[0_2px_10px_rgba(0,0,0,0.12)] border
              ${liked
                ? 'bg-[#fdf0eb] text-[#e06f46] border-[#e06f46]/30'
                : 'bg-white/90 hover:bg-white text-[#1a1a1a] border-white/60'}`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-all duration-300 ${bounce ? 'scale-150' : 'scale-100'}
                ${liked ? 'fill-[#e06f46] stroke-[#e06f46]' : 'fill-none stroke-current'}`}
              viewBox="0 0 24 24" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            {likes} Lưu
          </button>
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
