import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  const recent = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
  })
  return { total, newLeads, called, closed, recent }
}

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  NEW: { label: 'Mới', variant: 'default' },
  CALLED: { label: 'Đã gọi', variant: 'secondary' },
  CLOSED: { label: 'Đã chốt', variant: 'outline' },
}

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const stats = await getStats()

  const cards = [
    { label: 'Tổng leads', value: stats.total, icon: TrendingUp, color: 'text-foreground' },
    { label: 'Mới', value: stats.newLeads, icon: Users, color: 'text-blue-600' },
    { label: 'Đã gọi', value: stats.called, icon: PhoneCall, color: 'text-orange-500' },
    { label: 'Đã chốt', value: stats.closed, icon: CheckCircle2, color: 'text-emerald-600' },
  ]

  return (
    <AdminLayout>
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <div>
          <h1 className="text-base font-semibold">Dashboard</h1>
          <p className="text-xs text-muted-foreground">{session.email}</p>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(card => (
            <Card key={card.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  {card.label}
                  <card.icon className={`size-4 ${card.color}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Leads gần đây</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {stats.recent.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">Chưa có lead nào</p>
            ) : (
              <div className="divide-y">
                {stats.recent.map(lead => {
                  const s = STATUS_MAP[lead.status] ?? { label: lead.status, variant: 'outline' as const }
                  return (
                    <div key={lead.id} className="flex items-center justify-between px-6 py-3">
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.phone} · {lead.source}</p>
                      </div>
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
