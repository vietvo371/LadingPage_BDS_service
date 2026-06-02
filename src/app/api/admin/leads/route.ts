import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(leads)
}

export async function PATCH(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, status, note } = await request.json()
  const lead = await prisma.lead.update({
    where: { id },
    data: { status, ...(note !== undefined && { note }) },
  })
  return NextResponse.json(lead)
}

export async function DELETE(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await request.json()
    await prisma.lead.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/leads:', error)
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}

