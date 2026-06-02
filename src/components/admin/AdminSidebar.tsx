"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/leads', label: 'Khách hàng', icon: '👥' },
  { href: '/admin/settings', label: 'Cài đặt', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-56 min-h-screen bg-white border-r flex flex-col">
      <div className="px-5 py-5 border-b">
        <div className="font-bold text-[#e06f46] text-base">Coastal Admin</div>
        <div className="text-xs text-gray-400 mt-0.5">Quảng Ngãi</div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-orange-50 text-[#e06f46] font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <span>🚪</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
