import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function getBrokerFilter(session: { role: string; brokerId: number | null }) {
  // BROKER chỉ thấy leads của mình
  // MASTER thấy tất cả (không filter)
  return session.role === 'BROKER' && session.brokerId
    ? { brokerId: session.brokerId }
    : {}
}

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const leads = await prisma.lead.findMany({
    where: getBrokerFilter(session),
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(leads)
}

export async function PATCH(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, status, note } = await request.json()

  // Kiểm tra lead có thuộc broker này không
  const lead = await prisma.lead.findFirst({
    where: { id, ...getBrokerFilter(session) },
  })
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updated = await prisma.lead.update({
    where: { id },
    data: { status, ...(note !== undefined && { note }) },
  })
  return NextResponse.json(updated)
}

export async function DELETE(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await request.json()

    // Kiểm tra lead có thuộc broker này không
    const lead = await prisma.lead.findFirst({
      where: { id: Number(id), ...getBrokerFilter(session) },
    })
    if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    await prisma.lead.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/leads:', error)
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}
