import { headers } from 'next/headers'
import { prisma } from './prisma'

export async function getCurrentBroker() {
  const headersList = headers()
  const host = headersList.get('host') || ''
  const domain = host.split(':')[0] // Bỏ port nếu có (vd: localhost:3000 -> localhost)

  // Môi trường dev (localhost)
  if (domain === 'localhost' || domain === '127.0.0.1') {
    // Nếu có biến môi trường BROKER_ID thì ưu tiên dùng để test nội bộ
    if (process.env.BROKER_ID) {
      const broker = await prisma.broker.findUnique({
        where: { id: Number(process.env.BROKER_ID) }
      })
      if (broker) return broker
    }
    
    // Nếu không có, lấy bừa broker đầu tiên đang ACTIVE
    return await prisma.broker.findFirst({
      where: { status: 'ACTIVE' }
    })
  }

  // Môi trường thật: Tìm broker theo domain
  return await prisma.broker.findUnique({
    where: { domain }
  })
}
