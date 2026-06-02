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
