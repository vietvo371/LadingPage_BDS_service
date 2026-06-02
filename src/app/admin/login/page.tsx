"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Đăng nhập thất bại')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans text-white">
      {/* Left panel: Hero image & luxury info (desktop only) */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden bg-black select-none">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] hover:scale-105"
          style={{ backgroundImage: "url('/images/ngoai-that/phoi-canh-tong-the.jpg')" }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        {/* Ambient Gold Light Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a84c]/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full p-16">
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#e06f46] text-white shadow-lg shadow-[#e06f46]/20">
              <Building2 className="size-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-wider uppercase text-white">Haus Coastal</span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#c9a84c] font-semibold -mt-0.5">Quảng Ngãi</span>
            </div>
          </div>

          {/* Slogan details */}
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#c9a84c] rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
              Khu đô thị nghỉ dưỡng cao cấp
            </div>
            <h2 className="font-serif text-5xl font-bold leading-tight text-white tracking-tight">
              Khởi nguồn phong vị <br />
              <span className="text-[#e06f46]">sống thượng lưu</span> ven biển
            </h2>
            <p className="text-gray-400 text-base leading-relaxed font-light">
              Dự án Coastal Quảng Ngãi kiến tạo tiêu chuẩn mới cho bất động sản nghỉ dưỡng miền Trung, quy hoạch bởi SWECO và thiết kế kiến trúc từ GioForma danh tiếng toàn cầu.
            </p>
          </div>

          {/* Partner & Copyright */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <div className="text-xs text-gray-500 font-light">
              © 2026 Coastal Quảng Ngãi. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-gray-400">
              <span>GioForma</span>
              <span>SWECO</span>
              <span>100architects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel: Login form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-6 sm:px-12 py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e06f46]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 z-10">
          {/* Mobile logo */}
          <div className="flex lg:hidden flex-col items-center gap-2 text-center mb-6">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e06f46] text-white shadow-lg shadow-[#e06f46]/25">
              <Building2 className="size-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white tracking-wide">HAUS COASTAL</h1>
              <p className="text-xs text-[#c9a84c] tracking-[0.2em] font-medium uppercase mt-0.5">Quảng Ngãi</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
            
            <div className="space-y-2 mb-8">
              <h2 className="text-xl font-semibold text-white tracking-tight">Hệ Thống Nội Bộ</h2>
              <p className="text-sm text-gray-400">Vui lòng đăng nhập tài khoản quản trị</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-gray-300 font-medium tracking-wide uppercase">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@coastal.vn"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-slate-950/70 border-slate-800 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-white placeholder-gray-600 rounded-lg h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-xs text-gray-300 font-medium tracking-wide uppercase">Mật khẩu</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="bg-slate-950/70 border-slate-800 focus:border-[#e06f46]/50 focus:ring-[#e06f46]/30 text-white placeholder-gray-600 rounded-lg h-11"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-xs text-red-400 animate-fade-in">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-[#e06f46] hover:bg-[#d05e36] text-white rounded-lg h-11 font-medium transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#e06f46]/10 hover:shadow-[#e06f46]/20 flex items-center justify-center gap-2 group"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <span>Đăng nhập hệ thống</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <p className="text-center text-xs text-gray-600">
            Dành riêng cho nhân viên điều hành sàn PQR và đối tác liên kết.
          </p>
        </div>
      </div>
    </div>
  )
}
