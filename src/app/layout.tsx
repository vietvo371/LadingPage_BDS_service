import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Trung Digital Media — Landing Page BĐS Quảng Ngãi Chuyên Nghiệp',
  description: 'Sở hữu Landing Page BĐS Quảng Ngãi chỉ 1 triệu VNĐ. Bàn giao 24h, tối ưu chuyển đổi.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#faf8f5] text-[#1c1916] font-sans overflow-x-hidden">{children}</body>
    </html>
  )
}
