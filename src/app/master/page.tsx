import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import MasterLayout from '@/components/master/MasterLayout'
import { Globe, Users, FileText, TrendingUp } from 'lucide-react'

export default async function MasterDashboard() {
  const session = await getSession()
  if (!session || session.role !== 'MASTER') redirect('/master/login')

  const [totalBrokers, activeBrokers, totalLeads, newLeads] = await Promise.all([
    prisma.broker.count(),
    prisma.broker.count({ where: { status: 'ACTIVE' } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
  ])

  // Brokers sắp hết hạn (≤ 14 ngày)
  const now = new Date()
  const in14days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
  const expiringSoon = await prisma.broker.findMany({
    where: { expiredAt: { lte: in14days }, status: 'ACTIVE' },
    orderBy: { expiredAt: 'asc' },
  })

  // Leads gần đây
  const recentLeads = await prisma.lead.findMany({
    include: { broker: { select: { name: true, domain: true } } },
    orderBy: { createdAt: 'desc' },
    take: 8,
  })

  const cards = [
    { label: 'Tổng Website', value: totalBrokers, sub: `${activeBrokers} đang chạy`, icon: Globe, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Tổng Leads', value: totalLeads, sub: `${newLeads} mới chưa xử lý`, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Thù Lao Tuần', value: `${(activeBrokers * 200000).toLocaleString('vi-VN')}đ`, sub: `${activeBrokers} web × 200.000đ`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Sắp Hết Hạn', value: expiringSoon.length, sub: 'Trong 14 ngày tới', icon: Users, color: 'text-red-400', bg: 'bg-red-500/10' },
  ]

  return (
    <MasterLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Tổng Quan</h1>
          <p className="text-sm text-slate-400 mt-1">Toàn bộ hệ thống — Trung Digital Media</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <div key={c.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{c.label}</span>
                <div className={`size-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                  <c.icon className={`size-4 ${c.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{c.value}</p>
              <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sắp hết hạn */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white">⚠️ Sắp Hết Hạn</h2>
            </div>
            {expiringSoon.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">Không có site nào sắp hết hạn</p>
            ) : (
              <div className="divide-y divide-slate-800">
                {expiringSoon.map(b => {
                  const daysLeft = Math.ceil((new Date(b.expiredAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                  const isRed = daysLeft <= 7
                  return (
                    <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{b.name}</p>
                        <p className="text-xs text-slate-500">{b.domain}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isRed ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {daysLeft} ngày
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Leads gần đây */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white">🔥 Leads Mới Nhất</h2>
            </div>
            <div className="divide-y divide-slate-800">
              {recentLeads.map(lead => (
                <div key={lead.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.phone} · {lead.broker.name}</p>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  )
}
