"use client"

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Loader2 } from 'lucide-react'

const FIELDS = [
  { key: 'price_range', label: 'Khoảng giá', placeholder: '4.8 Tỷ – 30 Tỷ' },
  { key: 'open_date', label: 'Ngày mở bán', placeholder: '2026-06-27', hint: 'Định dạng YYYY-MM-DD' },
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
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AdminLayout>
      <header className="flex h-14 items-center border-b px-6">
        <div>
          <h1 className="text-base font-semibold">Cài đặt nội dung</h1>
          <p className="text-xs text-muted-foreground">Thay đổi thông số không cần deploy lại</p>
        </div>
      </header>

      <div className="p-6">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Thông số dự án</CardTitle>
            <CardDescription>Chỉnh sửa thông tin hiển thị trên trang chủ</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Đang tải...
              </div>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                {FIELDS.map(f => (
                  <div key={f.key} className="flex flex-col gap-1.5">
                    <Label htmlFor={f.key}>{f.label}</Label>
                    <Input
                      id={f.key}
                      value={values[f.key] ?? ''}
                      onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                    />
                    {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="size-4 animate-spin" />}
                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </Button>
                  {saved && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                      <CheckCircle2 className="size-4" />
                      Đã lưu
                    </span>
                  )}
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
