import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import MasterLayout from '@/components/master/MasterLayout'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  NEW:       { label: 'Mới nhận',   className: 'bg-blue-500/10 text-blue-400' },
  CALLED:    { label: 'Đã gọi',     className: 'bg-yellow-500/10 text-yellow-400' },
  CLOSED:    { label: 'Đã chốt',    className: 'bg-green-500/10 text-green-400' },
  CANCELLED: { label: 'Huỷ',        className: 'bg-red-500/10 text-red-400' },
}

export default async function BrokerDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session || session.role !== 'MASTER') redirect('/master/login')

  const broker = await prisma.broker.findUnique({
    where: { id: Number(params.id) },
    include: {
      leads: { orderBy: { createdAt: 'desc' } },
      _count: { select: { leads: true } },
    },
  })

  if (!broker) notFound()

  const now = new Date()
  const daysLeft = Math.ceil((new Date(broker.expiredAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <MasterLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Link href="/master/brokers" className="text-slate-400 hover:text-white mt-1">
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{broker.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <a href={`https://${broker.domain}`} target="_blank" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                {broker.domain} <ExternalLink className="size-3" />
              </a>
              <span className="text-slate-600">·</span>
              <span className="text-sm text-slate-400">{broker.phone}</span>
            </div>
          </div>

          {/* Info chips */}
          <div className="flex items-center gap-3">
            <div className="text-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <p className="text-xl font-bold text-white">{broker._count.leads}</p>
              <p className="text-xs text-slate-400">Tổng leads</p>
            </div>
            <div className="text-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <p className={`text-xl font-bold ${daysLeft <= 7 ? 'text-red-400' : daysLeft <= 14 ? 'text-yellow-400' : 'text-green-400'}`}>{daysLeft}</p>
              <p className="text-xs text-slate-400">Ngày còn lại</p>
            </div>
            <div className="text-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <p className="text-sm font-bold text-white">{broker.notifyEmail ?? '—'}</p>
              <p className="text-xs text-slate-400">Email nhận lead</p>
            </div>
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Danh Sách Leads</h2>
          </div>
          {broker.leads.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-12">Chưa có leads nào</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  {['#', 'Họ Tên', 'SĐT', 'Email', 'Nguồn', 'Trạng Thái', 'Thời Gian'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {broker.leads.map((lead, i) => {
                  const s = STATUS_MAP[lead.status] ?? { label: lead.status, className: 'bg-slate-500/10 text-slate-400' }
                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                      <td className="px-4 py-3 text-slate-300">{lead.phone}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{lead.email ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{lead.source}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${s.className}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{new Date(lead.createdAt).toLocaleString('vi-VN')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MasterLayout>
  )
}
