'use client'
import { useState } from 'react'
import Image from 'next/image'
import GalleryModal    from './GalleryModal'
import CountdownTimer  from './CountdownTimer'
import CounterStats    from './CounterStats'
import ScrollReveal    from './ScrollReveal'
import LocationMap       from './LocationMap'
import ViewLikeCounter  from './ViewLikeCounter'

// ── Dùng ảnh render đẹp — bắt đầu từ 02 (bỏ spec sheet 01) ──
const PHOTO_TABS = [
  { label: 'Tất Cả',           catId: 'all',           folder: null,                     start: 2, count: 0  },
  { label: 'Dinh Thự Trị Liệu',catId: 'dinh-thu',      folder: 'dinh-thu-tri-lieu',      start: 2, count: 6  },
  { label: 'Biệt Thự Đơn Lập', catId: 'biet-thu-don',  folder: 'biet-thu-bien-don-lap',  start: 2, count: 6  },
  { label: 'Biệt Thự Song Lập',catId: 'biet-thu-song', folder: 'biet-thu-bien-song-lap', start: 2, count: 6  },
  { label: 'Nhà Công Viên',    catId: 'cong-vien',     folder: 'nha-cong-vien',          start: 2, count: 6  },
  { label: 'Nhà Quảng Trường', catId: 'quang-truong',  folder: 'nha-quang-truong',       start: 2, count: 5  },
  { label: 'Nhà Đại Lộ',      catId: 'dai-lo',        folder: 'nha-dai-lo',             start: 2, count: 4  },
  { label: 'Nhà Ven Sông',     catId: 'ven-song',      folder: 'nha-ven-song',           start: 2, count: 5  },
  { label: 'Nhà Vườn',        catId: 'nha-vuon',      folder: 'nha-vuon',               start: 4, count: 4  },
]

// Preview grid — 9 ảnh đẹp nhất cho tab "Tất Cả"
const PREVIEW_ALL = [
  '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-03.png',
  '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-02.png',
  '/images/mau-nha/nha-cong-vien/nha-cong-vien-03.png',
  '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-02.png',
  '/images/mau-nha/nha-quang-truong/nha-quang-truong-02.png',
  '/images/mau-nha/nha-dai-lo/nha-dai-lo-02.png',
  '/images/mau-nha/nha-ven-song/nha-ven-song-02.png',
  '/images/mau-nha/nha-vuon/nha-vuon-04.png',
  '/images/ngoai-that/phoi-canh-tong-the.jpg',
]

const AMENITIES = [
  { cat: 'Sinh Hoạt Cộng Đồng', items: ['Điểm ngắm hoàng hôn','Công viên rừng ngập mặn','Khu vui chơi thám hiểm rừng','Đường dạo ven biển – ven sông','Công viên gia đình, làng chài','Vườn dom đóm, Công viên sinh vật học'] },
  { cat: 'Thể Thao & Giải Trí', items: ['Resort 5 sao','Design Exhibition','Trung tâm chăm sóc sức khoẻ','Công viên thể thao ven sông','Gym, yoga, sân tennis đa năng'] },
  { cat: 'Thương Mại Dịch Vụ', items: ['Quảng trường biển','Quảng trường chợ nổi','Phố mua sắm ẩm thực','Trường liên cấp quốc tế','An ninh camera 24/7'] },
]

