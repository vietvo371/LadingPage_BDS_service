import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // MASTER thấy tất cả (dùng BROKER_ID từ env để xác định site)
  // BROKER chỉ thấy settings của mình
  const brokerId = session.role === 'MASTER'
    ? Number(process.env.BROKER_ID ?? 1)
    : session.brokerId

  if (!brokerId) return NextResponse.json({ error: 'Broker not found' }, { status: 400 })

  const settings = await prisma.setting.findMany({ where: { brokerId } })
  const map: Record<string, string> = {}
  settings.forEach(s => { map[s.key] = s.value })
  return NextResponse.json(map)
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const brokerId = session.role === 'MASTER'
    ? Number(process.env.BROKER_ID ?? 1)
    : session.brokerId

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
