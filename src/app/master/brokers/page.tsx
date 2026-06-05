import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import MasterLayout from '@/components/master/MasterLayout'
import { ExternalLink, ChevronRight } from 'lucide-react'

const STATUS = {
  ACTIVE:  { label: 'Đang chạy', className: 'bg-green-500/10 text-green-400' },
  PAUSED:  { label: 'Tạm dừng', className: 'bg-yellow-500/10 text-yellow-400' },
  EXPIRED: { label: 'Hết hạn',  className: 'bg-red-500/10 text-red-400' },
}

export default async function BrokersPage() {
  const session = await getSession()
  if (!session || session.role !== 'MASTER') redirect('/master/login')

  const now = new Date()
  const brokers = await prisma.broker.findMany({
    include: { _count: { select: { leads: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <MasterLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Quản Lý Môi Giới</h1>
            <p className="text-sm text-slate-400 mt-1">{brokers.length} môi giới trong hệ thống</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['#', 'Môi Giới', 'Domain', 'Mẫu', 'Leads', 'Kích Hoạt', 'Hết Hạn', 'Trạng Thái', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {brokers.map((b, i) => {
                const daysLeft = Math.ceil((new Date(b.expiredAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                const isRed = daysLeft <= 7 && b.status === 'ACTIVE'
                const isYellow = daysLeft <= 14 && daysLeft > 7 && b.status === 'ACTIVE'
                const s = STATUS[b.status as keyof typeof STATUS] ?? STATUS.ACTIVE

                return (
                  <tr key={b.id} className={`hover:bg-slate-800/50 transition-colors ${isRed ? 'bg-red-500/5' : isYellow ? 'bg-yellow-500/5' : ''}`}>
                    <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{b.name}</p>
                      <p className="text-xs text-slate-500">{b.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`https://${b.domain}`} target="_blank" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs">
                        {b.domain} <ExternalLink className="size-3" />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{b.template}</td>
                    <td className="px-4 py-3 text-white font-semibold">{b._count.leads}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{new Date(b.activatedAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${isRed ? 'text-red-400' : isYellow ? 'text-yellow-400' : 'text-slate-400'}`}>
                        {new Date(b.expiredAt).toLocaleDateString('vi-VN')}
                        {isRed && ` 🔴 (${daysLeft}d)`}
                        {isYellow && ` 🟡 (${daysLeft}d)`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.className}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/master/brokers/${b.id}`} className="text-slate-400 hover:text-white transition-colors">
                        <ChevronRight className="size-4" />
                      </Link>
                    </td>
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
