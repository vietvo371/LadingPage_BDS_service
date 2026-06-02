"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import AdminLayout from '@/components/admin/AdminLayout'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
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
  LayoutTemplate,
  Search,
  RotateCcw,
  X
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

const MOCK_DEFAULTS: SettingsMap = {
  price_range: "4.8 Tỷ – 30 Tỷ",
  location: "Xã Tư Nghĩa – Quảng Ngãi",
  hotline: "0365 285 863",
  zalo_link: "https://zalo.me/0365285863",
  open_date: "2026-06-27",
  open_date_time: "2026-06-27T08:00:00",
  open_title: "Sự Kiện Mở Bán — Giai Đoạn 1",
  total_units: "1111",
  area_ha: "93.9",
  total_investment: "7.100",
  density: "14.4",
  about_quote: "Khởi nguồn từ khát vọng kiến tạo một biểu tượng sống mới, Coastal Quảng Ngãi mang đến đặc quyền sống tinh hoa – nơi thiên nhiên khoáng đạt giao hòa cùng nhịp giao thương sầm uất ngay trung tâm thành phố.",
  about_desc: "Dưới bàn tay tâm huyết của Chủ đầu tư Haus Quảng Ngãi, dự án tự hào là khu đô thị sinh thái biển tiên phong sở hữu tọa độ vàng \"Kề giang – Cận hải\" vô cùng hiếm có. Tại đây, mỗi ngày trôi qua là một trải nghiệm sống chuẩn mực bên bờ sông Trà Khúc thơ mộng, quyện cùng hơi thở tươi mát của đại dương bao la.",
  agent_name: "Nguyễn Quốc Trung",
  agent_team: "Đội ngũ sàn PQR",
  agent_avatar: "/images/logo/avt_trung.jpg",
  agent_join_year: "2026",
  agent_bookings: "5",
  agent_address: "308 Hai Bà Trưng · Quảng Ngãi",
  property_info_html: `<div>
  <p><strong>Quy Mô Tầm Cỡ – Khắc Họa Biểu Tượng Mới</strong></p>
  <p>Được quy hoạch bài bản để trở thành một quần thể đô thị đồng bộ và đẳng cấp, Coastal Quảng Ngãi (Haus Coastal Quảng Ngãi) gây ấn tượng mạnh mẽ bởi những con số biết nói:</p>
  <ul>
    <li><strong>Tổng diện tích:</strong> Lên đến 93.9 ha.</li>
    <li><strong>Tổng vốn đầu tư:</strong> Hơn 7.100 tỷ đồng – minh chứng rõ nét cho tầm vóc và tiềm lực vững chắc của dự án.</li>
    <li><strong>Mật độ xây dựng:</strong> Chỉ khoảng 14.4%. Phần lớn quỹ đất dành cho cảnh quan xanh, mặt nước và tiện ích độc quyền.</li>
    <li><strong>Bộ sưu tập sản phẩm:</strong> Cung cấp gần hơn khoảng 1111 sản phẩm đa dạng.</li>
  </ul>
  <p><br></p>
  <p><strong>Giải Mã Sức Hút Của Coastal Quảng Ngãi:</strong></p>
  <p><strong>1. Vị Trí Kim Cương – Kết Nối Tinh Hoa</strong><br/>Kết nối trực tiếp đến bờ biển Mỹ Khê tuyệt đẹp và trung tâm TP. Quảng Ngãi thông qua Cầu Cửa Đại.</p>
  <p><strong>2. Không Gian Sống Chất Lành</strong><br/>Với mật độ xây dựng cực thấp, Coastal Quảng Ngãi kiến tạo một màng xanh không lây ngay cửa biển.</p>
  <p><strong>3. Bảo Chứng Đầu Tư – Pháp Lý Vững Chắc</strong><br/>Giữa những biến động của thị trường, dự án mang đến an tâm tuyệt đối với sổ đỏ sở hữu lâu dài.</p>
  <p><strong>4. Chính Sách Bán Hàng Ưu Việt</strong><br/>Các chính sách thanh toán ưu đãi từ Chủ đầu tư mang đến những đặc quyền tối ưu.</p>
</div>`,
  amenities_html: `<div>
  <p><strong>Sinh Hoạt Cộng Đồng</strong></p>
  <ul>
    <li>Điểm ngắm hoàng hôn</li>
    <li>Công viên rừng ngập mặn</li>
    <li>Khu vui chơi thám hiểm rừng</li>
    <li>Đường dạo ven biển – ven sông</li>
  </ul>
  <p><br></p>
  <p><strong>Thể Thao & Giải Trí</strong></p>
  <ul>
    <li>Resort 5 sao</li>
    <li>Design Exhibition</li>
    <li>Trung tâm chăm sóc sức khoẻ</li>
    <li>Công viên thể thao ven sông</li>
  </ul>
  <p><br></p>
  <p><strong>Thương Mại Dịch Vụ</strong></p>
  <ul>
    <li>Quảng trường biển</li>
    <li>Quảng trường chợ nổi</li>
    <li>Phố mua sắm ẩm thực</li>
    <li>Trường liên cấp quốc tế</li>
  </ul>
</div>`,
}

