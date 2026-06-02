'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Home,
  LogOut,
  User,
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
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
  { name: 'Live Editor', href: '/admin/editor', icon: LayoutTemplate },
  { name: 'Khách hàng', href: '/admin/leads', icon: Users },
  { name: 'Hồ sơ cá nhân', href: '/admin/profile', icon: User },
];

interface AdminSidebarProps {
  className?: string;
  setOpen?: (open: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

export default function AdminSidebar({ className, setOpen, isCollapsed = false, setIsCollapsed }: AdminSidebarProps) {
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
    <aside className={cn("bg-slate-950 text-slate-300 flex flex-col h-full border-r border-slate-900 select-none relative transition-all duration-300", className, isCollapsed ? "w-20" : "w-64")}>
      
      {/* Collapse Toggle Button (Desktop only) */}
      {setIsCollapsed && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3.5 top-6 bg-slate-800 border border-slate-700 text-slate-300 rounded-full p-1 z-50 hover:bg-[#e06f46] hover:text-white hover:border-[#e06f46] transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}

      {/* Brand Header */}
      <div className={cn("p-6 border-b border-slate-900 flex items-center justify-center transition-all", isCollapsed ? "px-2" : "")}>
        <Link href="/" className="flex flex-col items-center gap-1 group" onClick={handleLinkClick}>
          <div className={cn("relative transition-all duration-300", isCollapsed ? "w-10 h-10" : "w-40 h-16 group-hover:scale-105")}>
            <img 
              src={isCollapsed ? "/images/logo/logo-coastal-clean.png" : "/images/logo/logo-coastal-clean.png"} 
              alt="Coastal Logo" 
              className={cn("w-full h-full object-contain filter brightness-0 invert", isCollapsed ? "object-cover scale-150" : "")} 
            />
          </div>
          {!isCollapsed && <span className="text-[9px] text-[#c9a84c] font-black uppercase tracking-[0.25em] mt-1.5 opacity-90 transition-opacity duration-300">Admin Portal</span>}
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
              title={isCollapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#e06f46] text-white shadow-lg shadow-[#e06f46]/25 ring-1 ring-white/10"
                  : "hover:bg-slate-900 hover:text-white text-slate-400",
                isCollapsed ? "justify-center px-0" : ""
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5 transition-colors group-hover:scale-105 duration-200 shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="p-4 mt-auto border-t border-slate-900 space-y-1.5">
        <Link
          href="/"
          onClick={handleLinkClick}
          title={isCollapsed ? "Quay lại Trang chủ" : undefined}
          className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-900 hover:text-white transition-all text-slate-400 group", isCollapsed ? "justify-center px-0" : "")}
        >
          <Home className="h-4.5 w-4.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
          {!isCollapsed && <span className="truncate">Quay lại Trang chủ</span>}
        </Link>
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Đăng xuất" : undefined}
          className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400 text-left group", isCollapsed ? "justify-center px-0" : "")}
        >
          <LogOut className="h-4.5 w-4.5 text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="truncate">Đăng xuất</span>}
        </button>
        {!isCollapsed && (
          <div className="px-4 py-3 rounded-xl bg-slate-900/30 border border-slate-900/60 mt-3 text-center sm:text-left transition-opacity duration-300">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-1">Hệ thống</p>
            <p className="text-[10px] text-slate-500 font-medium">Coastal Portal v1.0</p>
          </div>
        )}
      </div>
    </aside>
  );
}
