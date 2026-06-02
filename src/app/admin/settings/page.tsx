"use client"

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const FIELDS = [
  { key: 'price_range', label: 'Khoảng giá', placeholder: '4.8 Tỷ – 30 Tỷ' },
  { key: 'open_date', label: 'Ngày mở bán (YYYY-MM-DD)', placeholder: '2026-06-27' },
  { key: 'hotline', label: 'Hotline', placeholder: '0365 285 863' },
  { key: 'total_units', label: 'Số căn', placeholder: '1111' },
  { key: 'area_ha', label: 'Diện tích (ha)', placeholder: '93.9' },
  { key: 'total_investment', label: 'Vốn đầu tư (nghìn tỷ)', placeholder: '7.100' },
  { key: 'density', label: 'Mật độ xây dựng (%)', placeholder: '14.4' },
]

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => { setValues(data); setLoading(false) })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt nội dung</h1>
          <p className="text-sm text-gray-500 mt-1">Thay đổi thông số hiển thị mà không cần deploy lại</p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-base">Thông số dự án</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-gray-400 py-4">Đang tải…</p>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                {FIELDS.map(f => (
                  <div key={f.key} className="flex flex-col gap-1.5">
                    <Label htmlFor={f.key}>{f.label}</Label>
                    <Input
                      id={f.key}
                      value={values[f.key] ?? ''}
                      onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}

                <Button type="submit" disabled={saving} className="mt-2">
                  {saved ? '✓ Đã lưu' : saving ? 'Đang lưu…' : 'Lưu thay đổi'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
