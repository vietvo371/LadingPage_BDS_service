"use client"

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Users, Phone, Mail, Calendar, ShieldAlert, Check, RefreshCw, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

type Lead = {
  id: number
  name: string
  phone: string
  email: string | null
  message: string | null
  source: string
  status: string
  note: string | null
  createdAt: string
}

const STATUS_OPTS = ['NEW', 'CALLED', 'CLOSED'] as const
const STATUS_LABEL: Record<string, string> = { NEW: 'Mới nhận', CALLED: 'Đã gọi', CLOSED: 'Đã chốt' }

const STATUS_STYLE: Record<string, { badge: string; text: string; bg: string }> = {
  NEW: { 
    badge: 'bg-[#e06f46]/8 text-[#e06f46] border-[#e06f46]/20 font-bold',
    text: 'text-[#e06f46]',
    bg: 'bg-[#e06f46]/5'
  },
  CALLED: { 
    badge: 'bg-amber-50 text-amber-700 border-amber-200/50 font-bold',
    text: 'text-amber-700',
    bg: 'bg-amber-50/50'
  },
  CLOSED: { 
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 font-bold',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50/50'
  },
}

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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/leads')
      .then(r => r.json())
      .then(data => { setLeads(data); setLoading(false) })
  }, [])

  async function updateStatus(id: number, status: string) {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  function exportCSV() {
    const rows = [
      ['ID', 'Tên khách hàng', 'Số điện thoại', 'Email', 'Nguồn đăng ký', 'Trạng thái', 'Thời gian'],
      ...leads.map(l => [l.id, l.name, l.phone, l.email ?? '', l.source, STATUS_LABEL[l.status] ?? l.status, new Date(l.createdAt).toLocaleString('vi-VN')]),
    ]
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `coastal-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const filtered = filter === 'ALL' ? leads : leads.filter(l => l.status === filter)

  return (
    <AdminLayout>
      <div className="p-8 space-y-6 bg-slate-50/50 min-h-[calc(100vh-64px)]">
        {/* Page Header Section inside content body */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quản Lý Khách Hàng</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              Hệ thống lưu trữ <span className="font-semibold text-slate-700">{leads.length} lượt đăng ký</span> từ website
            </p>
          </div>
          <Button onClick={exportCSV} variant="outline" size="sm" className="h-9 gap-1.5 text-xs text-slate-700 border-slate-200 bg-white shadow-sm hover:bg-slate-50">
            <Download className="size-3.5 text-slate-500" />
            <span>Xuất tệp CSV</span>
          </Button>
        </div>
        {/* Pills filtering tab */}
        <div className="flex flex-wrap gap-2">
          {(['ALL', ...STATUS_OPTS] as string[]).map(s => {
            const active = filter === s
            const count = s === 'ALL' ? leads.length : leads.filter(l => l.status === s).length
            return (
              <Button 
                key={s} 
                onClick={() => setFilter(s)} 
                variant={active ? 'default' : 'outline'} 
                className={cn(
                  "h-9 px-4 rounded-full text-xs font-semibold shadow-sm transition-all duration-200",
                  active
                    ? "bg-[#e06f46] hover:bg-[#d05e36] text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                )}
              >
                {s === 'ALL' ? 'Tất cả' : STATUS_LABEL[s]}
                <span className={cn(
                  "ml-2 inline-flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 py-0.5",
                  active
                    ? "bg-white/20 text-white"
                    : "bg-[#e06f46]/8 text-[#e06f46]"
                )}>
                  {count}
                </span>
              </Button>
            )
          })}
        </div>

        {/* Main Table Box */}
        <Card className="border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                <RefreshCw className="size-6 text-[#e06f46] animate-spin" />
                <p className="text-sm text-slate-400 font-light">Đang tải dữ liệu...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
                <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  <ShieldAlert className="size-5 text-slate-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">Không có khách hàng nào</p>
                  <p className="text-xs text-slate-400 font-light">Không tìm thấy bản ghi tương ứng với bộ lọc đã chọn</p>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50/70 border-b border-slate-100">
                  <TableRow>
                    <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider py-4 pl-6">Khách hàng</TableHead>
                    <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider py-4">Liên hệ</TableHead>
                    <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider py-4">Chi tiết yêu cầu</TableHead>
                    <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider py-4">Kênh đăng ký</TableHead>
                    <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider py-4">Thời gian</TableHead>
                    <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider py-4">Trạng thái</TableHead>
                    <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider py-4 text-right pr-6">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-100">
                  {filtered.map(lead => {
                    const initials = lead.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    const style = STATUS_STYLE[lead.status] ?? { badge: 'bg-slate-50 text-slate-600', text: 'text-slate-600', bg: 'bg-slate-50' }
                    return (
                      <TableRow key={lead.id} className="hover:bg-slate-50/20 transition-colors">
                        {/* Khách hàng (Avatar + Tên) */}
                        <TableCell className="py-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className={`size-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${getAvatarColor(lead.name)}`}>
                              {initials}
                            </div>
                            <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                          </div>
                        </TableCell>
                        
                        {/* Liên hệ (SĐT + Email) */}
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-slate-800 font-medium">
                              <Phone className="size-3 text-slate-400 shrink-0" />
                              <span>{lead.phone}</span>
                            </div>
                            {lead.email && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Mail className="size-3 text-slate-400 shrink-0" />
                                <span className="truncate max-w-44">{lead.email}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        {/* Chi tiết yêu cầu */}
                        <TableCell className="py-4 max-w-xs">
                          {lead.message ? (
                            <div className="flex gap-1.5 items-start">
                              <MessageSquare className="size-3 text-[#e06f46] shrink-0 mt-0.5" />
                              <p className="text-xs text-slate-600 leading-normal line-clamp-2 pr-2">{lead.message}</p>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-300 italic">Không có tin nhắn</span>
                          )}
                        </TableCell>
                        
                        {/* Kênh đăng ký (Source) */}
                        <TableCell className="py-4">
                          <span className="inline-flex items-center text-[10px] font-bold text-slate-500 uppercase bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded">
                            {lead.source}
                          </span>
                        </TableCell>
                        
                        {/* Thời gian */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
                            <Calendar className="size-3 text-slate-400 shrink-0" />
                            <span>{new Date(lead.createdAt).toLocaleString('vi-VN')}</span>
                          </div>
                        </TableCell>
                        
                        {/* Trạng thái */}
                        <TableCell className="py-4">
                          <Badge variant="outline" className={cn("text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider border", style.badge)}>
                            {STATUS_LABEL[lead.status] ?? lead.status}
                          </Badge>
                        </TableCell>
                        
                        {/* Thao tác (Cập nhật trạng thái) */}
                        <TableCell className="py-4 text-right pr-6">
                          <div className="flex gap-1 justify-end">
                            {lead.status !== 'NEW' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateStatus(lead.id, 'NEW')} 
                                className="text-[10px] h-7 px-2 border-slate-200 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 flex items-center gap-1 shadow-sm rounded-md"
                              >
                                <RefreshCw className="size-2.5" />
                                <span>Nhận mới</span>
                              </Button>
                            )}
                            
                            {lead.status !== 'CALLED' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateStatus(lead.id, 'CALLED')} 
                                className="text-[10px] h-7 px-2 border-amber-200 text-amber-600 hover:text-amber-700 bg-amber-50/20 hover:bg-amber-50/50 flex items-center gap-1 shadow-sm rounded-md"
                              >
                                <Phone className="size-2.5" />
                                <span>Ghi nhận gọi</span>
                              </Button>
                            )}
                            
                            {lead.status !== 'CLOSED' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateStatus(lead.id, 'CLOSED')} 
                                className="text-[10px] h-7 px-2 border-emerald-200 text-emerald-600 hover:text-emerald-700 bg-emerald-50/20 hover:bg-emerald-50/50 flex items-center gap-1 shadow-sm rounded-md"
                              >
                                <Check className="size-2.5" />
                                <span>Chốt cọc</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
