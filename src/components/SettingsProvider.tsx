"use client"

import { createContext, useContext } from 'react'

export interface SettingsMap {
  price_range?: string
  location?: string
  hotline?: string
  zalo_link?: string
  open_date?: string
  open_date_time?: string
  open_title?: string
  total_units?: string
  area_ha?: string
  total_investment?: string
  density?: string
  about_quote?: string
  about_desc?: string
  agent_name?: string
  agent_team?: string
  agent_avatar?: string
  agent_join_year?: string
  agent_bookings?: string
  agent_address?: string
  property_info_html?: string
  amenities_html?: string
}

const DEFAULTS: Required<SettingsMap> = {
  price_range: "4.8 Tỷ – 30 Tỷ",
  location: "Xã Tư Nghĩa – Quảng Ngãi",
  hotline: "0365 285 863",
  zalo_link: "https://zalo.me/0365285863",
  open_date: "2026-06-27",
  open_date_time: "2026-06-27T08:00:00",
  open_title: "Sự Kiện Mở Bán — Giai Đoạn 1",
  total_units: "1111",
  area_ha: "93.9",
  total_investment: "7.100",
  density: "14.4",
  about_quote: "Khởi nguồn từ khát vọng kiến tạo một biểu tượng sống mới, Coastal Quảng Ngãi mang đến đặc quyền sống tinh hoa – nơi thiên nhiên khoáng đạt giao hòa cùng nhịp giao thương sầm uất ngay trung tâm thành phố.",
  about_desc: "Dưới bàn tay tâm huyết của Chủ đầu tư Haus Quảng Ngãi, dự án tự hào là khu đô thị sinh thái biển tiên phong sở hữu tọa độ vàng \"Kề giang – Cận hải\" vô cùng hiếm có. Tại đây, mỗi ngày trôi qua là một trải nghiệm sống chuẩn mực bên bờ sông Trà Khúc thơ mộng, quyện cùng hơi thở tươi mát của đại dương bao la.",
  agent_name: "Nguyễn Quốc Trung",
  agent_team: "Đội ngũ sàn PQR",
  agent_avatar: "/images/logo/avt_trung.jpg",
  agent_join_year: "2026",
  agent_bookings: "5",
  agent_address: "308 Hai Bà Trưng · Quảng Ngãi",
  property_info_html: `<div>
  <p><strong>Quy Mô Tầm Cỡ – Khắc Họa Biểu Tượng Mới</strong></p>
  <p>Được quy hoạch bài bản để trở thành một quần thể đô thị đồng bộ và đẳng cấp, Coastal Quảng Ngãi (Haus Coastal Quảng Ngãi) gây ấn tượng mạnh mẽ bởi những con số biết nói:</p>
  <ul>
    <li><strong>Tổng diện tích:</strong> Lên đến 93.9 ha.</li>
    <li><strong>Tổng vốn đầu tư:</strong> Hơn 7.100 tỷ đồng – minh chứng rõ nét cho tầm vóc và tiềm lực vững chắc của dự án.</li>
    <li><strong>Mật độ xây dựng:</strong> Chỉ khoảng 14.4%. Phần lớn quỹ đất dành cho cảnh quan xanh, mặt nước và tiện ích độc quyền.</li>
    <li><strong>Bộ sưu tập sản phẩm:</strong> Cung cấp gần hơn khoảng 1111 sản phẩm đa dạng.</li>
  </ul>
  <p><br></p>
  <p><strong>Giải Mã Sức Hút Của Coastal Quảng Ngãi:</strong></p>
  <p><strong>1. Vị Trí Kim Cương – Kết Nối Tinh Hoa</strong><br/>Kết nối trực tiếp đến bờ biển Mỹ Khê tuyệt đẹp và trung tâm TP. Quảng Ngãi thông qua Cầu Cửa Đại.</p>
  <p><strong>2. Không Gian Sống Chất Lành</strong><br/>Với mật độ xây dựng cực thấp, Coastal Quảng Ngãi kiến tạo một màng xanh không lây ngay cửa biển.</p>
  <p><strong>3. Bảo Chứng Đầu Tư – Pháp Lý Vững Chắc</strong><br/>Giữa những biến động của thị trường, dự án mang đến an tâm tuyệt đối với sổ đỏ sở hữu lâu dài.</p>
  <p><strong>4. Chính Sách Bán Hàng Ưu Việt</strong><br/>Các chính sách thanh toán ưu đãi từ Chủ đầu tư mang đến những đặc quyền tối ưu.</p>
</div>`,
  amenities_html: `<div>
  <p><strong>Sinh Hoạt Cộng Đồng</strong></p>
  <ul>
    <li>Điểm ngắm hoàng hôn</li>
    <li>Công viên rừng ngập mặn</li>
    <li>Khu vui chơi thám hiểm rừng</li>
    <li>Đường dạo ven biển – ven sông</li>
  </ul>
  <p><br></p>
  <p><strong>Thể Thao & Giải Trí</strong></p>
  <ul>
    <li>Resort 5 sao</li>
    <li>Design Exhibition</li>
    <li>Trung tâm chăm sóc sức khoẻ</li>
    <li>Công viên thể thao ven sông</li>
  </ul>
  <p><br></p>
  <p><strong>Thương Mại Dịch Vụ</strong></p>
  <ul>
    <li>Quảng trường biển</li>
    <li>Quảng trường chợ nổi</li>
    <li>Phố mua sắm ẩm thực</li>
    <li>Trường liên cấp quốc tế</li>
  </ul>
</div>`,
}

const SettingsContext = createContext<SettingsMap>(DEFAULTS)

export function SettingsProvider({ children, settings }: { children: React.ReactNode; settings?: SettingsMap }) {
  // Merge loaded settings with DEFAULTS
  const mergedSettings = { ...DEFAULTS, ...settings }
  return (
    <SettingsContext.Provider value={mergedSettings}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  return context as Required<SettingsMap>
}
