'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'Contact Form', ...data }),
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    setLoading(false)
    setOpen(true)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="lien-he" className="py-28 bg-[#0b0e12]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — pitch */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-px bg-[#c9a870]" />
              <span className="text-[#c9a870] text-[10px] tracking-[5px] uppercase font-sans">Đăng Ký Tư Vấn</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
              Nhận Thông Tin<br />
              <span className="text-[#c9a870]">Ưu Tiên</span>
            </h2>

            <p className="text-white/45 leading-relaxed font-sans text-[15px] mb-12">
              Điền thông tin để tư vấn viên liên hệ trong vòng 30 phút làm việc.
              Khách đăng ký sớm được ưu tiên chọn vị trí đẹp và hưởng chính sách đặc biệt giai đoạn 1.
            </p>

            {/* Benefits */}
            <div className="space-y-5">
              {[
                'Nhận bảng giá mới nhất & chi tiết từng phân khu',
                'Tư vấn pháp lý và phương án thanh toán linh hoạt',
                'Ưu tiên chọn vị trí đẹp — giai đoạn 1 giá gốc',
                'Hỗ trợ vay ngân hàng lên đến 70% giá trị căn',
              ].map(item => (
                <div key={item} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 border border-[#c9a870]/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-[#c9a870]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/50 text-sm font-sans leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Hotline */}
            <div className="mt-14 pt-10 border-t border-white/[0.07]">
              <p className="text-white/25 text-[10px] tracking-[3px] uppercase font-sans mb-3">Liên Hệ Trực Tiếp</p>
              <a href="tel:0365285863" className="font-serif text-3xl font-bold text-[#c9a870] hover:text-[#dfc090] transition-colors">
                0365 285 863
              </a>
              <p className="text-white/25 text-xs font-sans mt-1">Thứ 2 – Thứ 7 · 08:00 – 18:00</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-[#14181e] border border-white/[0.07] p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-white/35 text-[9px] tracking-[3px] uppercase mb-2 font-sans">
                  Họ và Tên <span className="text-[#c9a870]">*</span>
                </label>
                <input
                  name="name" type="text" required placeholder="Nguyễn Văn A"
                  className="w-full bg-[#0b0e12] border border-white/[0.08] text-white placeholder:text-white/15
                    px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-[#c9a870]/60 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/35 text-[9px] tracking-[3px] uppercase mb-2 font-sans">
                  Số Điện Thoại <span className="text-[#c9a870]">*</span>
                </label>
                <input
                  name="phone" type="tel" required placeholder="0912 345 678"
                  className="w-full bg-[#0b0e12] border border-white/[0.08] text-white placeholder:text-white/15
                    px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-[#c9a870]/60 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/35 text-[9px] tracking-[3px] uppercase mb-2 font-sans">
                  Email
                </label>
                <input
                  name="email" type="email" placeholder="example@email.com"
                  className="w-full bg-[#0b0e12] border border-white/[0.08] text-white placeholder:text-white/15
                    px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-[#c9a870]/60 transition-colors"
                />
              </div>

              {/* Interest */}
              <div>
                <label className="block text-white/35 text-[9px] tracking-[3px] uppercase mb-2 font-sans">
                  Quan Tâm Đến Phân Khu
                </label>
                <select
                  name="interest"
                  className="w-full bg-[#0b0e12] border border-white/[0.08] text-white/60
                    px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-[#c9a870]/60 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Chọn loại sản phẩm...</option>
                  <option>Dinh Thự Trị Liệu</option>
                  <option>Biệt Thự Biển Đơn Lập</option>
                  <option>Biệt Thự Biển Song Lập</option>
                  <option>Nhà Công Viên</option>
                  <option>Nhà Quảng Trường</option>
                  <option>Nhà Đại Lộ</option>
                  <option>Nhà Ven Sông</option>
                  <option>Nhà Vườn</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-white/35 text-[9px] tracking-[3px] uppercase mb-2 font-sans">
                  Ngân Sách Dự Kiến
                </label>
                <select
                  name="budget"
                  className="w-full bg-[#0b0e12] border border-white/[0.08] text-white/60
                    px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-[#c9a870]/60 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Chọn ngân sách...</option>
                  <option>Dưới 3 tỷ</option>
                  <option>3 – 5 tỷ</option>
                  <option>5 – 10 tỷ</option>
                  <option>10 – 20 tỷ</option>
                  <option>Trên 20 tỷ</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a870] text-[#0b0e12] py-4 text-[10px] font-bold tracking-[3px] uppercase
                  hover:bg-[#dfc090] transition-colors duration-300 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xử lý...' : 'Đăng Ký Ngay — Miễn Phí'}
              </button>

              <p className="text-white/15 text-[10px] text-center font-sans tracking-wide">
                🔒 Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#14181e] border border-white/10 p-10 max-w-md w-full text-center"
            onClick={e => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="w-16 h-16 border border-[#c9a870]/50 flex items-center justify-center mx-auto mb-7">
              <svg className="w-7 h-7 text-[#c9a870]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-3">Đăng Ký Thành Công</h3>

            <p className="text-white/45 text-sm font-sans leading-relaxed mb-8">
              Tư vấn viên sẽ liên hệ với bạn qua số điện thoại trong vòng{' '}
              <span className="text-[#c9a870]">30 phút làm việc.</span>
            </p>

            <button
              onClick={() => setOpen(false)}
              className="bg-[#c9a870] text-[#0b0e12] px-10 py-3 text-[10px] font-bold tracking-[3px] uppercase
                hover:bg-[#dfc090] transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
