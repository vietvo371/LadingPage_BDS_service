'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function PropertySidebar() {
  const [sent, setSent] = useState(false)
  const [tab, setTab] = useState<'message'|'booking'>('message')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="lg:sticky lg:top-[72px]">
      {/* Agent card */}
      <div className="border-2 border-[#e06f46]/20 rounded-xl overflow-hidden mb-4 shadow-[0_4px_24px_rgba(224,111,70,0.12)]">

        {/* Agent header */}
        <div className="bg-[#f9f9f9] border-b border-[#e5e5e5] px-4 py-4 flex items-center gap-2 flex-wrap">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#e06f46]/30">
            <Image
              src="/images/logo/avt_trung.jpg"
              alt="Nguyễn Quốc Trung"
              width={48}
              height={48}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#1a1a1a] text-[14px]">Nguyễn Quốc Trung</p>
            <p className="text-[#888] text-[12px]">Đội ngũ sản PGR</p>
          </div>
          <a href="tel:0365285863"
            className="bg-[#e06f46] hover:bg-[#c45a33] text-white text-[12px] font-semibold px-3 py-1.5 rounded transition-colors whitespace-nowrap">
            Tư vấn ngay
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 divide-x divide-[#e5e5e5] border-b border-[#e5e5e5]">
          <div className="px-3 py-3 text-center">
            <p className="font-bold text-[#1a1a1a] text-lg">5</p>
            <p className="text-[#888] text-[10px]">Số lượng booking</p>
          </div>
          <div className="px-3 py-3 text-center">
            <p className="font-bold text-[#1a1a1a] text-lg">2026</p>
            <p className="text-[#888] text-[10px]">Đã tham gia</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e5e5e5]">
          {([['message','Gửi tin nhắn'],['booking','Đặt lịch tham quan']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-3 text-[12px] font-semibold transition-colors
                ${tab === key ? 'text-[#e06f46] border-b-2 border-[#e06f46]' : 'text-[#888] hover:text-[#555]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Form area */}
        <div className="p-5" id="lien-he">
          {tab === 'message' ? (
            <>
              {sent ? (
                <div className="text-center py-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-[#555] font-medium">Đã gửi! Tư vấn viên sẽ liên hệ sớm.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="name" type="text" required placeholder="Họ và tên *"
                    className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                  <input name="phone" type="tel" required placeholder="Số điện thoại *"
                    className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                  <input name="email" type="email" placeholder="Email"
                    className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
                  <textarea name="message" rows={3} placeholder="Tin nhắn của bạn..."
                    className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors resize-none" />
                  <button type="submit"
                    className="w-full bg-[#e06f46] hover:bg-[#c45a33] text-white py-3 text-[13px] font-semibold rounded transition-colors">
                    Gửi Tin Nhắn
                  </button>
                </form>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-[13px] text-[#555] mb-3">
                Đặt lịch tham quan dự án với <strong>Trung Nguyen</strong> — Hãy chọn ngày và loại hình tham quan mà bạn muốn.
              </p>
              <input name="name" type="text" required placeholder="Họ và tên *"
                className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
              <input name="phone" type="tel" required placeholder="Số điện thoại *"
                className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors" />
              <input name="date" type="date" required
                className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors text-[#555]" />
              <select name="type"
                className="w-full border border-[#ddd] rounded px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#e06f46] transition-colors text-[#555]">
                <option value="">Chọn loại hình tham quan</option>
                <option>Tham quan thực tế</option>
                <option>Tham quan trực tuyến (Online)</option>
              </select>
              <button type="submit"
                className="w-full bg-[#e06f46] hover:bg-[#c45a33] text-white py-3 text-[13px] font-semibold rounded transition-colors">
                Đặt Lịch Tham Quan
              </button>
            </form>
          )}
        </div>

        {/* Quick contact row */}
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
      </div>

      {/* Agent address */}
      <div className="text-center text-[12px] text-[#888] mt-2">
        308 Hai Bà Trưng · Quảng Ngãi
      </div>
    </div>
  )
}
