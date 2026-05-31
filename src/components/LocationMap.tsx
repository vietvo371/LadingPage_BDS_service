'use client'
import { useState } from 'react'

type Place = { name: string; address: string; dist: string; time: string }

const TABS: { id: string; label: string; icon: string; places: Place[] }[] = [
  {
    id: 'school', label: 'Trường học',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    places: [
      { name: 'Trường Mầm non Nghĩa An',    address: 'Xã Nghĩa An, Tư Nghĩa',         dist: '0.4 km', time: '1 phút'  },
      { name: 'Trường TH Nghĩa An',          address: 'Xã Nghĩa An, Tư Nghĩa',         dist: '0.7 km', time: '2 phút'  },
      { name: 'THCS Nghĩa An',               address: 'Xã Nghĩa An, Tư Nghĩa',         dist: '1.1 km', time: '3 phút'  },
      { name: 'THPT Trần Quốc Tuấn',         address: 'TP. Quảng Ngãi',                 dist: '5.2 km', time: '12 phút' },
    ],
  },
  {
    id: 'market', label: 'Siêu thị',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    places: [
      { name: 'Chợ Nghĩa An',               address: 'Xã Nghĩa An, Tư Nghĩa',         dist: '0.9 km', time: '3 phút'  },
      { name: 'Vinmart Tư Nghĩa',            address: 'TT. La Hà, Tư Nghĩa',            dist: '2.3 km', time: '6 phút'  },
      { name: 'Co.opmart Quảng Ngãi',        address: 'Nguyễn Du, TP. Quảng Ngãi',     dist: '5.8 km', time: '13 phút' },
      { name: 'Chợ Quảng Ngãi',             address: 'Trung tâm TP. Quảng Ngãi',       dist: '6.2 km', time: '14 phút' },
    ],
  },
  {
    id: 'park', label: 'Công viên',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 21"/><path d="M9.1 7.27c1.23-2.52 4.15-3.84 7.3-3.17A6 6 0 0121 10c0 3.32-2.69 6-6 6"/><path d="M3 21h18"/></svg>`,
    places: [
      { name: 'Bãi biển Mỹ Khê Quảng Ngãi',address: 'Tiếp giáp dự án',                 dist: '0.2 km', time: '1 phút'  },
      { name: 'Công viên ven sông Trà Khúc',address: 'Bờ Nam sông Trà Khúc',            dist: '1.3 km', time: '4 phút'  },
      { name: 'Công viên 1/1',              address: 'Lê Thánh Tôn, TP. Quảng Ngãi',   dist: '5.5 km', time: '12 phút' },
    ],
  },
  {
    id: 'hospital', label: 'Bệnh viện',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    places: [
      { name: 'Trạm y tế Nghĩa An',         address: 'Xã Nghĩa An, Tư Nghĩa',         dist: '0.8 km', time: '2 phút'  },
      { name: 'PK Đa khoa Tư Nghĩa',        address: 'TT. La Hà, Tư Nghĩa',            dist: '2.6 km', time: '6 phút'  },
      { name: 'BV Đa khoa Quảng Ngãi',      address: 'Hùng Vương, TP. Quảng Ngãi',    dist: '5.4 km', time: '12 phút' },
      { name: 'BV Sản – Nhi Quảng Ngãi',   address: 'TP. Quảng Ngãi',                 dist: '6.1 km', time: '14 phút' },
    ],
  },
]

const MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.4!2d108.8!3d15.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDA2JzAwLjAiTiAxMDjCsDQ4JzAwLjAiRQ!5e1!3m2!1svi!2svn!4v1'
const MAPS_LINK = 'https://maps.app.goo.gl/fayQMvikCVXt9iYf6'

export default function LocationMap() {
  const [activeTab, setActiveTab] = useState('school')
  const tab = TABS.find(t => t.id === activeTab)!

  return (
    <div id="khu-vuc" className="border-t border-[#e5e5e5] pt-8">

      {/* Title */}
      <h2 className="text-xl font-bold text-[#1a1a1a] mb-1">Khám Phá Khu Vực</h2>
      <div className="flex items-center gap-1.5 text-[13px] text-[#666] mb-5">
        <svg className="w-3.5 h-3.5 text-[#e06f46] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        Ven biển Nghĩa An, Xã Tư Nghĩa, Tỉnh Quảng Ngãi
      </div>

      {/* Map iframe */}
      <div className="relative w-full rounded-xl overflow-hidden border border-[#e5e5e5]" style={{ height: 300 }}>
        <iframe
          title="Vị trí Coastal Quảng Ngãi"
          src={MAPS_EMBED}
          width="100%" height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Mở trong Maps overlay */}
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 left-3 flex items-center gap-1.5 bg-white hover:bg-[#f5f5f5]
            text-[#1a1a1a] text-[12px] font-semibold px-3 py-1.5 rounded-full
            shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-colors border border-[#e5e5e5]"
        >
          <svg className="w-3.5 h-3.5 text-[#4285f4]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Mở trong Maps
          <svg className="w-3 h-3 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-[#e5e5e5] mt-5 overflow-x-auto no-scrollbar">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium whitespace-nowrap
              transition-colors border-b-2 -mb-px flex-shrink-0
              ${activeTab === t.id
                ? 'border-[#e06f46] text-[#e06f46]'
                : 'border-transparent text-[#666] hover:text-[#1a1a1a]'
              }`}
          >
            <span
              className="w-4 h-4 flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: t.icon }}
            />
            {t.label}
          </button>
        ))}
      </div>

      {/* Places list */}
      <div className="mt-3 mb-2">
        <p className="text-[12px] text-[#888] mb-3">
          Có {tab.places.length} {tab.label.toLowerCase()} trong vòng 15 km
        </p>
        <div className="divide-y divide-[#f5f5f5]">
          {tab.places.map(place => (
            <div key={place.name} className="flex items-center justify-between py-3.5">
              <div className="min-w-0 pr-4">
                <p className="text-[14px] font-semibold text-[#1a1a1a] truncate">{place.name}</p>
                <p className="text-[12px] text-[#888] mt-0.5">{place.address}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-[13px] font-semibold text-[#1a1a1a]">{place.dist}</p>
                <p className="text-[11px] text-[#aaa] mt-0.5 flex items-center gap-0.5 justify-end">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {place.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
