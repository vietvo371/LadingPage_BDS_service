'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import GalleryModal    from './GalleryModal'
import CountdownTimer  from './CountdownTimer'
import CounterStats    from './CounterStats'
import ScrollReveal    from './ScrollReveal'
import LocationMap       from './LocationMap'
import ViewLikeCounter  from './ViewLikeCounter'
import { useSettings } from './SettingsProvider'

export default function PropertyMain() {
  const settings = useSettings()
  const [activeTab, setActiveTab]     = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryCat,  setGalleryCat]  = useState('all')
  const [showMore,       setShowMore]       = useState(false)
  const [showMoreTienIch, setShowMoreTienIch] = useState(false)

  // Drag scroll cho tab bar
  const tabRef   = useRef<HTMLDivElement>(null)
  const dragRef  = useRef({ isDragging: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    const el = tabRef.current; if (!el) return
    dragRef.current = { isDragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
    el.style.cursor = 'grabbing'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    const el = tabRef.current; if (!el || !dragRef.current.isDragging) return
    e.preventDefault()
    const x    = e.pageX - el.offsetLeft
    const walk = (x - dragRef.current.startX) * 1.5
    el.scrollLeft = dragRef.current.scrollLeft - walk
  }
  const onMouseUp = () => {
    dragRef.current.isDragging = false
    if (tabRef.current) tabRef.current.style.cursor = 'grab'
  }

  const openGallery = (catId: string) => {
    setGalleryCat(catId)
    setGalleryOpen(true)
  }

  let CATEGORIES: { id: string, label: string, count: number, photos: { src: string }[] }[] = []
  try {
    if (settings.gallery_data) {
      CATEGORIES = JSON.parse(settings.gallery_data).map((c: any) => ({
        ...c,
        count: c.photos?.length || 0
      }))
    }
  } catch (e) {}

  const ALL_PHOTOS = CATEGORIES.flatMap(c => c.photos.map(p => p.src))
  const TOTAL_PHOTOS = ALL_PHOTOS.length

  const TABS = [
    { label: 'Tất Cả', catId: 'all', count: 0, photos: ALL_PHOTOS },
    ...CATEGORIES.map(c => ({ label: c.label, catId: c.id, count: c.count, photos: c.photos.map(p => p.src) }))
  ]

  const getPhotos = () => {
    const tab = TABS[activeTab]
    if (!tab) return []
    return tab.photos.slice(0, 9) // Giới hạn hiển thị 9 ảnh đầu ở dạng lưới thu gọn
  }

  return (
    <div id="tong-quan">

      {/* ── Price & meta ── */}
      <div className="border-b border-[#e5e5e5] pb-6 mb-6">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-1">{settings.price_range}</h1>
        <p className="text-[#555] text-[15px] mb-4">{settings.location}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#555]">
          <span>
            <span className="text-[#1a1a1a] font-semibold">Cơ cấu sản phẩm Giai đoạn 1: </span>
            57 NV · 36 NVS · 29 NQT · 25 NDL · 22 NCV · 24 BTSL · 11 BTDL · 8 BTBTL
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <span className="text-[12px] text-[#888]">Cập nhật: ngày 30 tháng 05 năm 2026</span>
          <span className="font-semibold text-[#e06f46] text-[12px]">MSCT#01</span>
        </div>
        <div className="mt-2">
          <ViewLikeCounter />
        </div>
      </div>

      {/* ── Countdown ── */}
      <ScrollReveal delay={0.1}>
        <CountdownTimer />
      </ScrollReveal>

      {/* ── Counter stats ── */}
      <ScrollReveal delay={0.15}>
        <CounterStats />
      </ScrollReveal>

      {/* ── Photo tabs ── */}
      <div id="du-an" className="mb-6">
        <div
          ref={tabRef}
          className="overflow-x-auto no-scrollbar -mx-1 pb-1 cursor-grab select-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="flex gap-2 min-w-max px-1">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold rounded-full whitespace-nowrap transition-all duration-200
                  ${activeTab === i
                    ? 'bg-[#e06f46] text-white shadow-[0_2px_12px_rgba(224,111,70,0.35)]'
                    : 'bg-[#f5f5f5] text-[#666] hover:bg-[#eee] hover:text-[#e06f46]'}`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                    ${activeTab === i ? 'bg-white/25 text-white' : 'bg-[#e5e5e5] text-[#888]'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Photo grid — click ảnh mở gallery modal */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {getPhotos().map((src, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0] rounded-lg group cursor-pointer"
              onClick={() => openGallery(TABS[activeTab].catId)}
            >
              <Image
                src={src}
                alt={`Ảnh ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-400"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
              {/* Hover zoom icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all scale-75 group-hover:scale-100">
                  <svg className="w-4 h-4 text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Xem tất cả link */}
        <button
          onClick={() => openGallery(TABS[activeTab].catId)}
          className="mt-4 flex items-center gap-1.5 text-[13px] text-[#e06f46] font-semibold hover:underline underline-offset-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Xem tất cả hình ảnh ({activeTab === 0 ? TOTAL_PHOTOS : TABS[activeTab].count} ảnh)
        </button>

        {/* Gallery Modal */}
        <GalleryModal
          open={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          defaultCategory={galleryCat}
        />
      </div>

      {/* ── Description ── */}
      <ScrollReveal>
      <div className="border-t border-[#e5e5e5] pt-8 mb-8">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Thông Tin Về Bất Động Sản</h2>

        <div className="text-[14px] text-[#444] leading-[1.85] space-y-4">
          {/* Quote highlight box */}
          <div className="border-l-4 border-[#e06f46] bg-[#fdf6f3] px-5 py-4 rounded-r-lg">
            <p className="text-[#c45a33] font-semibold italic text-[14px] leading-relaxed">
              "{settings.about_quote}"
            </p>
          </div>
          <p>
            {settings.about_desc}
          </p>

          {/* Dynamic Property Info (Rich Text) */}
          {settings.property_info_html && (
            <div className={`relative overflow-hidden transition-all duration-700 ${showMore ? 'max-h-[3000px]' : 'max-h-[250px]'}`}>
              <div 
                className="prose prose-sm max-w-none prose-slate prose-p:leading-relaxed prose-a:text-[#e06f46] prose-strong:text-[#1a1a1a] prose-ul:pl-4 prose-li:marker:text-[#e06f46]"
                dangerouslySetInnerHTML={{ __html: settings.property_info_html }}
              />
              {!showMore && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
          )}

          {/* Nút Xem thêm / Thu gọn */}
          <button
            onClick={() => setShowMore(v => !v)}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#e06f46]
              hover:text-[#c45a33] transition-colors group mt-1"
          >
            <span>{showMore ? 'Thu gọn' : 'Xem thêm'}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Type badge */}
        <div className="mt-5 flex items-center gap-2">
          <span className="text-[12px] text-[#888]">Loại Bất Động Sản:</span>
          <span className="bg-[#fdf0eb] text-[#e06f46] text-[12px] font-semibold px-3 py-1 rounded-full">resort living</span>
        </div>
      </div>
      </ScrollReveal>

      {/* ── Amenities ── */}
      <ScrollReveal delay={0.1}>
      <div id="tien-ich" className="border-t border-[#e5e5e5] pt-8 mb-8">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Tiện Ích Dự Án</h2>
        <div className="space-y-6">
          {/* Dynamic Amenities (Rich Text) */}
          {settings.amenities_html && (
            <div className={`relative overflow-hidden transition-all duration-700 ${showMoreTienIch ? 'max-h-[3000px]' : 'max-h-[250px]'}`}>
              <div 
                className="prose prose-sm max-w-none prose-slate prose-p:leading-relaxed prose-a:text-[#e06f46] prose-strong:text-[#e06f46] prose-strong:uppercase prose-strong:tracking-wide prose-ul:pl-4 prose-li:marker:text-[#e06f46]"
                dangerouslySetInnerHTML={{ __html: settings.amenities_html }}
              />
              {!showMoreTienIch && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
          )}

          {/* Nút Xem thêm */}
          {settings.amenities_html && (
            <button
              onClick={() => setShowMoreTienIch(v => !v)}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#e06f46] hover:text-[#c45a33] transition-colors mt-2"
            >
              <span>{showMoreTienIch ? 'Thu gọn' : 'Xem thêm tiện ích'}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showMoreTienIch ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
      </ScrollReveal>

      {/* ── Location — kiểu BĐS chuyên nghiệp ── */}
      <ScrollReveal delay={0.1}>
        <LocationMap />
      </ScrollReveal>
    </div>
  )
}
