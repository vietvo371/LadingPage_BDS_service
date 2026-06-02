"use client"

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Download, 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldAlert, 
  Check, 
  RefreshCw, 
  MessageSquare,
  Trash2,
  Edit3,
  Search,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog'
import { toast } from 'sonner'

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
  const [searchQuery, setSearchQuery] = useState('')

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [noteText, setNoteText] = useState('')
  const [statusVal, setStatusVal] = useState<string>('NEW')
  const [savingNote, setSavingNote] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  useEffect(() => {
    if (selectedLead) {
      setNoteText(selectedLead.note || '')
      setStatusVal(selectedLead.status)
    }
  }, [selectedLead])

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

  async function saveLeadChanges() {
    if (!selectedLead) return
    setSavingNote(true)
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: selectedLead.id, 
          note: noteText,
          status: statusVal
        }),
      })
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, note: noteText, status: statusVal } : l))
        setSelectedLead(null)
        toast.success('Đã lưu thay đổi!')
      } else {
        toast.error('Lưu thay đổi thất bại!')
      }
    } catch {
      toast.error('Có lỗi xảy ra!')
    } finally {
      setSavingNote(false)
    }
  }

  async function deleteLead() {
    if (!selectedLead) return
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id }),
      })
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== selectedLead.id))
        setSelectedLead(null)
        setDeleteConfirmOpen(false)
        toast.success('Đã xóa khách hàng!')
      } else {
        toast.error('Xóa khách hàng thất bại!')
      }
    } catch {
      toast.error('Có lỗi xảy ra!')
    }
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

  const filtered = leads.filter(l => {
    if (filter !== 'ALL' && l.status !== filter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.message && l.message.toLowerCase().includes(q)) ||
        (l.note && l.note.toLowerCase().includes(q))
      )
    }
    return true
  })

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
        {/* Toolbar: Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(['ALL', ...STATUS_OPTS] as string[]).map(s => {
              const active = filter === s
              const count = s === 'ALL' ? leads.length : leads.filter(l => l.status === s).length
              return (
                <button 
                  key={s} 
                  onClick={() => setFilter(s)} 
                  className={cn(
                    "h-8 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 border",
                    active
                      ? "bg-[#e06f46] border-[#e06f46] text-white shadow-sm shadow-[#e06f46]/20"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <span>{s === 'ALL' ? 'Tất cả' : STATUS_LABEL[s]}</span>
                  <span className={cn(
                    "inline-flex items-center justify-center rounded-md text-[9px] font-black px-1.5 py-0.2 shrink-0",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-[#e06f46]/10 text-[#e06f46]"
                  )}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tên, số điện thoại..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#e06f46] focus:ring-1 focus:ring-[#e06f46]/30 transition-all placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
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
                          {lead.note && (
                            <div className="flex gap-1.5 items-start mt-1 border-t border-slate-100 pt-1">
                              <span className="text-[10px] bg-amber-50 text-amber-700 px-1 py-0.2 rounded font-semibold shrink-0 mt-0.5">Ghi chú:</span>
                              <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 pr-2">{lead.note}</p>
                            </div>
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
                        
                        {/* Thao tác */}
                        <TableCell className="py-4 text-right pr-6">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedLead(lead)}
                            className="text-xs h-8 px-3 border-slate-200 text-slate-600 hover:text-[#e06f46] hover:border-[#e06f46]/30 bg-white hover:bg-[#e06f46]/5 flex items-center gap-1.5 shadow-sm rounded-lg ml-auto active:scale-95 transition-all font-semibold"
                          >
                            <Edit3 className="size-3.5" />
                            <span>Chi tiết {lead.note ? '•' : ''}</span>
                          </Button>
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

      {/* Lead Detail & Note Dialog */}
      <Dialog open={selectedLead !== null} onOpenChange={open => { if (!open) setSelectedLead(null) }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#e06f46]" />
              Chi tiết khách hàng
            </DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết và cập nhật ghi chú cho khách hàng.
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-4 py-2">
              {/* Customer Info Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2.5 text-xs text-slate-700">
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-semibold text-slate-500">Họ và tên:</span>
                  <span className="col-span-2 font-bold text-slate-900">{selectedLead.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-semibold text-slate-500">Số điện thoại:</span>
                  <span className="col-span-2">
                    <a href={`tel:${selectedLead.phone}`} className="text-[#e06f46] hover:underline font-bold flex items-center gap-1">
                      <Phone className="size-3" />
                      {selectedLead.phone}
                    </a>
                  </span>
                </div>
                {selectedLead.email && (
                  <div className="grid grid-cols-3 gap-1">
                    <span className="font-semibold text-slate-500">Email:</span>
                    <span className="col-span-2">
                      <a href={`mailto:${selectedLead.email}`} className="text-blue-500 hover:underline flex items-center gap-1">
                        <Mail className="size-3" />
                        {selectedLead.email}
                      </a>
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-semibold text-slate-500">Kênh đăng ký:</span>
                  <span className="col-span-2 uppercase font-bold text-slate-600">{selectedLead.source}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-semibold text-slate-500">Thời gian nhận:</span>
                  <span className="col-span-2">{new Date(selectedLead.createdAt).toLocaleString('vi-VN')}</span>
                </div>
                {selectedLead.message && (
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-500 block mb-1">Tin nhắn / Yêu cầu:</span>
                    <p className="bg-white p-2.5 rounded-lg border border-slate-200/50 leading-relaxed text-slate-600">
                      {selectedLead.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Trạng thái chăm sóc</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['NEW', 'CALLED', 'CLOSED'] as const).map(s => {
                    const active = statusVal === s
                    const label = STATUS_LABEL[s]
                    const style = STATUS_STYLE[s]
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatusVal(s)}
                        className={cn(
                          "py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all",
                          active
                            ? cn("border-current shadow-sm ring-1 ring-offset-0", style.badge)
                            : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                        )}
                      >
                        {s === 'NEW' && <RefreshCw className="size-3" />}
                        {s === 'CALLED' && <Phone className="size-3" />}
                        {s === 'CLOSED' && <Check className="size-3" />}
                        <span>{label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Note Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ghi chú nội bộ</label>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Nhập ghi chú chăm sóc khách hàng (ví dụ: đang cân nhắc căn 2 phòng ngủ, hẹn gọi lại sau 5h...)"
                  rows={4}
                  className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs transition-colors outline-none resize-none focus-visible:border-[#e06f46] focus-visible:ring-1 focus-visible:ring-[#e06f46]/50 placeholder:text-slate-400 text-slate-800"
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex sm:justify-between items-center w-full gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="px-3.5 py-2 rounded-lg border border-red-200 hover:border-red-300 text-red-600 text-[13px] font-medium hover:bg-red-50 transition-colors flex items-center gap-1 shadow-sm sm:mr-auto"
            >
              <Trash2 className="size-3.5" />
              Xóa khách hàng
            </button>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-[13px] font-medium hover:bg-slate-50 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={saveLeadChanges}
                disabled={savingNote}
                className="px-4 py-2 rounded-lg bg-[#e06f46] hover:bg-[#c45a33] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold transition-colors"
              >
                {savingNote ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Xóa khách hàng?
            </DialogTitle>
            <DialogDescription>
              Hành động này sẽ xóa vĩnh viễn khách hàng <strong>{selectedLead?.name}</strong> khỏi cơ sở dữ liệu. Không thể hoàn tác!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDeleteConfirmOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-[13px] font-medium hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={deleteLead}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold transition-colors"
            >
              Xác nhận xóa
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
