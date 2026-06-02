import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, role: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, email } = await request.json()
    if (!name || !email) {
      return NextResponse.json({ error: 'Tên và email không được bỏ trống' }, { status: 400 })
    }

    // Kiểm tra trùng email
    const existing = await prisma.user.findFirst({
      where: {
        email,
        id: { not: session.userId }
      }
    })
    if (existing) {
      return NextResponse.json({ error: 'Email này đã được sử dụng bởi tài khoản khác' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: { name, email },
      select: { id: true, email: true, name: true, role: true }
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error('Error in PUT /api/auth/me:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

