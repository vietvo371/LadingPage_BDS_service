import type { Metadata } from 'next'
import AdminLayout from '@/components/admin/AdminLayout'

export const metadata: Metadata = {
  title: 'Admin — Coastal Quảng Ngãi',
  robots: 'noindex,nofollow',
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
