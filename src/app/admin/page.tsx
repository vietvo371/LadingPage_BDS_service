import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

async function getStats() {
  const [total, newLeads, called, closed] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: 'CALLED' } }),
    prisma.lead.count({ where: { status: 'CLOSED' } }),
  ])
  const recent = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })
  return { total, newLeads, called, closed, recent }
}

export default async function AdminDashboard() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const stats = await getStats()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Xin chào, {session.email}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Tổng leads" value={stats.total} color="text-gray-900" />
          <StatCard label="Mới" value={stats.newLeads} color="text-blue-600" />
          <StatCard label="Đã gọi" value={stats.called} color="text-orange-500" />
          <StatCard label="Đã chốt" value={stats.closed} color="text-green-600" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recent.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">Chưa có lead nào</p>
            ) : (
              <div className="divide-y">
                {stats.recent.map(lead => (
                  <div key={lead.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-400">{lead.phone} · {lead.source}</div>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className={`text-3xl font-bold ${color}`}>{value}</div>
        <div className="text-sm text-gray-500 mt-1">{label}</div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-700',
    CALLED: 'bg-orange-100 text-orange-700',
    CLOSED: 'bg-green-100 text-green-700',
  }
  const label: Record<string, string> = { NEW: 'Mới', CALLED: 'Đã gọi', CLOSED: 'Đã chốt' }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {label[status] ?? status}
    </span>
  )
}
