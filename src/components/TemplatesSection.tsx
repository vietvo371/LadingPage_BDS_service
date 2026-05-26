const templates = [
  {
    id: 'vinhomes',
    tag: 'Vinhomes Smart City',
    name: 'Mẫu Vinhomes Elite',
    desc: 'Nhân bản 100% nguyên bản giao diện dự án Vinhomes Smart City Tây Mỗ. Đầy đủ hiệu ứng động LadiPage và các phân khu.',
    features: ['100% nguyên bản LadiPage', 'Đầy đủ hiệu ứng & Popup', 'Tối ưu hóa tải trang'],
    img: '/images/vinhomes.jpg',
    href: '/templates/vinhomes/index.html',
  },
  {
    id: 'dautu',
    tag: 'Đầu tư sinh lời',
    name: 'Mẫu Đầu Tư',
    desc: 'Tập trung bảng tính dòng tiền, so sánh tiềm năng tăng giá đất nền và shophouse. Dành cho nhà đầu tư.',
    features: ['Tính ROI tự động', 'So sánh Shophouse vs Đất nền', 'Bảng thanh toán chi tiết'],
    img: '/images/investment.jpg',
    href: '/templates/dautu/index.html',
  },
  {
    id: 'novaworld',
    tag: 'NovaWorld Hồ Tràm',
    name: 'Mẫu NovaWorld Elite',
    desc: 'Nhân bản 100% nguyên bản giao diện tổ hợp du lịch nghỉ dưỡng giải trí NovaWorld Hồ Tràm. Trải nghiệm lướt mượt mà, đầy đủ hiệu ứng của LadiPage.',
    features: ['100% nguyên bản LadiPage', 'Hiệu ứng nghỉ dưỡng sinh động', 'Tương thích mọi thiết bị'],
    img: '/images/novaworld.jpg',
    href: '/templates/novaworld/index.html',
  },
]

export default function TemplatesSection() {
  return (
    <section id="templates" className="bg-[#faf8f5] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[#b8922a] text-xs tracking-[4px] uppercase font-sans mb-3">Kho mẫu thiết kế</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1c1916] mb-4">3 Mẫu Độc Quyền</h2>
          <p className="text-[#6b6459] max-w-lg font-sans">Tinh chỉnh chuyên biệt cho từng nhu cầu quảng bá dự án bất động sản cao cấp</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {templates.map((tmpl) => (
            <div key={tmpl.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[rgba(168,140,100,0.15)] flex flex-col">
              {/* Image wrapper */}
              <div className="relative h-[420px] w-full overflow-hidden bg-[#faf8f5] border-b border-[rgba(168,140,100,0.1)]">
                <img
                  src={tmpl.img}
                  alt={tmpl.name}
                  className="w-full h-full card-scroll-img"
                />
                <span className="absolute top-4 left-4 bg-[#b8922a] text-white text-xs px-3.5 py-1 rounded-sm font-medium tracking-wide uppercase">
                  {tmpl.tag}
                </span>
                <div className="absolute inset-0 bg-[#1c1916]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={tmpl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#1c1916] px-6 py-2.5 text-sm font-semibold rounded-sm hover:bg-[#faf8f5] transition-colors shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    Xem Live Demo ↗
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1c1916] mb-2">{tmpl.name}</h3>
                <p className="text-[#6b6459] text-sm leading-relaxed mb-6 font-sans flex-grow">{tmpl.desc}</p>
                <ul className="space-y-2 border-t border-[rgba(168,140,100,0.1)] pt-4 mb-6">
                  {tmpl.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#6b6459] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b8922a] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tmpl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#b8922a] hover:bg-[#a37f22] text-white py-3 text-sm font-semibold rounded-sm transition-colors uppercase tracking-wider font-sans"
                >
                  Xem Live Demo ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
