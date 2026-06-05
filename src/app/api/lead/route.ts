import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendLeadNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, email, message, source } = data

    // Lấy brokerId từ env — mỗi site set BROKER_ID riêng trong .env
    const brokerId = Number(process.env.BROKER_ID ?? 1)

    // 1. Lưu lead vào DB
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

    // 2. Gửi email thông báo cho môi giới (fire-and-forget, không block response)
    prisma.broker.findUnique({ where: { id: brokerId } })
      .then(broker => {
        if (!broker?.notifyEmail) {
          console.log(`[Email] Broker ${brokerId} không có notifyEmail — bỏ qua`)
          return
        }
        console.log(`[Email] Gửi đến ${broker.notifyEmail}...`)
        const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
        return sendLeadNotification({
          brokerName: broker.name,
          brokerEmail: broker.notifyEmail,
          projectName: broker.domain,
          leadName: name || 'Không rõ',
          leadPhone: phone || '',
          leadEmail: email,
          leadMessage: message,
          source: source || 'unknown',
          submittedAt: now,
        })
      })
      .then(() => console.log('[Email] Gửi thành công!'))
      .catch(err => console.error('[Email] Lỗi:', err))

    // 3. Gửi Google Sheets nếu có env
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
