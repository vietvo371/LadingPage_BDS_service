export default function ProjectOverview() {
  return (
    <section id="tong-quan" className="py-28 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-px bg-[#c9a870]" />
          <span className="text-[#c9a870] text-[10px] tracking-[5px] uppercase font-sans">Tổng Quan Dự Án</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — description */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.1] mb-8 text-[#1a1715]">
              Kiến Tạo Chốn<br />
              <span className="text-[#c9a870]">Nghỉ Dưỡng</span> Bền Vững<br />
              Tại Miền Trung
            </h2>

            <p className="text-[#6b6459] leading-relaxed mb-5 font-sans text-[15px]">
              Coastal Quảng Ngãi là khu đô thị tích hợp nghỉ dưỡng cao cấp nằm ngay ven biển tỉnh Quảng Ngãi.
              Với quy hoạch đồng bộ và thiết kế bởi các kiến trúc sư hàng đầu thế giới, dự án mang đến
              không gian sống chan hòa với thiên nhiên — nơi biển và sông giao thoa tuyệt đẹp.
            </p>
            <p className="text-[#6b6459] leading-relaxed mb-12 font-sans text-[15px]">
              Được phát triển với tầm nhìn dài hạn, Coastal Quảng Ngãi không chỉ là nơi an cư lý tưởng
              mà còn là kênh đầu tư sinh lời bền vững trong bối cảnh du lịch miền Trung tăng trưởng mạnh.
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-px bg-[#e2d9cc]">
              {[
                ['Quy Mô',    'Đại Đô Thị'],
                ['Pháp Lý',   'Đầy Đủ'],
                ['Bàn Giao',  '2026 – 2027'],
                ['Sở Hữu',    'Lâu Dài'],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#faf8f4] p-5 hover:bg-[#f0ebe0] transition-colors">
                  <div className="text-[#9c9187] text-[10px] tracking-[2px] uppercase mb-1.5 font-sans">{label}</div>
                  <div className="font-serif text-xl font-semibold text-[#1a1715]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="space-y-5">
            {[
              {
                num:  '8',
                unit: 'Phân Khu',
                desc: 'Đa dạng sản phẩm từ Dinh Thự, Biệt Thự Biển đến Nhà Vườn và Shophouse',
              },
              {
                num:  '5',
                unit: 'Đối Tác Quốc Tế',
                desc: 'SWECO · GioForma · 100architects · SHMS · DJC Coalition',
              },
              {
                num:  '2026',
                unit: 'Mở Bán',
                desc: 'Giai đoạn 1 — cơ hội đầu tư sớm với giá gốc chủ đầu tư',
              },
              {
                num:  '70%',
                unit: 'Hỗ Trợ Vay',
                desc: 'Ngân hàng liên kết hỗ trợ vay vốn, lãi suất ưu đãi',
              },
            ].map(item => (
              <div
                key={item.unit}
                className="flex items-center gap-6 p-6 border border-[rgba(201,168,112,0.18)]
                  hover:border-[#c9a870] transition-colors duration-300 group cursor-default"
              >
                <div className="flex-shrink-0 text-right w-24">
                  <div className="font-serif text-4xl font-bold text-[#c9a870] leading-none">{item.num}</div>
                  <div className="text-[9px] tracking-[2px] uppercase text-[#9c9187] font-sans mt-1.5">{item.unit}</div>
                </div>
                <div className="w-px h-12 bg-[#e2d9cc] group-hover:bg-[#c9a870]/40 transition-colors flex-shrink-0" />
                <p className="text-[#6b6459] text-sm font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
