"use client"

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Loader2, Key, User, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

type UserInfo = {
  id: number
  email: string
  name: string
  role: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info')
  
  // Account info form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [savingInfo, setSavingInfo] = useState(false)

  // Password form states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => {
        if (!r.ok) throw new Error('Unauthorized')
        return r.json()
      })
      .then(data => {
        setUser(data.user)
        setName(data.user.name)
        setEmail(data.user.email)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  async function handleInfoChange(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSavingInfo(true)

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()
      setSavingInfo(false)

      if (!res.ok) {
        setError(data.error || 'Cập nhật thông tin thất bại')
        return
      }

      setSuccess('Cập nhật thông tin tài khoản thành công!')
      setUser(data.user)
    } catch {
      setSavingInfo(false)
      setError('Đã xảy ra lỗi kết nối')
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp')
      return
    }

    setSaving(true)

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()
      setSaving(false)

      if (!res.ok) {
        setError(data.error || 'Đổi mật khẩu thất bại')
        return
      }

      setSuccess('Đổi mật khẩu thành công!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      setSaving(false)
      setError('Đã xảy ra lỗi kết nối')
    }
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-6 bg-slate-50/50 min-h-[calc(100vh-64px)]">
        {/* Page Title Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hồ Sơ Cá Nhân</h1>
            <p className="text-xs text-slate-500 font-light mt-1">Quản lý thông tin bảo mật và tài khoản của bạn</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-slate-400 font-light gap-2">
            <Loader2 className="size-5 text-[#e06f46] animate-spin" />
            <span>Đang tải thông tin tài khoản...</span>
          </div>
        ) : !user ? (
          <div className="p-8 text-center text-red-500">Không thể tải thông tin người dùng.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            
            {/* User Profile Card (Left Side) */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-[#e06f46] to-[#c9a84c] relative" />
                <CardContent className="pt-0 px-6 pb-6 relative text-center -mt-12 flex flex-col items-center">
                  {/* User Initial Avatar */}
                  <div className="size-20 rounded-full border-4 border-white bg-slate-950 text-white flex items-center justify-center font-serif text-3xl font-bold shadow-md select-none">
                    {user.name.substring(0, 1).toUpperCase()}
                  </div>
                  
                  <h2 className="text-lg font-bold text-slate-900 mt-4 leading-snug">{user.name}</h2>
                  <p className="text-xs text-slate-400 font-light mt-0.5">{user.email}</p>
                  
                  <Separator className="bg-slate-100 my-5" />
                  
                  <div className="w-full space-y-3.5 text-left">
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="block font-bold text-slate-800">Quyền hạn hệ thống</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{user.role}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <User className="size-4 text-[#e06f46] shrink-0" />
                      <div>
                        <span className="block font-bold text-slate-800">Trạng thái tài khoản</span>
                        <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">Đang hoạt động</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabbed Settings Panel (Right Side) */}
            <div className="lg:col-span-2">
              <Card className="border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden flex flex-col">
                
                {/* Tab Navigation */}
                <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('info'); setError(''); setSuccess('') }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                      activeTab === 'info'
                        ? "bg-white text-slate-800 shadow-sm border border-slate-200/50"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                    )}
                  >
                    <User className="size-4 text-[#e06f46]" />
                    <span>Thông tin tài khoản</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('security'); setError(''); setSuccess('') }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                      activeTab === 'security'
                        ? "bg-white text-slate-800 shadow-sm border border-slate-200/50"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                    )}
                  >
                    <Key className="size-4 text-[#e06f46]" />
                    <span>Bảo mật & Đổi mật khẩu</span>
                  </button>
                </div>

                <CardContent className="p-6 flex-1">
                  {activeTab === 'info' ? (
                    <form onSubmit={handleInfoChange} className="space-y-4 max-w-md">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-semibold text-slate-800 tracking-tight">Họ và tên hiển thị</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Ví dụ: Admin Nguyễn"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                          className="bg-slate-50/50 border-slate-200 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-slate-800 placeholder-slate-400 rounded-lg h-10 text-xs font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold text-slate-800 tracking-tight">Địa chỉ Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@coastal.vn"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          className="bg-slate-50/50 border-slate-200 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-slate-800 placeholder-slate-400 rounded-lg h-10 text-xs font-bold"
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 text-xs text-red-600 rounded-lg border border-red-200/50 font-medium">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="p-3 bg-emerald-50 text-xs text-emerald-600 rounded-lg border border-emerald-200/50 font-medium flex items-center gap-1.5 animate-in fade-in duration-300">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                          <span>{success}</span>
                        </div>
                      )}

                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          disabled={savingInfo}
                          className="bg-[#e06f46] hover:bg-[#d05e36] text-white rounded-lg h-10 px-5 font-semibold transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center gap-2 text-xs"
                        >
                          {savingInfo && <Loader2 className="size-4 animate-spin" />}
                          <span>{savingInfo ? 'Đang cập nhật...' : 'Lưu thay đổi'}</span>
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                      <div className="space-y-1.5">
                        <Label htmlFor="currentPassword" className="text-xs font-semibold text-slate-800 tracking-tight">Mật khẩu hiện tại</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="••••••••"
                          value={currentPassword}
                          onChange={e => setCurrentPassword(e.target.value)}
                          required
                          className="bg-slate-50/50 border-slate-200 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-slate-800 placeholder-slate-400 rounded-lg h-10 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="newPassword" className="text-xs font-semibold text-slate-800 tracking-tight">Mật khẩu mới</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          required
                          className="bg-slate-50/50 border-slate-200 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-slate-800 placeholder-slate-400 rounded-lg h-10 text-sm"
                        />
                        <p className="text-[10px] text-slate-400 font-light leading-normal">Mật khẩu mới phải từ 6 ký tự trở lên.</p>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword" className="text-xs font-semibold text-slate-800 tracking-tight">Xác nhận mật khẩu mới</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          required
                          className="bg-slate-50/50 border-slate-200 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-slate-800 placeholder-slate-400 rounded-lg h-10 text-sm"
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 text-xs text-red-600 rounded-lg border border-red-200/50 font-medium">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="p-3 bg-emerald-50 text-xs text-emerald-600 rounded-lg border border-emerald-200/50 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                          <span>{success}</span>
                        </div>
                      )}

                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          disabled={saving}
                          className="bg-[#e06f46] hover:bg-[#d05e36] text-white rounded-lg h-10 px-5 font-semibold transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center gap-2 text-xs"
                        >
                          {saving && <Loader2 className="size-4 animate-spin" />}
                          <span>{saving ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}</span>
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  )
}
