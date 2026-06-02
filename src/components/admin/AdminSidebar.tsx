'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Settings,
  Home,
  LogOut,
  User,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'WordPress Editor', href: '/admin/editor', icon: Globe },
  { name: 'Khách hàng', href: '/admin/leads', icon: Users },
  { name: 'Cài đặt nội dung', href: '/admin/settings', icon: Settings },
  { name: 'Hồ sơ cá nhân', href: '/admin/profile', icon: User },
];

interface AdminSidebarProps {
  className?: string;
  setOpen?: (open: boolean) => void;
}

export default function AdminSidebar({ className, setOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = () => {
    if (setOpen) setOpen(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    if (setOpen) setOpen(false);
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className={cn("w-64 bg-slate-950 text-slate-300 flex flex-col h-full border-r border-slate-900 select-none", className)}>
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-900 flex items-center justify-center">
        <Link href="/" className="flex flex-col items-center gap-1 group" onClick={handleLinkClick}>
          <div className="relative w-40 h-16 transition-transform group-hover:scale-105 duration-300">
            <img 
              src="/images/logo/logo-coastal-clean.png" 
              alt="Coastal Logo" 
              className="w-full h-full object-contain filter brightness-0 invert" 
            />
          </div>
          <span className="text-[9px] text-[#c9a84c] font-black uppercase tracking-[0.25em] mt-1.5 opacity-90">Admin Portal</span>
        </Link>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
        {sidebarItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#e06f46] text-white shadow-lg shadow-[#e06f46]/25 ring-1 ring-white/10"
                  : "hover:bg-slate-900 hover:text-white text-slate-400"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5 transition-colors group-hover:scale-105 duration-200", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="p-4 mt-auto border-t border-slate-900 space-y-1.5">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-900 hover:text-white transition-all text-slate-400 group"
        >
          <Home className="h-4.5 w-4.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          Quay lại Trang chủ
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400 text-left group"
        >
          <LogOut className="h-4.5 w-4.5 text-slate-500 group-hover:text-red-400 transition-colors" />
          Đăng xuất
        </button>
        <div className="px-4 py-3 rounded-xl bg-slate-900/30 border border-slate-900/60 mt-3 text-center sm:text-left">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-1">Hệ thống</p>
          <p className="text-[10px] text-slate-500 font-medium">Coastal Portal v1.0</p>
        </div>
      </div>
    </aside>
  );
}
