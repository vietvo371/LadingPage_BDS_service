'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

// ── Photo catalogue — dùng ảnh render đẹp (02+) ──
const CATEGORIES = [
  {
    id: 'tong-the',
    label: 'Phối Cảnh Tổng Thể',
    count: 1,
    photos: [
      { src: '/images/ngoai-that/phoi-canh-tong-the.jpg', caption: 'Phối cảnh tổng thể Coastal Quảng Ngãi' },
    ],
  },
  {
    id: 'nha-vuon',
    label: 'Nhà Vườn',
    count: 4,
    photos: [
      { src: '/images/mau-nha/nha-vuon/nha-vuon-04.png', caption: 'Nhà Vườn — kiến trúc đặc trưng' },
      { src: '/images/mau-nha/nha-vuon/nha-vuon-05.png', caption: 'Nhà Vườn — không gian sống' },
      { src: '/images/mau-nha/nha-vuon/nha-vuon-06.png', caption: 'Nhà Vườn — vườn cây' },
      { src: '/images/mau-nha/nha-vuon/nha-vuon-07.png', caption: 'Nhà Vườn — góc nhìn tổng thể' },
    ],
  },
  {
    id: 'ven-song',
    label: 'Nhà Ven Sông',
    count: 5,
    photos: [
      { src: '/images/mau-nha/nha-ven-song/nha-ven-song-02.png', caption: 'Nhà Ven Sông — kiến trúc tạo trải nghiệm' },
      { src: '/images/mau-nha/nha-ven-song/nha-ven-song-03.png', caption: 'Nhà Ven Sông — view sông' },
      { src: '/images/mau-nha/nha-ven-song/nha-ven-song-04.png', caption: 'Nhà Ven Sông — không gian' },
      { src: '/images/mau-nha/nha-ven-song/nha-ven-song-05.png', caption: 'Nhà Ven Sông — mặt tiền' },
      { src: '/images/mau-nha/nha-ven-song/nha-ven-song-06.png', caption: 'Nhà Ven Sông — ban đêm' },
    ],
  },
  {
    id: 'dai-lo',
    label: 'Nhà Đại Lộ',
    count: 4,
    photos: [
      { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-02.png', caption: 'Nhà Đại Lộ — phố thương mại sầm uất' },
      { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-03.png', caption: 'Nhà Đại Lộ — mặt tiền' },
      { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-04.png', caption: 'Nhà Đại Lộ — kiến trúc' },
      { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-05.png', caption: 'Nhà Đại Lộ — góc phố' },
    ],
  },
  {
    id: 'quang-truong',
    label: 'Nhà Quảng Trường',
    count: 5,
    photos: [
      { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-02.png', caption: 'Nhà Quảng Trường — phố thương mại' },
      { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-03.png', caption: 'Nhà Quảng Trường — góc phố' },
      { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-04.png', caption: 'Nhà Quảng Trường — mặt tiền' },
      { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-05.png', caption: 'Nhà Quảng Trường — kiến trúc' },
      { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-06.png', caption: 'Nhà Quảng Trường — ban đêm' },
    ],
  },
  {
    id: 'cong-vien',
    label: 'Nhà Công Viên',
    count: 6,
    photos: [
      { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-03.png', caption: 'Nhà Công Viên — mặt tiền' },
      { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-02.png', caption: 'Nhà Công Viên — ngoại thất' },
      { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-04.png', caption: 'Nhà Công Viên — khu vườn' },
      { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-05.png', caption: 'Nhà Công Viên — không gian' },
      { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-06.png', caption: 'Nhà Công Viên — góc 2' },
      { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-07.png', caption: 'Nhà Công Viên — chi tiết' },
    ],
  },
  {
    id: 'biet-thu-song',
    label: 'Biệt Thự Song Lập',
    count: 6,
    photos: [
      { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-02.png', caption: 'Biệt Thự Song Lập — ngoại thất' },
      { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-03.png', caption: 'Biệt Thự Song Lập — khu vườn' },
      { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-04.png', caption: 'Biệt Thự Song Lập — không gian' },
      { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-05.png', caption: 'Biệt Thự Song Lập — góc 2' },
      { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-06.png', caption: 'Biệt Thự Song Lập — ban đêm' },
      { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-07.png', caption: 'Biệt Thự Song Lập — toàn cảnh' },
    ],
  },
  {
    id: 'biet-thu-don',
    label: 'Biệt Thự Đơn Lập',
    count: 6,
    photos: [
      { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-02.png', caption: 'Biệt Thự Biển Đơn Lập — ngoại thất' },
      { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-03.png', caption: 'Biệt Thự Đơn Lập — góc vườn' },
      { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-04.png', caption: 'Biệt Thự Đơn Lập — không gian' },
      { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-05.png', caption: 'Biệt Thự Đơn Lập — chi tiết' },
      { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-06.png', caption: 'Biệt Thự Đơn Lập — nội thất' },
      { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-07.png', caption: 'Biệt Thự Đơn Lập — toàn cảnh' },
    ],
  },
  {
    id: 'dinh-thu',
    label: 'Dinh Thự Trị Liệu',
    count: 6,
    photos: [
      { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-03.png', caption: 'Hồ bơi Dinh Thự — view sông' },
      { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-02.png', caption: 'Dinh Thự Trị Liệu — ngoại thất' },
      { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-04.png', caption: 'Dinh Thự — không gian sống' },
      { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-05.png', caption: 'Dinh Thự — chi tiết kiến trúc' },
      { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-06.png', caption: 'Dinh Thự — góc nhìn 2' },
      { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-07.png', caption: 'Dinh Thự — cảnh quan' },
    ],
  },
]

const ALL_PHOTOS = CATEGORIES.flatMap(c => c.photos)
const TOTAL = ALL_PHOTOS.length

type Props = {
  open: boolean
  onClose: () => void
  defaultCategory?: string
}

export default function GalleryModal({ open, onClose, defaultCategory = 'all' }: Props) {
  const [activeId,      setActiveId]      = useState(defaultCategory)
  const [lightbox,      setLightbox]      = useState<{ photos: typeof ALL_PHOTOS; idx: number } | null>(null)
  const [formSent,      setFormSent]      = useState(false)
  const [formData,      setFormData]      = useState({ name: '', phone: '', email: '', message: '' })
  const [galleryTab,    setGalleryTab]    = useState<'message'|'booking'>('message')

  // Drag scroll cho tab bar
  const tabRef   = useRef<HTMLDivElement>(null)
  const dragRef  = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    const el = tabRef.current; if (!el) return
    dragRef.current = { isDragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
    el.style.cursor = 'grabbing'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return
    e.preventDefault()
    const el = tabRef.current; if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - dragRef.current.startX) * 1.5
    el.scrollLeft = dragRef.current.scrollLeft - walk
  }
  const onMouseUp = () => {
    dragRef.current.isDragging = false
    if (tabRef.current) tabRef.current.style.cursor = 'grab'
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null)
        else onClose()
      }
      if (lightbox) {
        if (e.key === 'ArrowRight') setLightbox(l => l ? { ...l, idx: (l.idx + 1) % l.photos.length } : null)
        if (e.key === 'ArrowLeft')  setLightbox(l => l ? { ...l, idx: (l.idx - 1 + l.photos.length) % l.photos.length } : null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, onClose])

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Gallery lead:', formData)
    setFormSent(true)
  }

  if (!open) return null

  const displayCats = activeId === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === activeId)
  const photos      = activeId === 'all' ? ALL_PHOTOS : (CATEGORIES.find(c => c.id === activeId)?.photos ?? [])

  const openLightbox = (globalIdx: number) => {
    setLightbox({ photos, idx: globalIdx })
  }

  return (
    <div className="fixed inset-0 z-[200] flex">

      {/* ── GRID MODAL ── */}
      <div className="flex flex-col w-full h-full bg-white">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-[#f5f5f5] flex items-center justify-center transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </button>
            <div>
              <p className="font-semibold text-[15px] text-[#1a1a1a]">Tất cả hình ảnh</p>
              <p className="text-[12px] text-[#888]">{TOTAL} ảnh · Coastal Quảng Ngãi</p>
            </div>
          </div>

          {/* Category tabs — scrollable */}
          <div 
            ref={tabRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="hidden md:flex items-center gap-2 overflow-x-auto flex-1 mx-8 pb-2 cursor-grab select-none [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#ccc]"
          >
            <button
              onClick={() => setActiveId('all')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all flex-shrink-0
                ${activeId === 'all' ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#555] hover:bg-[#eee]'}`}
            >
              Tất Cả ({TOTAL})
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all flex-shrink-0
                  ${activeId === cat.id ? 'bg-[#e06f46] text-white' : 'bg-[#f5f5f5] text-[#555] hover:bg-[#eee]'}`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          <button onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#f5f5f5] flex items-center justify-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Mobile category tabs */}
        <div className="md:hidden overflow-x-auto no-scrollbar px-4 py-3 border-b border-[#e5e5e5] flex gap-2 flex-shrink-0 w-full">
          <button onClick={() => setActiveId('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap flex-shrink-0
              ${activeId === 'all' ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#555]'}`}>
            Tất Cả ({TOTAL})
          </button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveId(cat.id)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap flex-shrink-0
                ${activeId === cat.id ? 'bg-[#e06f46] text-white' : 'bg-[#f5f5f5] text-[#555]'}`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {displayCats.map(cat => (
            <div key={cat.id} className="mb-10">
              {activeId === 'all' && (
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-semibold text-[15px] text-[#1a1a1a]">{cat.label}</h3>
                  <span className="text-[12px] text-[#aaa]">{cat.count} ảnh</span>
                  <button onClick={() => setActiveId(cat.id)}
                    className="text-[12px] text-[#e06f46] font-medium hover:underline ml-auto">
                    Xem tất cả →
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {cat.photos.map((photo, i) => {
                  const globalIdx = photos.findIndex(p => p.src === photo.src)
                  return (
                    <div
                      key={photo.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group bg-[#f0f0f0]"
                      onClick={() => openLightbox(Math.max(0, globalIdx))}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-400"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* Hover overlay with caption */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                        <p className="text-white text-[11px] font-medium px-3 py-2 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* ── Card liên hệ cuối gallery — style như sidebar ── */}
          {activeId === 'all' && (
            <div className="mt-8 mb-4 max-w-sm mx-auto">
              <p className="text-center text-[11px] text-[#aaa] tracking-[3px] uppercase mb-4">
                Bạn đã xem hết {TOTAL} ảnh
              </p>

              <div className="border-2 border-[#e06f46]/20 rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(224,111,70,0.12)]">
                {!formSent ? (
                  <>
                    {/* Agent header */}
                    <div className="bg-[#f9f9f9] border-b border-[#e5e5e5] px-4 py-4 flex items-center gap-2 flex-wrap">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#e06f46]/30">
                        <Image src="/images/logo/avt_trung.jpg" alt="Nguyễn Quốc Trung"
                          width={48} height={48} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1a1a1a] text-[14px]">Nguyễn Quốc Trung</p>
                        <p className="text-[#888] text-[12px]">Đội ngũ sàn PQR</p>
                      </div>
                      <a href="tel:0365285863"
                        className="bg-[#e06f46] hover:bg-[#c45a33] text-white text-[12px] font-semibold px-3 py-1.5 rounded transition-colors">
                        Tư vấn ngay
                      </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 divide-x divide-[#e5e5e5] border-b border-[#e5e5e5]">
                      <div className="px-3 py-3 text-center">
                        <p className="font-bold text-[#1a1a1a] text-lg">5</p>
                        <p className="text-[#888] text-[10px]">Booking</p>
                      </div>
                      <div className="px-3 py-3 text-center">
                        <p className="font-bold text-[#1a1a1a] text-lg">2026</p>
                        <p className="text-[#888] text-[10px]">Đã tham gia</p>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#e5e5e5]">
                      {([['message','Gửi tin nhắn'],['booking','Đặt lịch tham quan']] as const).map(([key, label]) => (
                        <button key={key} onClick={() => setGalleryTab(key)}
                          className={`flex-1 py-3 text-[12px] font-semibold transition-colors
                            ${galleryTab === key ? 'text-[#e06f46] border-b-2 border-[#e06f46]' : 'text-[#888] hover:text-[#555]'}`}>
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Form */}
                    <div className="p-5">
                      <form onSubmit={handleFormSubmit} className="space-y-3">
                        <input required placeholder="Họ và tên *"
                          value={formData.name} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                          className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                        <input required type="tel" placeholder="Số điện thoại *"
                          value={formData.phone} onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                          className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                        <input type="email" placeholder="Email"
                          value={formData.email} onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                          className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                        {galleryTab === 'message' && (
                          <textarea rows={3} placeholder="Tin nhắn của bạn..."
                            value={formData.message} onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                            className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors resize-none" />
                        )}
                        {galleryTab === 'booking' && (
                          <input type="date" required
                            className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] text-[#555] focus:outline-none focus:border-[#e06f46] transition-colors" />
                        )}
                        <button type="submit"
                          className="w-full bg-[#e06f46] hover:bg-[#c45a33] text-white py-3 text-[13px] font-semibold rounded transition-colors">
                          {galleryTab === 'message' ? 'Gửi Tin Nhắn' : 'Đặt Lịch Tham Quan'}
                        </button>
                      </form>
                    </div>

                    {/* Quick contact */}
                    <div className="border-t border-[#e5e5e5] px-5 py-4 flex gap-3">
                      <a href="tel:0365285863"
                        className="flex-1 flex items-center justify-center gap-1.5 border border-[#e5e5e5] hover:border-[#e06f46] text-[#555] hover:text-[#e06f46] py-2.5 rounded text-[12px] font-medium transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Gọi điện
                      </a>
                      <a href="https://zalo.me/0365285863" target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 border border-[#e5e5e5] hover:border-[#0068ff] text-[#555] hover:text-[#0068ff] py-2.5 rounded text-[12px] font-medium transition-all">
                        <Image src="/images/logo/zalo.jpg" alt="Zalo" width={18} height={18} className="rounded-sm object-contain" />
                        Zalo
                      </a>
                    </div>
                    <div className="text-center text-[12px] text-[#888] py-2">308 Hai Bà Trưng · Quảng Ngãi</div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-[17px] text-[#1a1a1a] mb-2">Đăng ký thành công!</h3>
                    <p className="text-[#888] text-[13px] leading-relaxed">
                      Tư vấn viên sẽ liên hệ trong <span className="text-[#e06f46] font-semibold">30 phút</span> làm việc.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (() => {
        const isFormSlide = lightbox.idx >= lightbox.photos.length
        const goNext = () => setLightbox(l => l ? { ...l, idx: Math.min(l.idx + 1, l.photos.length) } : null)
        const goPrev = () => setLightbox(l => l ? { ...l, idx: Math.max(l.idx - 1, 0) } : null)

        return (
          <div className="fixed inset-0 z-[300] bg-black/95 flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
              <div className="text-white/60 text-[13px] font-medium">
                {isFormSlide ? '✦ Liên hệ tư vấn' : `${lightbox.idx + 1} / ${lightbox.photos.length}`}
              </div>
              <p className="text-white text-[13px] font-medium text-center flex-1 px-4">
                {isFormSlide ? 'Coastal Quảng Ngãi — Đăng ký nhận thông tin' : lightbox.photos[lightbox.idx]?.caption}
              </p>
              <button onClick={() => setLightbox(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Content — ảnh hoặc form */}
            <div className="flex-1 flex items-center justify-center px-16 min-h-0" onClick={e => e.stopPropagation()}>
              {isFormSlide ? (
                /* ── Form slide ── */
                <div className="w-full max-w-sm">
                  {!formSent ? (
                    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                      {/* Header cam */}
                      <div className="bg-gradient-to-br from-[#e06f46] to-[#c45a33] px-6 pt-6 pb-8 text-white">
                        <div className="text-2xl mb-2">🎉</div>
                        <h3 className="font-bold text-[17px]">Bạn đã xem hết {TOTAL} ảnh!</h3>
                        <p className="text-white/80 text-[13px] mt-1.5 leading-relaxed">
                          Để lại thông tin để nhận tư vấn và ưu đãi đặt chỗ sớm nhất.
                        </p>
                      </div>
                      <form onSubmit={handleFormSubmit} className="px-6 py-5 -mt-4 relative space-y-3">
                        <div className="bg-white rounded-xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] p-4 space-y-3">
                          <input required placeholder="Họ và tên *"
                            value={formData.name}
                            onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                            className="w-full border border-[#e5e5e5] rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                          <input required type="tel" placeholder="Số điện thoại *"
                            value={formData.phone}
                            onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                            className="w-full border border-[#e5e5e5] rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                          <button type="submit"
                            className="w-full bg-[#e06f46] hover:bg-[#c45a33] text-white py-3 rounded-lg text-[13px] font-bold tracking-wide transition-colors">
                            Nhận Tư Vấn Ngay — Miễn Phí
                          </button>
                          <p className="text-center text-[11px] text-[#aaa]">🔒 Thông tin bảo mật tuyệt đối</p>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[17px] text-[#1a1a1a] mb-2">Đăng ký thành công!</h3>
                      <p className="text-[#888] text-[13px] mb-5 leading-relaxed">
                        Tư vấn viên sẽ liên hệ trong <span className="text-[#e06f46] font-semibold">30 phút</span> làm việc.
                      </p>
                      <button onClick={() => setLightbox(null)}
                        className="bg-[#e06f46] text-white px-8 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#c45a33] transition-colors">
                        Đóng
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* ── Ảnh thường ── */
                <div className="relative w-full h-full max-w-5xl">
                  <Image
                    key={lightbox.photos[lightbox.idx].src}
                    src={lightbox.photos[lightbox.idx].src}
                    alt={lightbox.photos[lightbox.idx].caption}
                    fill className="object-contain" sizes="90vw" priority
                  />
                </div>
              )}
            </div>

            {/* Prev arrow — ẩn ở ảnh đầu */}
            {lightbox.idx > 0 && (
              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                onClick={goPrev}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}

            {/* Next arrow — ảnh cuối → form, form → ẩn */}
            {!isFormSlide && (
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                onClick={goNext}>
                {lightbox.idx === lightbox.photos.length - 1 ? (
                  /* Last photo: hint đến form */
                  <div className="flex flex-col items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                    <span className="text-white/60 text-[8px] tracking-wide">Form</span>
                  </div>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                )}
              </button>
            )}

            {/* Thumbnail filmstrip — ẩn khi form slide */}
            {!isFormSlide && (
              <div className="flex-shrink-0 px-6 py-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 justify-center min-w-max mx-auto">
                  {lightbox.photos.map((p, i) => (
                    <div key={p.src}
                      onClick={() => setLightbox(l => l ? { ...l, idx: i } : null)}
                      className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 cursor-pointer transition-all
                        ${lightbox.idx === i ? 'ring-2 ring-white ring-offset-1 ring-offset-black' : 'opacity-50 hover:opacity-80'}`}>
                      <Image src={p.src} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })()}

    </div>
  )
}
