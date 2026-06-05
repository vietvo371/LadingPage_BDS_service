import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import MasterLayout from '@/components/master/MasterLayout'
import { Calculator, CheckCircle2 } from 'lucide-react'

const RATE = 200_000 // 200.000đ / web

export default async function CompensationPage() {
  const session = await getSession()
  if (!session || session.role !== 'MASTER') redirect('/master/login')

  const activeBrokers = await prisma.broker.findMany({
    where: { status: 'ACTIVE' },
    include: { _count: { select: { leads: true } } },
    orderBy: { activatedAt: 'asc' },
  })

  const total = activeBrokers.length * RATE

  return (
    <MasterLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Thù Lao Kỹ Thuật</h1>
          <p className="text-sm text-slate-400 mt-1">Đối soát thù lao với Coder — {new Date().toLocaleDateString('vi-VN')}</p>
        </div>

        {/* Tổng thù lao */}
        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-8 text-center">
          <Calculator className="size-10 text-orange-400 mx-auto mb-3" />
          <p className="text-slate-400 text-sm mb-2">Công thức tính</p>
          <p className="text-slate-300 text-lg font-mono mb-4">
            {activeBrokers.length} web × 200.000đ
          </p>
          <p className="text-4xl font-black text-white">{total.toLocaleString('vi-VN')}đ</p>
          <p className="text-orange-400 text-sm font-medium mt-2">Tổng thù lao tuần này</p>
        </div>

        {/* Danh sách web ACTIVE */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Danh Sách Website Đang Chạy ({activeBrokers.length})
            </h2>
            <span className="text-xs text-green-400 font-medium bg-green-500/10 px-3 py-1 rounded-full">
              × 200.000đ/web
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['#', 'Môi Giới', 'Domain', 'Leads', 'Kích Hoạt', 'Thù Lao'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {activeBrokers.map((b, i) => (
                <tr key={b.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{b.name}</p>
                    <p className="text-xs text-slate-500">{b.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{b.domain}</td>
                  <td className="px-4 py-3 text-white font-semibold">{b._count.leads}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{new Date(b.activatedAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-green-400 font-semibold text-xs">
                      <CheckCircle2 className="size-3.5" />
                      200.000đ
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-orange-500/30 bg-orange-500/5">
                <td colSpan={5} className="px-4 py-4 text-right text-sm font-bold text-white">
                  TỔNG CỘNG ({activeBrokers.length} web):
                </td>
                <td className="px-4 py-4 text-orange-400 font-black text-base">
                  {total.toLocaleString('vi-VN')}đ
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </MasterLayout>
  )
}
