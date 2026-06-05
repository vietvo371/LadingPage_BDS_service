import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import MasterLayout from '@/components/master/MasterLayout'

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  NEW:    { label: 'Mới nhận', className: 'bg-blue-500/10 text-blue-400' },
  CALLED: { label: 'Đã gọi',   className: 'bg-yellow-500/10 text-yellow-400' },
  CLOSED: { label: 'Đã chốt',  className: 'bg-green-500/10 text-green-400' },
}

export default async function AllLeadsPage() {
  const session = await getSession()
  if (!session || session.role !== 'MASTER') redirect('/master/login')

  const leads = await prisma.lead.findMany({
    include: { broker: { select: { name: true, domain: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <MasterLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tất Cả Leads</h1>
          <p className="text-sm text-slate-400 mt-1">Tổng {leads.length} leads từ toàn bộ hệ thống</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['#', 'Họ Tên', 'SĐT', 'Môi Giới', 'Domain', 'Nguồn', 'Trạng Thái', 'Thời Gian'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map((lead, i) => {
                const s = STATUS_MAP[lead.status] ?? { label: lead.status, className: 'bg-slate-500/10 text-slate-400' }
                return (
                  <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-300">{lead.phone}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{lead.broker.name}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{lead.broker.domain}</td>
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
        </div>
      </div>
    </MasterLayout>
  )
}
