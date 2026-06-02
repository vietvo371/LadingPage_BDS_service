"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-[#e06f46] mb-1">Coastal Quảng Ngãi</div>
          <div className="text-sm text-gray-500">Trang quản trị nội bộ</div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Đăng nhập</CardTitle>
            <CardDescription>Nhập thông tin tài khoản admin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@coastal.vn"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full mt-1" disabled={loading}>
                {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
