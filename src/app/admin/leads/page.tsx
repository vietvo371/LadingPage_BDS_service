"use client"

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

const STATUS_OPTS = ['NEW', 'CALLED', 'CLOSED']
const STATUS_LABEL: Record<string, string> = { NEW: 'Mới', CALLED: 'Đã gọi', CLOSED: 'Đã chốt' }
const STATUS_COLOR: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CALLED: 'bg-orange-100 text-orange-700',
  CLOSED: 'bg-green-100 text-green-700',
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
      ['ID', 'Tên', 'SĐT', 'Email', 'Nguồn', 'Trạng thái', 'Ghi chú', 'Thời gian'],
      ...leads.map(l => [l.id, l.name, l.phone, l.email ?? '', l.source, STATUS_LABEL[l.status] ?? l.status, l.note ?? '', new Date(l.createdAt).toLocaleString('vi-VN')]),
    ]
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `leads-coastal-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const filtered = filter === 'ALL' ? leads : leads.filter(l => l.status === filter)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Khách hàng</h1>
            <p className="text-sm text-gray-500 mt-1">{leads.length} leads tổng cộng</p>
          </div>
          <Button onClick={exportCSV} variant="outline" size="sm">
            ⬇ Xuất CSV
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          {['ALL', ...STATUS_OPTS].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === s ? 'bg-[#e06f46] text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'ALL' ? 'Tất cả' : STATUS_LABEL[s]}
              <span className="ml-1.5 text-xs opacity-70">
                {s === 'ALL' ? leads.length : leads.filter(l => l.status === s).length}
              </span>
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <p className="text-center py-12 text-gray-400">Đang tải…</p>
            ) : filtered.length === 0 ? (
              <p className="text-center py-12 text-gray-400">Không có lead nào</p>
            ) : (
              <div className="divide-y">
                {filtered.map(lead => (
                  <div key={lead.id} className="flex items-start gap-4 px-6 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-gray-900">{lead.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${STATUS_COLOR[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABEL[lead.status] ?? lead.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">📞 {lead.phone}</div>
                      {lead.message && <div className="text-xs text-gray-400 mt-1 truncate">{lead.message}</div>}
                      <div className="text-xs text-gray-400 mt-1">
                        {lead.source} · {new Date(lead.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {STATUS_OPTS.filter(s => s !== lead.status).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(lead.id, s)}
                          className="text-xs px-2 py-1 rounded border text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          → {STATUS_LABEL[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
