import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Users, PhoneCall, CheckCircle2, TrendingUp } from 'lucide-react'

async function getStats() {
  const [total, newLeads, called, closed] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: 'CALLED' } }),
    prisma.lead.count({ where: { status: 'CLOSED' } }),
  ])
  const recent = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 6 })
  return { total, newLeads, called, closed, recent }
}

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  NEW: { label: 'Mới', variant: 'default' },
  CALLED: { label: 'Đã gọi', variant: 'secondary' },
  CLOSED: { label: 'Đã chốt', variant: 'outline' },
}

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  const stats = await getStats()

  const cards = [
    { label: 'Tổng leads', value: stats.total, icon: TrendingUp, bg: 'bg-slate-50', iconColor: 'text-slate-500' },
    { label: 'Mới', value: stats.newLeads, icon: Users, bg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: 'Đã gọi', value: stats.called, icon: PhoneCall, bg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { label: 'Đã chốt', value: stats.closed, icon: CheckCircle2, bg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  ]

  return (
    <AdminLayout>
      <header className="flex h-14 items-center gap-4 border-b px-6 bg-white">
        <div>
          <h1 className="text-base font-semibold">Dashboard</h1>
          <p className="text-xs text-muted-foreground">{session.email}</p>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.label} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground font-medium">{card.label}</span>
                <div className={`size-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <card.icon className={`size-4 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
            </div>
          ))}
        </div>

        {/* Recent leads */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="px-5 py-4">
            <h2 className="text-sm font-semibold">Leads gần đây</h2>
          </div>
          <Separator />
          {stats.recent.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">Chưa có lead nào</p>
          ) : (
            <div className="divide-y">
              {stats.recent.map(lead => {
                const s = STATUS_MAP[lead.status] ?? { label: lead.status, variant: 'outline' as const }
                return (
                  <div key={lead.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{lead.phone} · {lead.source}</p>
                    </div>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
