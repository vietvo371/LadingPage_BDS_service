import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getCurrentBroker } from '@/lib/currentBroker'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // MASTER thấy tất cả (dùng domain để xác định site đang sửa)
  // BROKER chỉ thấy settings của mình
  let brokerId = session.brokerId
  if (session.role === 'MASTER') {
    const broker = await getCurrentBroker()
    if (broker) brokerId = broker.id
  }

  if (!brokerId) return NextResponse.json({ error: 'Broker not found' }, { status: 400 })

  const settings = await prisma.setting.findMany({ where: { brokerId } })
  const map: Record<string, string> = {}
  settings.forEach(s => { map[s.key] = s.value })
  return NextResponse.json(map)
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let brokerId = session.brokerId
  if (session.role === 'MASTER') {
    const broker = await getCurrentBroker()
    if (broker) brokerId = broker.id
  }

  if (!brokerId) return NextResponse.json({ error: 'Broker not found' }, { status: 400 })

  const updates: Record<string, string> = await request.json()

  await Promise.all(
    Object.entries(updates).map(([key, value]) =>
      prisma.setting.upsert({
        where: { brokerId_key: { brokerId, key } },
        update: { value },
        create: { brokerId, key, value },
      })
    )
  )

  return NextResponse.json({ success: true })
}
