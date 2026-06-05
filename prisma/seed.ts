import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // ─── 1. Tạo Broker mẫu (coastal) ────────────────────────────────────────
  const broker = await prisma.broker.upsert({
    where: { domain: 'coastal.muadatquangngai.com' },
    update: {},
    create: {
      name: 'Nguyễn Quốc Trung',
      phone: '0365285863',
      domain: 'coastal.muadatquangngai.com',
      template: 'mau-1',
      status: 'ACTIVE',
      activatedAt: new Date('2026-06-05'),
      expiredAt: new Date('2027-06-05'),
      notifyEmail: 'trungdigitalmedia@gmail.com',
    },
  })

  // ─── 2. Tạo Master Admin user (brokerId = null) ──────────────────────────
  const masterHash = await bcrypt.hash('master2026@TDM', 10)
  await prisma.user.upsert({
    where: { email: 'master@trungdigitalmedia.com' },
    update: {},
    create: {
      brokerId: null,
      email: 'master@trungdigitalmedia.com',
      password: masterHash,
      name: 'Trung Digital Media',
      role: 'MASTER',
    },
  })

  // ─── 3. Tạo Broker user (admin site coastal) ────────────────────────────
  const brokerHash = await bcrypt.hash('coastal2026', 10)
  await prisma.user.upsert({
    where: { email: 'admin@coastal.vn' },
    update: {},
    create: {
      brokerId: broker.id,
      email: 'admin@coastal.vn',
      password: brokerHash,
      name: 'Admin Coastal',
      role: 'BROKER',
    },
  })

  // ─── 4. Tạo Settings mặc định cho broker coastal ────────────────────────
  const defaults = [
    { key: 'price_range', value: '4.8 Tỷ – 30 Tỷ' },
    { key: 'location', value: 'Xã Tư Nghĩa – Quảng Ngãi' },
    { key: 'hotline', value: '0365 285 863' },
    { key: 'zalo_link', value: 'https://zalo.me/0365285863' },
    { key: 'open_date', value: '2026-06-27' },
    { key: 'open_date_time', value: '2026-06-27T08:00:00' },
    { key: 'open_title', value: 'Sự Kiện Mở Bán — Giai Đoạn 1' },
    { key: 'total_units', value: '1111' },
    { key: 'area_ha', value: '93.9' },
    { key: 'total_investment', value: '7.100' },
    { key: 'density', value: '14.4' },
    { key: 'about_quote', value: 'Khởi nguồn từ khát vọng kiến tạo một biểu tượng sống mới, Coastal Quảng Ngãi mang đến đặc quyền sống tinh hoa – nơi thiên nhiên khoáng đạt giao hòa cùng nhịp giao thương sầm uất ngay trung tâm thành phố.' },
    { key: 'about_desc', value: 'Dưới bàn tay tâm huyết của Chủ đầu tư Haus Quảng Ngãi, dự án tự hào là khu đô thị sinh thái biển tiên phong sở hữu tọa độ vàng "Kề giang – Cận hải" vô cùng hiếm có.' },
    { key: 'agent_name', value: 'Nguyễn Quốc Trung' },
    { key: 'agent_team', value: 'Đội ngũ sàn PQR' },
    { key: 'agent_avatar', value: '/images/logo/avt_trung.jpg' },
    { key: 'agent_join_year', value: '2026' },
    { key: 'agent_bookings', value: '5' },
    { key: 'agent_address', value: '308 Hai Bà Trưng · Quảng Ngãi' },
  ]

  for (const s of defaults) {
    await prisma.setting.upsert({
      where: { brokerId_key: { brokerId: broker.id, key: s.key } },
      update: {},  // Không overwrite data khách đã sửa
      create: { brokerId: broker.id, ...s },
    })
  }

  console.log('✅ Seed done!')
  console.log('   Master Admin : master@trungdigitalmedia.com / master2026@TDM')
  console.log('   Broker Coastal: admin@coastal.vn / coastal2026')
}

main().catch(console.error).finally(() => prisma.$disconnect())
