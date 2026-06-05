import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, email, message, source } = data

    // Lấy brokerId từ env — mỗi site set BROKER_ID riêng trong .env
    const brokerId = Number(process.env.BROKER_ID ?? 1)

    // Lưu vào DB
    await prisma.lead.create({
      data: {
        brokerId,
        name: name || 'Không rõ',
        phone: phone || '',
        email: email || null,
        message: message || null,
        source: source || 'unknown',
      },
    })

    // Đồng thời gửi Google Sheets nếu có env
    const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL
    if (sheetUrl) {
      fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        redirect: 'follow',
      }).catch(err => console.error('Sheets error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in /api/lead:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
