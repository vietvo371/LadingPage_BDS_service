'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [open, setOpen] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('Form data:', data)
    setOpen(true)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="bg-[#f2ede4] py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#b8922a] text-xs tracking-[4px] uppercase font-sans mb-3">Đăng ký ngay</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1916] mb-3">Tư Vấn & Demo Giao Diện</h2>
          <p className="text-[#6b6459] font-sans text-sm">Điền thông tin để được bàn giao và tích hợp tên miền riêng trong 24 giờ</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[rgba(168,140,100,0.15)] p-8 md:p-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: 'name', label: 'Họ và Tên', type: 'text', placeholder: 'Ví dụ: Nguyễn Văn A', required: true },
              { name: 'phone', label: 'Số Điện Thoại / Zalo', type: 'tel', placeholder: 'Ví dụ: 0912 345 678', required: true },
              { name: 'domain', label: 'Tên Miền Mong Muốn', type: 'text', placeholder: 'coastal-quangngai.com', required: false },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-[#6b6459] text-xs font-medium mb-2 font-sans">{f.label}</label>
                <input
                  name={f.name} type={f.type} required={f.required} placeholder={f.placeholder}
                  className="w-full bg-[#faf8f5] border border-[rgba(168,140,100,0.25)] text-[#1c1916] placeholder:text-[#b0a898] px-4 py-3 text-sm font-sans rounded-sm focus:outline-none focus:border-[#b8922a] transition-colors"
                />
              </div>
            ))}

            {/* Template select */}
            <div>
              <label className="block text-[#6b6459] text-xs font-medium mb-2 font-sans">Chọn Mẫu Demo</label>
              <select name="template" className="w-full bg-[#faf8f5] border border-[rgba(168,140,100,0.25)] text-[#1c1916] px-4 py-3 text-sm font-sans rounded-sm focus:outline-none focus:border-[#b8922a] transition-colors appearance-none">
                <option value="1">Mẫu 1 — Focus Đầu Tư</option>
                <option value="2">Mẫu 2 — Focus An Cư</option>
                <option value="3">Mẫu 3 — Thu Lead Nhanh</option>
              </select>
            </div>

            {/* Note textarea */}
            <div className="md:col-span-2">
              <label className="block text-[#6b6459] text-xs font-medium mb-2 font-sans">Yêu Cầu Đặc Biệt</label>
              <textarea name="note" rows={3} placeholder="Nhập thêm yêu cầu về chỉnh sửa hình ảnh, màu sắc dự án..."
                className="w-full bg-[#faf8f5] border border-[rgba(168,140,100,0.25)] text-[#1c1916] placeholder:text-[#b0a898] px-4 py-3 text-sm font-sans rounded-sm focus:outline-none focus:border-[#b8922a] transition-colors resize-none"
              />
            </div>

            <button type="submit" className="md:col-span-2 bg-[#b8922a] text-white py-4 text-sm font-semibold rounded-sm hover:bg-[#d4a83a] transition-colors flex items-center justify-center gap-2 shadow-sm">
              Gửi Yêu Cầu Thiết Kế Ngay
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {open && (
        <div className="fixed inset-0 bg-[#1c1916]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-lg border border-[rgba(168,140,100,0.2)] p-10 max-w-md w-full text-center shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-[#f2ede4] flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-[#b8922a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1c1916] mb-3">Đăng Ký Thành Công</h3>
            <p className="text-[#6b6459] text-sm font-sans leading-relaxed mb-6">
              Yêu cầu của anh chị đã được ghi nhận. Kỹ thuật sẽ liên hệ qua SĐT/Zalo trong vòng 15 phút.
            </p>
            <button onClick={() => setOpen(false)} className="bg-[#b8922a] text-white px-8 py-2.5 text-sm font-semibold rounded-sm hover:bg-[#d4a83a] transition-colors">
              Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
