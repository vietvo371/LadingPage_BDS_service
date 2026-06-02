"use client"

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle2, 
  Loader2, 
  Save, 
  FileText, 
  Info, 
  Smartphone, 
  Tablet, 
  Monitor, 
  HelpCircle, 
  Phone, 
  Clock, 
  MapPin, 
  User, 
  TrendingUp,
  Sliders,
  ChevronDown,
  Globe
} from 'lucide-react'
import { SettingsProvider, SettingsMap } from '@/components/SettingsProvider'

// Import components for live preview
import Header from '@/components/Header'
import GalleryMosaic from '@/components/GalleryMosaic'
import PropertyMain from '@/components/PropertyMain'
import PropertySidebar from '@/components/PropertySidebar'
import Footer from '@/components/Footer'

// Collapsible accordion group component
function EditorAccordion({ title, icon: Icon, children, isOpen, onClick }: {
  title: string
  icon: any
  children: React.ReactNode
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-200">
      <button
        type="button"
        onClick={onClick}
        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#e06f46]/10 text-[#e06f46]">
            <Icon className="size-4 shrink-0" />
          </div>
          <span className="text-xs font-bold tracking-tight text-slate-800 uppercase">{title}</span>
        </div>
        <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-5 border-t border-slate-100 space-y-4 bg-white animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}

export default function WordPressEditorPage() {
  const [values, setValues] = useState<SettingsMap>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeSection, setActiveSection] = useState<string>('general')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => { 
        setValues(data)
        setLoading(false) 
      })
  }, [])

  async function handlePublish() {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updateKey = (key: keyof SettingsMap, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  const toggleSection = (section: string) => {
    setActiveSection(prev => (prev === section ? '' : section))
  }

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-slate-100">
        
        {/* Left Side: Element Editor Panel (WordPress Style Sidebar) */}
        <div className="w-full lg:w-[420px] bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-lg">
          
          {/* Header of Visual Customizer */}
          <div className="p-5 border-b border-slate-200/80 bg-slate-950 text-white shrink-0 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Globe className="size-4 text-[#e06f46] animate-pulse" />
                <h1 className="text-sm font-black tracking-tight uppercase">WordPress Editor</h1>
              </div>
              <p className="text-[10px] text-slate-400 font-light mt-0.5">Chỉnh sửa nội dung Landing Page trực quan</p>
            </div>
            
            <Button
              onClick={handlePublish}
              disabled={saving || loading}
              className="bg-[#e06f46] hover:bg-[#d05e36] text-white text-[11px] font-bold h-8 px-4 rounded-lg shadow-md hover:shadow-[#e06f46]/20 transition-all duration-200 flex items-center gap-1.5 shrink-0"
            >
              {saving ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}
              <span>{saving ? 'Đang lưu...' : 'Xuất bản'}</span>
            </Button>
          </div>

          {/* Form Content Panel */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-sm text-slate-400 font-light">
                <Loader2 className="size-6 text-[#e06f46] animate-spin" />
                <span>Đang đồng bộ giao diện...</span>
              </div>
            ) : (
              <>
                {/* Visual Feedback Message */}
                {saved && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl animate-in fade-in duration-300">
                    <CheckCircle2 className="size-4.5 text-emerald-500 shrink-0" />
                    <span>Đã đồng bộ thay đổi lên Landing Page trực tiếp!</span>
                  </div>
                )}

                {/* Section 1: Cấu hình chung & Header */}
                <EditorAccordion
                  title="Đầu trang & Liên hệ"
                  icon={Phone}
                  isOpen={activeSection === 'general'}
                  onClick={() => toggleSection('general')}
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Hotline liên hệ</Label>
                      <Input
                        value={values.hotline ?? ''}
                        onChange={e => updateKey('hotline', e.target.value)}
                        placeholder="Ví dụ: 0365 285 863"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Đường dẫn Zalo Chat</Label>
                      <Input
                        value={values.zalo_link ?? ''}
                        onChange={e => updateKey('zalo_link', e.target.value)}
                        placeholder="Ví dụ: https://zalo.me/0365285863"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                  </div>
                </EditorAccordion>

                {/* Section 2: Giá & Vị trí */}
                <EditorAccordion
                  title="Giá & Vị trí hiển thị"
                  icon={MapPin}
                  isOpen={activeSection === 'pricing'}
                  onClick={() => toggleSection('pricing')}
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Khoảng giá dự án</Label>
                      <Input
                        value={values.price_range ?? ''}
                        onChange={e => updateKey('price_range', e.target.value)}
                        placeholder="Ví dụ: 4.8 Tỷ – 30 Tỷ"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Địa điểm / Xã huyện</Label>
                      <Input
                        value={values.location ?? ''}
                        onChange={e => updateKey('location', e.target.value)}
                        placeholder="Ví dụ: Xã Tư Nghĩa – Quảng Ngãi"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                  </div>
                </EditorAccordion>

                {/* Section 3: Lời giới thiệu */}
                <EditorAccordion
                  title="Mô tả & Lời giới thiệu"
                  icon={FileText}
                  isOpen={activeSection === 'about'}
                  onClick={() => toggleSection('about')}
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Khẩu hiệu dự án (Quote Box)</Label>
                      <textarea
                        value={values.about_quote ?? ''}
                        onChange={e => updateKey('about_quote', e.target.value)}
                        placeholder="Nội dung câu trích dẫn nổi bật..."
                        rows={3}
                        className="w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs transition-colors outline-none resize-none focus-visible:border-[#e06f46] focus-visible:ring-1 focus-visible:ring-[#e06f46]/50 placeholder:text-slate-400 text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Đoạn mô tả giới thiệu chính</Label>
                      <textarea
                        value={values.about_desc ?? ''}
                        onChange={e => updateKey('about_desc', e.target.value)}
                        placeholder="Nội dung đoạn giới thiệu..."
                        rows={4}
                        className="w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs transition-colors outline-none resize-none focus-visible:border-[#e06f46] focus-visible:ring-1 focus-visible:ring-[#e06f46]/50 placeholder:text-slate-400 text-slate-800"
                      />
                    </div>
                  </div>
                </EditorAccordion>

                {/* Section 4: Đồng hồ mở bán */}
                <EditorAccordion
                  title="Sự kiện Mở Bán & Đồng Hồ"
                  icon={Clock}
                  isOpen={activeSection === 'countdown'}
                  onClick={() => toggleSection('countdown')}
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Tiêu đề sự kiện</Label>
                      <Input
                        value={values.open_title ?? ''}
                        onChange={e => updateKey('open_title', e.target.value)}
                        placeholder="Ví dụ: Sự Kiện Mở Bán — Giai Đoạn 1"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Ngày mở bán dự kiến (Định dạng YYYY-MM-DD)</Label>
                      <Input
                        value={values.open_date ?? ''}
                        onChange={e => updateKey('open_date', e.target.value)}
                        placeholder="Ví dụ: 2026-06-27"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Mốc thời gian chính xác (ISO format)</Label>
                      <Input
                        value={values.open_date_time ?? ''}
                        onChange={e => updateKey('open_date_time', e.target.value)}
                        placeholder="Ví dụ: 2026-06-27T08:00:00"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                  </div>
                </EditorAccordion>

                {/* Section 5: Thông số kỹ thuật */}
                <EditorAccordion
                  title="Thông số & Quy mô dự án"
                  icon={TrendingUp}
                  isOpen={activeSection === 'stats'}
                  onClick={() => toggleSection('stats')}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Quy mô (ha)</Label>
                        <Input
                          value={values.area_ha ?? ''}
                          onChange={e => updateKey('area_ha', e.target.value)}
                          placeholder="Ví dụ: 93.9"
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Mật độ xây dựng (%)</Label>
                        <Input
                          value={values.density ?? ''}
                          onChange={e => updateKey('density', e.target.value)}
                          placeholder="Ví dụ: 14.4"
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Tổng sản phẩm</Label>
                        <Input
                          value={values.total_units ?? ''}
                          onChange={e => updateKey('total_units', e.target.value)}
                          placeholder="Ví dụ: 1111"
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Tổng vốn (nghìn tỷ)</Label>
                        <Input
                          value={values.total_investment ?? ''}
                          onChange={e => updateKey('total_investment', e.target.value)}
                          placeholder="Ví dụ: 7.100"
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                    </div>
                  </div>
                </EditorAccordion>

                {/* Section 6: Tư vấn viên */}
                <EditorAccordion
                  title="Hồ sơ tư vấn viên"
                  icon={User}
                  isOpen={activeSection === 'agent'}
                  onClick={() => toggleSection('agent')}
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Họ và tên tư vấn viên</Label>
                      <Input
                        value={values.agent_name ?? ''}
                        onChange={e => updateKey('agent_name', e.target.value)}
                        placeholder="Ví dụ: Nguyễn Quốc Trung"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Đội ngũ sàn giao dịch</Label>
                      <Input
                        value={values.agent_team ?? ''}
                        onChange={e => updateKey('agent_team', e.target.value)}
                        placeholder="Ví dụ: Đội ngũ sàn PQR"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Đường dẫn ảnh chân dung (Avatar)</Label>
                      <Input
                        value={values.agent_avatar ?? ''}
                        onChange={e => updateKey('agent_avatar', e.target.value)}
                        placeholder="Đường dẫn ảnh..."
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Số Booking đã nhận</Label>
                        <Input
                          value={values.agent_bookings ?? ''}
                          onChange={e => updateKey('agent_bookings', e.target.value)}
                          placeholder="Ví dụ: 5"
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Năm tham gia sàn</Label>
                        <Input
                          value={values.agent_join_year ?? ''}
                          onChange={e => updateKey('agent_join_year', e.target.value)}
                          placeholder="Ví dụ: 2026"
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Địa chỉ văn phòng</Label>
                      <Input
                        value={values.agent_address ?? ''}
                        onChange={e => updateKey('agent_address', e.target.value)}
                        placeholder="Ví dụ: 308 Hai Bà Trưng · Quảng Ngãi"
                        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                      />
                    </div>
                  </div>
                </EditorAccordion>
              </>
            )}
          </div>

          {/* Tips Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 flex items-start gap-2 shrink-0">
            <Info className="size-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="font-light leading-normal">
              Các giá trị nhập bên trái sẽ <strong>cập nhật trực quan lập tức</strong> lên khung xem trước bên phải để bạn kiểm tra bố cục trước khi "Xuất bản".
            </p>
          </div>
        </div>

        {/* Right Side: High Fidelity Multi-Device Live Preview Frame */}
        <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden">
          
          {/* Toolbar Preview Control */}
          <div className="h-14 border-b border-slate-200/80 bg-white px-6 shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold tracking-tight text-slate-700">Chế độ xem thử: Real-time Live Preview</span>
            </div>

            {/* Device Switcher Controls */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${previewMode === 'desktop' ? 'bg-[#e06f46] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                title="Xem bản Desktop"
              >
                <Monitor className="size-4" />
                <span className="hidden md:inline text-[10px]">Máy tính</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('tablet')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${previewMode === 'tablet' ? 'bg-[#e06f46] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                title="Xem bản Máy tính bảng"
              >
                <Tablet className="size-4" />
                <span className="hidden md:inline text-[10px]">Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${previewMode === 'mobile' ? 'bg-[#e06f46] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                title="Xem bản Di động"
              >
                <Smartphone className="size-4" />
                <span className="hidden md:inline text-[10px]">Di động</span>
              </button>
            </div>
          </div>

          {/* Main Preview Container Frame */}
          <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-slate-200/60 no-scrollbar">
            
            {/* Device Layout Wrapper Frame */}
            <div 
              className={`bg-white transition-all duration-300 ease-out border shadow-2xl relative select-none rounded-2xl overflow-hidden flex flex-col
                ${previewMode === 'desktop' ? 'w-full max-w-[1280px] h-[calc(100vh-220px)] border-slate-300' : ''}
                ${previewMode === 'tablet' ? 'w-[768px] h-[calc(100vh-220px)] border-slate-400 border-[10px] rounded-[24px]' : ''}
                ${previewMode === 'mobile' ? 'w-[375px] h-[640px] border-slate-800 border-[12px] rounded-[36px]' : ''}
              `}
            >
              
              {/* If Mobile, show simulated notch */}
              {previewMode === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-b-xl z-[100] flex items-center justify-center">
                  <span className="size-1.5 rounded-full bg-slate-600 mr-2" />
                  <span className="w-10 h-1 bg-slate-900 rounded-full" />
                </div>
              )}

              {/* Dynamic scroll preview body */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar w-full h-full relative bg-white">
                {/* Wrap in SettingsProvider using values directly from the edit state */}
                <SettingsProvider settings={values}>
                  <Header isPreview={true} />
                  <main className="pt-[60px]">
                    <GalleryMosaic />
                    <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-10">
                      <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex-1 min-w-0">
                          <PropertyMain />
                        </div>
                        <div className="lg:w-[380px] flex-shrink-0">
                          <PropertySidebar />
                        </div>
                      </div>
                    </div>
                  </main>
                  <Footer />
                </SettingsProvider>
              </div>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  )
}
