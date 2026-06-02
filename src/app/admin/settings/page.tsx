"use client"

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Loader2, Save, FileText, Info, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const GENERAL_FIELDS = [
  { key: 'price_range', label: 'Khoảng giá hiển thị', placeholder: '4.8 Tỷ – 30 Tỷ', icon: Info },
  { key: 'open_date', label: 'Ngày mở bán (Countdown)', placeholder: '2026-06-27', hint: 'Định dạng YYYY-MM-DD', icon: Info },
  { key: 'hotline', label: 'Hotline liên hệ', placeholder: '0365 285 863', icon: Info },
]

const SPEC_FIELDS = [
  { key: 'total_units', label: 'Tổng số căn sản phẩm', placeholder: '1111', icon: BarChart2 },
  { key: 'area_ha', label: 'Tổng diện tích quy hoạch (ha)', placeholder: '93.9', icon: BarChart2 },
  { key: 'total_investment', label: 'Tổng vốn đầu tư (nghìn tỷ)', placeholder: '7.100', icon: BarChart2 },
  { key: 'density', label: 'Mật độ xây dựng (%)', placeholder: '14.4', icon: BarChart2 },
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
      <div className="p-8 space-y-6 bg-slate-50/50 min-h-[calc(100vh-64px)]">
        {/* Page Header Section inside content body */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Cài Đặt Nội Dung</h1>
            <p className="text-xs text-slate-500 font-light mt-1">Quản lý tham số hiển thị trên landing page thời gian thực</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="max-w-4xl space-y-6">
          <Card className="border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="px-6 py-5 bg-white">
              <div className="flex items-center gap-2">
                <FileText className="size-4.5 text-[#e06f46]" />
                <CardTitle className="text-sm font-bold text-gray-900">Thông Số Quản Trị Landing Page</CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-400 font-light mt-1">
                Thay đổi các giá trị bên dưới để cập nhật tức thì trên giao diện khách hàng mà không cần phải thực hiện deploy lại hệ thống.
              </CardDescription>
            </CardHeader>
            <Separator className="bg-slate-100" />
            
            <CardContent className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-sm text-slate-400 font-light">
                  <Loader2 className="size-5 text-[#e06f46] animate-spin" />
                  <span>Đang tải thông số dự án...</span>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Two columns grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* General Settings Column */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 pb-1">
                        <span className="h-4 w-1 bg-[#e06f46] rounded-full" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Thông tin liên hệ & Thời gian</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {GENERAL_FIELDS.map(f => (
                          <div key={f.key} className="space-y-1.5">
                            <Label htmlFor={f.key} className="text-xs font-semibold text-slate-800 tracking-tight">{f.label}</Label>
                            <Input
                              id={f.key}
                              value={values[f.key] ?? ''}
                              onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                              placeholder={f.placeholder}
                              className="bg-slate-50/50 border-slate-200 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-slate-800 placeholder-slate-400 rounded-lg h-10 text-sm"
                            />
                            {f.hint && <p className="text-[10px] text-slate-400 font-light leading-normal">{f.hint}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Technical Stats Column */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 pb-1">
                        <span className="h-4 w-1 bg-[#c9a84c] rounded-full" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Thông số kỹ thuật dự án</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {SPEC_FIELDS.map(f => (
                          <div key={f.key} className="space-y-1.5">
                            <Label htmlFor={f.key} className="text-xs font-semibold text-slate-800 tracking-tight">{f.label}</Label>
                            <Input
                              id={f.key}
                              value={values[f.key] ?? ''}
                              onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                              placeholder={f.placeholder}
                              className="bg-slate-50/50 border-slate-200 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-slate-800 placeholder-slate-400 rounded-lg h-10 text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <Separator className="bg-slate-100 pt-2" />

                  {/* Actions & Feedback */}
                  <div className="flex items-center gap-4 pt-2">
                    <Button 
                      type="submit" 
                      disabled={saving} 
                      className="bg-[#e06f46] hover:bg-[#d05e36] text-white rounded-lg h-10 px-5 font-semibold transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center gap-2 shrink-0"
                    >
                      {saving ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Save className="size-4" />
                      )}
                      <span>{saving ? 'Đang ghi nhận...' : 'Lưu tất cả thay đổi'}</span>
                    </Button>
                    
                    {saved && (
                      <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium animate-fade-in bg-emerald-50 border border-emerald-200/50 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                        <span>Đã cập nhật hệ thống thành công</span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </AdminLayout>
  )
}