function ImageUpload({ value, onChange, placeholder }: { value: string, onChange: (url: string) => void, placeholder?: string }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {value && (
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-sm">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center gap-2">
        <Input 
          type="file" 
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="h-8 text-[11px] border-slate-200 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-[#e06f46]/10 hover:file:text-[#e06f46] cursor-pointer pt-[3px] flex-1"
        />
        {uploading && <Loader2 className="size-4 animate-spin text-[#e06f46] shrink-0" />}
      </div>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? "Đường dẫn ảnh..."}
        className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
      />
    </div>
  );
}

export default function WordPressEditorPage() {
  const [values, setValues] = useState<SettingsMap>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeSection, setActiveSection] = useState<string>('general')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => { 
        setValues({ ...MOCK_DEFAULTS, ...data })
        setLoading(false) 
      })
  }, [])

  // Warning when leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = 'Bạn có thay đổi chưa xuất bản. Bạn có chắc chắn muốn rời đi?'
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  async function handlePublish() {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    setIsDirty(false)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updateKey = (key: keyof SettingsMap, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }))
    setIsDirty(true)
  }

  const toggleSection = (section: string) => {
    setActiveSection(prev => (prev === section ? '' : section))
  }

  const handleResetToDefaults = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục toàn bộ nội dung về bản thiết kế gốc (Mockup)?")) {
      setValues(MOCK_DEFAULTS)
      setIsDirty(true)
    }
  }

  const matchesSearch = (title: string, keywords: string[]) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return title.toLowerCase().includes(q) || keywords.some(k => k.toLowerCase().includes(q))
  }

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-slate-100">
        
        {/* Left Side: Element Editor Panel (WordPress Style Sidebar) */}
        <div className="w-full lg:w-[420px] bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-lg">
          
          {/* Header of Visual Customizer */}
          <div className="p-5 border-b border-slate-200/80 bg-white text-slate-800 shrink-0 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-[#e06f46]/10 p-1.5 rounded-md">
                  <LayoutTemplate className="size-4 text-[#e06f46]" />
                </div>
                <h1 className="text-sm font-black tracking-tight uppercase">Live Editor</h1>
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Chỉnh sửa nội dung trực quan</p>
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

          {/* Quick Search & Actions Toolbar */}
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex gap-2.5 items-center shrink-0">
            {/* Search Input Group */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm cài đặt..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#e06f46] focus:ring-1 focus:ring-[#e06f46]/30 transition-all placeholder:text-slate-400 font-semibold"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleResetToDefaults}
              className="h-8 border-slate-200 text-slate-500 hover:text-slate-900 bg-white shadow-sm shrink-0 flex items-center gap-1 text-[11px] font-bold rounded-lg px-2 hover:bg-slate-100 active:scale-95 transition-all"
              title="Khôi phục mặc định bản thiết kế"
            >
              <RotateCcw className="size-3.5 text-slate-500" />
              <span className="hidden sm:inline">Khôi phục</span>
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
                {matchesSearch("Đầu trang & Liên hệ", ["hotline", "zalo", "liên hệ", "điện thoại", "chat", "đầu trang", "footer"]) && (
                  <EditorAccordion
                    title="Đầu trang & Liên hệ"
                    icon={Phone}
                    isOpen={activeSection === 'general' || searchQuery !== ''}
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
                )}

                {/* Section 2: Giá & Vị trí */}
                {matchesSearch("Giá & Vị trí hiển thị", ["giá", "khoảng giá", "vị trí", "địa chỉ", "bản đồ", "tư nghĩa", "quảng ngãi", "location", "pricing"]) && (
                  <EditorAccordion
                    title="Giá & Vị trí hiển thị"
                    icon={MapPin}
                    isOpen={activeSection === 'pricing' || searchQuery !== ''}
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
                )}

                {/* Section 3: Lời giới thiệu */}
                {matchesSearch("Mô tả & Lời giới thiệu", ["mô tả", "giới thiệu", "khẩu hiệu", "about", "quote", "trích dẫn", "slogan"]) && (
                  <EditorAccordion
                    title="Mô tả & Lời giới thiệu"
                    icon={FileText}
                    isOpen={activeSection === 'about' || searchQuery !== ''}
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
                )}

                {/* Section 4: Đồng hồ mở bán */}
                {matchesSearch("Sự kiện Mở Bán & Đồng Hồ", ["mở bán", "sự kiện", "đồng hồ", "countdown", "ngày", "thời gian", "lịch"]) && (
                  <EditorAccordion
                    title="Sự kiện Mở Bán & Đồng Hồ"
                    icon={Clock}
                    isOpen={activeSection === 'countdown' || searchQuery !== ''}
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
                        <Label className="text-xs font-bold text-slate-700">Ngày mở bán dự kiến</Label>
                        <Input
                          type="date"
                          value={values.open_date ?? ''}
                          onChange={e => updateKey('open_date', e.target.value)}
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Mốc thời gian chính xác</Label>
                        <Input
                          type="datetime-local"
                          value={values.open_date_time ?? ''}
                          onChange={e => updateKey('open_date_time', e.target.value)}
                          className="bg-slate-50 border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#e06f46]/50 focus:border-[#e06f46]"
                        />
                      </div>
                    </div>
                  </EditorAccordion>
                )}

                {/* Section 5: Thông số kỹ thuật */}
                {matchesSearch("Thông số & Quy mô dự án", ["thông số", "quy mô", "diện tích", "vốn đầu tư", "mật độ", "sản phẩm", "căn", "kỹ thuật", "scale"]) && (
                  <EditorAccordion
                    title="Thông số & Quy mô dự án"
                    icon={TrendingUp}
                    isOpen={activeSection === 'stats' || searchQuery !== ''}
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
                )}

                {/* Section 6: Chi tiết Thông tin Dự án */}
                {matchesSearch("Thông tin Bất Động Sản", ["thông tin", "bất động sản", "chi tiết", "bài viết", "mô tả", "quy mô", "giải mã"]) && (
                  <EditorAccordion
                    title="Thông tin Bất Động Sản"
                    icon={FileText}
                    isOpen={activeSection === 'property_info' || searchQuery !== ''}
                    onClick={() => toggleSection('property_info')}
                  >
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Nội dung chi tiết dự án</Label>
                      <div className="bg-white">
                        <ReactQuill 
                          theme="snow" 
                          value={values.property_info_html ?? ''} 
                          onChange={(content) => updateKey('property_info_html', content)} 
                          className="h-48 mb-12"
                        />
                      </div>
                    </div>
                  </EditorAccordion>
                )}

                {/* Section 7: Tiện ích Dự án */}
                {matchesSearch("Tiện ích Dự án", ["tiện ích", "dịch vụ", "cộng đồng", "thể thao", "giải trí", "thương mại"]) && (
                  <EditorAccordion
                    title="Tiện ích Dự án"
                    icon={TrendingUp}
                    isOpen={activeSection === 'amenities' || searchQuery !== ''}
                    onClick={() => toggleSection('amenities')}
                  >
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Nội dung tiện ích</Label>
                      <div className="bg-white">
                        <ReactQuill 
                          theme="snow" 
                          value={values.amenities_html ?? ''} 
                          onChange={(content) => updateKey('amenities_html', content)} 
                          className="h-48 mb-12"
                        />
                      </div>
                    </div>
                  </EditorAccordion>
                )}

                {/* Section 8: Tư vấn viên */}
                {matchesSearch("Hồ sơ tư vấn viên", ["tư vấn", "nhân viên", "môi giới", "hồ sơ", "agent", "avatar", "đội ngũ", "booking", "address", "nguyễn quốc trung", "trung"]) && (
                  <EditorAccordion
                    title="Hồ sơ tư vấn viên"
                    icon={User}
                    isOpen={activeSection === 'agent' || searchQuery !== ''}
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
                        <Label className="text-xs font-bold text-slate-700">Ảnh chân dung (Avatar)</Label>
                        <ImageUpload
                          value={values.agent_avatar ?? ''}
                          onChange={url => updateKey('agent_avatar', url)}
                          placeholder="Đường dẫn ảnh..."
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
                )}
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
