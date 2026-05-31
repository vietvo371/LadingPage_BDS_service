import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be',
})

export const metadata: Metadata = {
  title: 'Coastal Quảng Ngãi — Khu Đô Thị Nghỉ Dưỡng Cao Cấp Ven Biển',
  description:
    'Dự án Coastal Quảng Ngãi — Khu đô thị tích hợp nghỉ dưỡng ven biển đẳng cấp tại Xã Tư Nghĩa, Quảng Ngãi. Giá từ 4.8 Tỷ – 30 Tỷ.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="bg-white text-[#1a1a1a] font-[family-name:var(--font-be)] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
