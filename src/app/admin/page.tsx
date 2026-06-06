import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Users, PhoneCall, CheckCircle2, TrendingUp, ExternalLink, Calendar } from 'lucide-react'

async function getStats(brokerId: number) {
  const where = { brokerId }
  const [total, newLeads, called, closed] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.count({ where: { ...where, status: 'NEW' } }),
    prisma.lead.count({ where: { ...where, status: 'CALLED' } }),
    prisma.lead.count({ where: { ...where, status: 'CLOSED' } }),
  ])
  const recent = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 6,
  })
  return { total, newLeads, called, closed, recent }
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  NEW: { label: 'Mới nhận', className: 'bg-[#e06f46]/8 text-[#e06f46] border-[#e06f46]/20' },
  CALLED: { label: 'Đã gọi', className: 'bg-amber-50 text-amber-700 border-amber-200/50' },
  CLOSED: { label: 'Đã chốt', className: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
}

// Function to generate light background avatars
function getAvatarColor(name: string) {
  const colors = [
    'bg-[#e06f46]/10 text-[#e06f46]',
    'bg-[#c9a84c]/15 text-[#c9a84c]',
    'bg-blue-50 text-blue-600',
    'bg-emerald-50 text-emerald-600',
    'bg-purple-50 text-purple-600',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

import { getCurrentBroker } from '@/lib/currentBroker'

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  // MASTER xem site hiện tại theo domain, BROKER xem site của mình
  let brokerId = session.brokerId ?? 1
  if (session.role === 'MASTER') {
    const broker = await getCurrentBroker()
    if (broker) brokerId = broker.id
  }

  const stats = await getStats(brokerId)

  const cards = [
    { 
      label: 'Tổng leads', 
      value: stats.total, 
      desc: 'Tổng lượt đăng ký qua website',
      icon: TrendingUp, 
      bg: 'bg-slate-50', 
      iconColor: 'text-slate-500',
      borderClass: 'border-slate-100 hover:border-slate-200 hover:shadow-slate-50'
    },
    { 
      label: 'Mới nhận', 
      value: stats.newLeads, 
      desc: 'Khách hàng chưa xử lý',
      icon: Users, 
      bg: 'bg-blue-50', 
      iconColor: 'text-blue-500',
      borderClass: 'border-blue-100/50 hover:border-blue-200/80 hover:shadow-blue-50/50'
    },
    { 
      label: 'Đã liên hệ', 
      value: stats.called, 
      desc: 'Đã gọi tư vấn ban đầu',
      icon: PhoneCall, 
      bg: 'bg-amber-50', 
      iconColor: 'text-amber-500',
      borderClass: 'border-amber-100/50 hover:border-amber-200/80 hover:shadow-amber-50/50'
    },
    { 
      label: 'Đã chốt', 
      value: stats.closed, 
      desc: 'Đăng ký đặt chỗ thành công',
      icon: CheckCircle2, 
      bg: 'bg-emerald-50', 
      iconColor: 'text-emerald-500',
      borderClass: 'border-emerald-100/50 hover:border-emerald-200/80 hover:shadow-emerald-50/50'
    },
  ]

  return (
    <AdminLayout>
      <div className="p-8 space-y-8 bg-slate-50/50 min-h-[calc(100vh-64px)]">
        {/* Page Header Section inside content body */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard Tổng Quan</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              Xin chào, <span className="font-semibold text-slate-700">{session.email}</span> · Đây là tổng quan hoạt động
            </p>
          </div>
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs text-slate-600 hover:text-slate-900 border-slate-200 bg-white shadow-sm">
              <span>Xem trang landing page</span>
              <ExternalLink className="size-3" />
            </Button>
          </Link>
        </div>
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(card => (
            <div 
              key={card.label} 
              className={`rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md -translate-y-0 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between ${card.borderClass}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{card.label}</span>
                <div className={`size-9 rounded-xl ${card.bg} flex items-center justify-center shadow-sm`}>
                  <card.icon className={`size-4.5 ${card.iconColor}`} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{card.value}</div>
                <p className="text-[11px] text-slate-400 font-light leading-normal">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Full width recent leads list */}
        <div className="w-full rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Khách Hàng Đăng Ký Mới Nhất</h2>
              <p className="text-xs text-slate-400 font-light mt-0.5">Danh sách cập nhật thời gian thực từ form website</p>
            </div>
            <Link href="/admin/leads">
              <Button variant="ghost" size="sm" className="h-8 text-xs text-[#e06f46] hover:text-[#d05e36] hover:bg-[#e06f46]/5 font-medium">
                Xem tất cả khách hàng
              </Button>
            </Link>
          </div>
          <Separator className="bg-slate-100" />
          
          {stats.recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
              <Users className="size-8 text-slate-300" />
              <p className="text-sm text-slate-400 font-medium">Chưa có khách hàng nào đăng ký</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recent.map(lead => {
                const s = STATUS_MAP[lead.status] ?? { label: lead.status, className: 'bg-slate-50 text-slate-600 border-slate-200' }
                const initials = lead.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                return (
                  <div 
                    key={lead.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0 ${getAvatarColor(lead.name)}`}>
                        {initials}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                          <span className="text-[10px] text-slate-400 font-medium px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200/50 uppercase shrink-0">
                            {lead.source}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {lead.phone} {lead.email ? `· ${lead.email}` : ''}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-light">
                        <Calendar className="size-3.5" />
                        <span>{new Date(lead.createdAt).toLocaleString('vi-VN')}</span>
                      </div>
                      <Badge variant="outline" className={`font-semibold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 border ${s.className}`}>
                        {s.label}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
