"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminSidebar from './AdminSidebar'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type UserSession = {
  id: number
  email: string
  name: string
  role: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState<UserSession | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => {
        if (!r.ok) throw new Error('Unauthorized')
        return r.json()
      })
      .then(data => {
        setUser(data.user)
      })
      .catch(() => {
        // Fallback if needed
      })
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50/40">
      {/* Desktop Sidebar (Fixed Left) */}
      <AdminSidebar 
        className={`hidden lg:flex fixed top-0 left-0 bottom-0 z-40 h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Panel Content Wrapper */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        
        {/* Responsive Sticky Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-30 flex items-center px-6 md:px-8 justify-between">
          <div className="flex items-center gap-4">
            
            {/* Mobile Menu Trigger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="lg:hidden hover:bg-slate-100 rounded-xl size-9 shrink-0">
                    <Menu className="h-5 w-5 text-slate-600" />
                  </Button>
                }
              />
              <SheetContent side="left" className="p-0 w-64 border-none shadow-2xl bg-slate-950">
                <SheetTitle className="sr-only">Menu Quản trị</SheetTitle>
                <SheetDescription className="sr-only">Điều hướng các chức năng quản trị hệ thống</SheetDescription>
                <AdminSidebar setOpen={setOpen} className="w-full h-full border-none" />
              </SheetContent>
            </Sheet>

            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hidden sm:block">
              Hệ thống quản trị Coastal
            </h2>
          </div>

          {/* Right Header Navigation Details */}
          {user ? (
            <Link href="/admin/profile" className="flex items-center gap-3 pl-2 group cursor-pointer select-none">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold text-slate-800 leading-none group-hover:text-[#e06f46] transition-colors duration-200">
                  {user.name}
                </span>
                <span className="text-[9px] text-[#c9a84c] font-black uppercase tracking-wider mt-1.5 leading-none">
                  {user.role}
                </span>
              </div>
              <div className="size-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 text-white flex items-center justify-center text-xs font-black shadow-md border border-slate-800 group-hover:border-[#e06f46]/40 group-hover:shadow-lg transition-all duration-200">
                {user.name.substring(0, 1).toUpperCase()}
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium animate-pulse">Đang đồng bộ...</span>
              <div className="size-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shadow-sm animate-pulse">
                AD
              </div>
            </div>
          )}
        </header>

        {/* Dynamic page contents */}
        <main className="flex-1 animate-in fade-in duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
