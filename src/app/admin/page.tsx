import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Users, PhoneCall, CheckCircle2, TrendingUp, ExternalLink, Calendar, Clock, ArrowRight, Home, Settings, Download, Globe } from 'lucide-react'

async function getStats() {
  const [total, newLeads, called, closed] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: 'CALLED' } }),
    prisma.lead.count({ where: { status: 'CLOSED' } }),
  ])
  const recent = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 6 })
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

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  const stats = await getStats()

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

        {/* Two-Column Grid Layout to balance screen space */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (2/3 width): Recent leads list */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
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

          {/* Right Column (1/3 width): Info and Shortcut Widgets */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Countdown widget */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-between relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-[#e06f46]/5 blur-2xl rounded-full pointer-events-none" />
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mở bán Giai đoạn 1</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">Ngày 27/06/2026</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-light mt-1">
                  <Clock className="size-3.5 text-[#e06f46]" />
                  <span>Đếm ngược sự kiện</span>
                </div>
              </div>
              
              {/* Dynamic countdown count */}
              {(() => {
                const openDate = new Date('2026-06-27')
                const now = new Date()
                const diffTime = openDate.getTime() - now.getTime()
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return (
                  <div className="text-center shrink-0">
                    <div className="text-4xl font-extrabold text-[#e06f46] tracking-tighter leading-none">
                      {diffDays > 0 ? diffDays : 0}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1 block">Ngày nữa</span>
                  </div>
                )
              })()}
            </div>

            {/* Quick stats parameters */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-100">Thông Số Quy Mô</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
                <div>
                  <span className="block text-slate-400 font-light">Diện tích quy hoạch</span>
                  <span className="text-sm font-bold text-slate-800">93.9 ha</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-light">Mật độ xây dựng</span>
                  <span className="text-sm font-bold text-slate-800">14.4%</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-light">Tổng số sản phẩm</span>
                  <span className="text-sm font-bold text-slate-800">~1.111 căn</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-light">Tổng vốn đầu tư</span>
                  <span className="text-sm font-bold text-slate-800">7.100 tỷ</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-100">Phím Tắt Tác Vụ</h3>
              <div className="flex flex-col gap-2">
                <Link href="/admin/editor">
                  <Button variant="default" size="sm" className="w-full justify-between h-9 text-xs text-white bg-[#e06f46] hover:bg-[#d05e36]">
                    <span className="flex items-center gap-2">
                      <Globe className="size-3.5 text-white" />
                      <span className="font-bold">WordPress Visual Editor</span>
                    </span>
                    <ArrowRight className="size-3 text-white" />
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs text-slate-700 bg-white hover:bg-slate-50 border-slate-200">
                    <span className="flex items-center gap-2">
                      <Settings className="size-3.5 text-slate-500" />
                      <span>Cấu hình thông số dự án</span>
                    </span>
                    <ArrowRight className="size-3 text-slate-400" />
                  </Button>
                </Link>
                <Link href="/admin/leads">
                  <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs text-slate-700 bg-white hover:bg-slate-50 border-slate-200">
                    <span className="flex items-center gap-2">
                      <Users className="size-3.5 text-slate-500" />
                      <span>Xem toàn bộ khách hàng</span>
                    </span>
                    <ArrowRight className="size-3 text-slate-400" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </AdminLayout>
  )
}