function AmenityGroup({ cat, items }: { cat: string; items: string[] }) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-[#e06f46] uppercase tracking-wide mb-3">{cat}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {items.map(item => (
          <div key={item} className="flex items-start gap-2 text-[13px] text-[#444]">
            <svg className="w-4 h-4 text-[#e06f46] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PropertyMain() {
  const [activeTab, setActiveTab]   = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryCat,  setGalleryCat]  = useState('all')
  const [showMore,       setShowMore]       = useState(false)
  const [showMoreTienIch, setShowMoreTienIch] = useState(false)

  const openGallery = (catId: string) => {
    setGalleryCat(catId)
    setGalleryOpen(true)
  }

  const getPhotos = () => {
    const tab = PHOTO_TABS[activeTab]
    if (!tab.folder) return PREVIEW_ALL
    return Array.from({ length: tab.count }, (_, i) => {
      const n = String(tab.start + i).padStart(2, '0')
      return `/images/mau-nha/${tab.folder}/${tab.folder}-${n}.png`
    })
  }

  return (
    <div id="tong-quan">

      {/* ── Price & meta ── */}
      <div className="border-b border-[#e5e5e5] pb-6 mb-6">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-1">4.8 Tỷ – 30 Tỷ</h1>
        <p className="text-[#555] text-[15px] mb-4">Xã Tư Nghĩa – Quảng Ngãi</p>

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
        <div className="overflow-x-auto no-scrollbar -mx-1 pb-1">
          <div className="flex gap-2 min-w-max px-1">
            {PHOTO_TABS.map((tab, i) => (
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
              onClick={() => openGallery(PHOTO_TABS[activeTab].catId)}
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
          onClick={() => openGallery(PHOTO_TABS[activeTab].catId)}
          className="mt-4 flex items-center gap-1.5 text-[13px] text-[#e06f46] font-semibold hover:underline underline-offset-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Xem tất cả hình ảnh ({activeTab === 0 ? 43 : PHOTO_TABS[activeTab].count} ảnh)
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
              "Khởi nguồn từ khát vọng kiến tạo một biểu tượng sống mới, Coastal Quảng Ngãi mang đến độc quyền sống tinh hoa – nơi thiên nhiên khoáng đạt giao hòa cùng nhịp giao thương sầm uất ngay trung tâm thành phố."
            </p>
          </div>
          <p>
            Dưới bàn tay tài huyết của Chủ đầu tư Haus Quảng Ngãi, dự án tự hào là khu đô thị sinh thái biển tiên phong sở hữu tọa độ vàng <strong>"Kẻ giang – Cận hải"</strong> vô cùng hiếm có. Tại đây, mỗi ngày trôi qua là một trải nghiệm sống chuẩn mực bên bờ sông Trà Khúc thơ mộng, quyện cùng bởi thế tươi mát của doi dương bao la.
          </p>

          <div>
            <p className="font-semibold text-[#1a1a1a] mb-2">Quy Mô Tầm Cỡ – Khắc Họa Biểu Tượng Mới</p>
            <p className="mb-3">Được quy hoạch bài bản để trở thành một quần thể đô thị đồng bộ và đẳng cấp, Coastal Quảng Ngãi (Haus Coastal Quảng Ngãi) gây ấn tượng mạnh mẽ bởi những con số biết nói:</p>
            <ul className="space-y-2 pl-4">
              {[
                ['Tổng diện tích', 'Lên đến 93.9 ha'],
                ['Tổng vốn đầu tư', 'Hơn 7.100 tỷ đồng – minh chứng rõ nét cho tầm vóc và tiềm lực vững chắc của dự án'],
                ['Mật độ xây dựng', 'Chỉ khoảng 14,4%. Phần lớn quỹ đất dành cho cảnh quan xanh, mặt nước và tiện ích độc quyền'],
                ['Bổ sưu tập sản phẩm', 'Cung cấp gần hơn khoảng 1.111 sản phẩm đa dạng — Shophouse thương mại, Biệt thự song trung, Liên kề và Căn hộ cao tầng'],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-2">
                  <span className="text-[#e06f46] mt-1 flex-shrink-0">•</span>
                  <span><strong>{k}:</strong> {v}.</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expandable: Giải Mã Sức Hút */}
          <div className={`relative overflow-hidden transition-all duration-500 ${showMore ? '' : 'max-h-0'}`}>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-[#1a1a1a] mb-3">Giải Mã Sức Hút Của Coastal Quảng Ngãi:</p>
                <div className="space-y-3">
                  {[
                    ['1. Vị Trí Kim Cương – Kết Nối Tinh Hoa', 'Kết nối trực tiếp đến bờ biển Mỹ Khê tuyệt đẹp và trung tâm TP. Quảng Ngãi thông qua Cầu Cửa Đại. Không chỉ mở ra không gian sống như một khu nghỉ dưỡng tại gia mà còn là thỏi nam châm thu hút dòng chảy giao thương mạnh mẽ.'],
                    ['2. Không Gian Sống Chất Lành', 'Với mật độ xây dựng cực thấp, Coastal Quảng Ngãi kiến tạo một màng xanh không lây ngay cửa biển. Giúp cư dân tận hưởng bầu không khí trong lành, tách biệt khỏi ồn ào khói bụi nhưng vẫn kết nối nhịp sống tiện nghi.'],
                    ['3. Bảo Chứng Đầu Tư – Pháp Lý Vững Chắc', 'Giữa những biến động của thị trường, dự án mang đến an tâm tuyệt đối với sổ đỏ sở hữu lâu dài. Không chỉ là nơi an cư lý tưởng mà còn là "tài sản truyền đời".'],
                    ['4. Chính Sách Bán Hàng Ưu Việt', 'Các chính sách thanh toán ưu đãi từ Chủ đầu tư, hỗ trợ hợp đồng điều dụng, hạn mức mang đến những đặc quyền tối ưu và dễ dàng nhất cho nhà đầu tư tiềm năng.'],
                  ].map(([title, content]) => (
                    <div key={title as string}>
                      <p className="font-medium text-[#1a1a1a]">{title}</p>
                      <p className="text-[#555] mt-1">{content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-medium text-[#e06f46] italic">
                Coastal Quảng Ngãi – Không chỉ là nơi để trở về, mà còn là di sản kiêu hãnh định riêng cho cộng đồng tinh hoa!
              </p>
            </div>
          </div>

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
          {/* Category đầu tiên luôn hiển thị */}
          <AmenityGroup cat={AMENITIES[0].cat} items={AMENITIES[0].items} />

          {/* Các category còn lại — toggle */}
          <div className={`space-y-6 overflow-hidden transition-all duration-500 ${showMoreTienIch ? '' : 'max-h-0'}`}>
            {AMENITIES.slice(1).map(({ cat, items }) => (
              <AmenityGroup key={cat} cat={cat} items={items} />
            ))}
          </div>

          {/* Nút Xem thêm */}
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
