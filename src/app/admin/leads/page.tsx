"use client"

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download } from 'lucide-react'

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
const STATUS_LABEL: Record<string, string> = { NEW: 'Mới', CALLED: 'Đã gọi', CLOSED: 'Đã chốt' }
const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'outline'> = {
  NEW: 'default', CALLED: 'secondary', CLOSED: 'outline',
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
      ['ID', 'Tên', 'SĐT', 'Email', 'Nguồn', 'Trạng thái', 'Thời gian'],
      ...leads.map(l => [l.id, l.name, l.phone, l.email ?? '', l.source, STATUS_LABEL[l.status] ?? l.status, new Date(l.createdAt).toLocaleString('vi-VN')]),
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
    <AdminLayout>
      <header className="flex h-14 items-center justify-between border-b px-6">
        <div>
          <h1 className="text-base font-semibold">Khách hàng</h1>
          <p className="text-xs text-muted-foreground">{leads.length} leads tổng cộng</p>
        </div>
        <Button onClick={exportCSV} variant="outline" size="sm">
          <Download className="size-4" />
          Xuất CSV
        </Button>
      </header>

      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          {(['ALL', ...STATUS_OPTS] as string[]).map(s => (
            <Button key={s} onClick={() => setFilter(s)} variant={filter === s ? 'default' : 'outline'} size="sm">
              {s === 'ALL' ? 'Tất cả' : STATUS_LABEL[s]}
              <Badge variant="secondary" className="ml-1.5 text-xs">
                {s === 'ALL' ? leads.length : leads.filter(l => l.status === s).length}
              </Badge>
            </Button>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <p className="text-center py-12 text-muted-foreground text-sm">Đang tải...</p>
            ) : filtered.length === 0 ? (
              <p className="text-center py-12 text-muted-foreground text-sm">Không có lead nào</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Nguồn</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(lead => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        {lead.message && <div className="text-xs text-muted-foreground truncate max-w-48">{lead.message}</div>}
                      </TableCell>
                      <TableCell className="text-sm">{lead.phone}</TableCell>
                      <TableCell><span className="text-xs text-muted-foreground">{lead.source}</span></TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleString('vi-VN')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[lead.status] ?? 'outline'}>
                          {STATUS_LABEL[lead.status] ?? lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          {STATUS_OPTS.filter(s => s !== lead.status).map(s => (
                            <Button key={s} variant="ghost" size="sm" onClick={() => updateStatus(lead.id, s)} className="text-xs h-7">
                              {STATUS_LABEL[s]}
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
