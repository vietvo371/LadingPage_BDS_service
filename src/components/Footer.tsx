import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Logo + desc */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo/logo-coastal-clean.png"
                alt="Coastal Quảng Ngãi"
                width={140}
                height={44}
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[#888] text-[13px] leading-relaxed">
              Khu đô thị nghỉ dưỡng ven biển cao cấp tại Xã Tư Nghĩa, Tỉnh Quảng Ngãi.
            </p>
          </div>

          {/* Địa chỉ */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-[#666] mb-4">Địa Chỉ</h4>
            <ul className="space-y-2 text-[13px] text-[#888]">
              <li>Ven biển Nghĩa An</li>
              <li>Xã Tư Nghĩa, Tỉnh Quảng Ngãi</li>
              <li>Việt Nam</li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-[#666] mb-4">Liên Hệ</h4>
            <ul className="space-y-2 text-[13px] text-[#888]">
              <li>
                <a href="tel:0365285863" className="hover:text-[#e06f46] transition-colors">
                  Hotline: 0365 285 863
                </a>
              </li>
              <li>
                <a href="mailto:trungnguyen.coastal@gmail.com" className="hover:text-[#e06f46] transition-colors">
                  trungnguyen.coastal@gmail.com
                </a>
              </li>
              <li>
                <a href="https://zalo.me/0365285863" target="_blank" rel="noopener noreferrer"
                  className="hover:text-[#e06f46] transition-colors">
                  Zalo: 0365 285 863
                </a>
              </li>
            </ul>
          </div>

          {/* QR Zalo */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-[#666] mb-4">Quét Qua Zalo</h4>
            <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
              <span className="text-[#333] text-[10px] text-center leading-tight px-1">QR Zalo<br/>sắp có</span>
            </div>
            <p className="text-[#666] text-[11px] mt-2">Quét mã QR Zalo</p>
          </div>
        </div>

        {/* Social + copyright */}
        <div className="border-t border-[#333] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a href="#" aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center text-[#666] hover:border-[#e06f46] hover:text-[#e06f46] transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube"
              className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center text-[#666] hover:border-[#e06f46] hover:text-[#e06f46] transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
              </svg>
            </a>
            {/* Zalo */}
            <a href="https://zalo.me/0365285863" target="_blank" rel="noopener noreferrer" aria-label="Zalo"
              className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center text-[#666] hover:border-[#0068ff] hover:text-[#0068ff] transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.987-1.32A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
            </a>
          </div>
          <p className="text-[#666] text-[12px]">
            © 2026 Coastal Quảng Ngãi. Thiết kế bởi{' '}
            <span className="text-[#e06f46]">Trung Digital Media</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
