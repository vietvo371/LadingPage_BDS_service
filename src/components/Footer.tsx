export default function Footer() {
  return (
    <footer className="bg-[#1c1916] mt-0">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-serif text-xl font-bold tracking-wide mb-4">
              <span className="text-white">COASTAL</span>
              <span className="text-[#d4a83a]"> QN</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-sans">
              Đơn vị cung cấp giải pháp tối ưu thu hút khách hàng tiềm năng và triển khai chiến dịch Marketing BĐS tại miền Trung.
            </p>
          </div>
          <div>
            <h4 className="text-white/50 text-xs tracking-[3px] uppercase mb-5 font-sans">Liên Hệ Trực Tiếp</h4>
            <ul className="space-y-3 text-white/40 text-sm font-sans">
              <li>Zalo: 0905.xxx.xxx</li>
              <li>Hotline: 0905.xxx.xxx</li>
              <li>Quảng Ngãi, Việt Nam</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/50 text-xs tracking-[3px] uppercase mb-5 font-sans">Liên Kết Nhanh</h4>
            <ul className="space-y-3 font-sans">
              {[['#templates','Xem Mẫu Web'],['#contact','Đăng Ký Tư Vấn'],['#referral','Kiếm Tiền Cafe']].map(([href,label]) => (
                <li key={href}>
                  <a href={href} className="text-white/40 hover:text-[#d4a83a] text-sm transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-white/20 text-xs tracking-wider font-sans">
          © 2026 Trung Digital Media · Thiết kế cao cấp đồng bộ thương hiệu Coastal Quảng Ngãi
        </div>
      </div>
    </footer>
  )
}
