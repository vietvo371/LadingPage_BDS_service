import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('coastal2026', 10)

  await prisma.user.upsert({
    where: { email: 'admin@coastal.vn' },
    update: {},
    create: {
      email: 'admin@coastal.vn',
      password: hash,
      name: 'Admin Coastal',
      role: 'ADMIN',
    },
  })

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
    { key: 'about_desc', value: 'Dưới bàn tay tâm huyết của Chủ đầu tư Haus Quảng Ngãi, dự án tự hào là khu đô thị sinh thái biển tiên phong sở hữu tọa độ vàng "Kề giang – Cận hải" vô cùng hiếm có. Tại đây, mỗi ngày trôi qua là một trải nghiệm sống chuẩn mực bên bờ sông Trà Khúc thơ mộng, quyện cùng hơi thở tươi mát của đại dương bao la.' },
    { key: 'agent_name', value: 'Nguyễn Quốc Trung' },
    { key: 'agent_team', value: 'Đội ngũ sàn PQR' },
    { key: 'agent_avatar', value: '/images/logo/avt_trung.jpg' },
    { key: 'agent_join_year', value: '2026' },
    { key: 'agent_bookings', value: '5' },
    { key: 'agent_address', value: '308 Hai Bà Trưng · Quảng Ngãi' },
  ]

  for (const s of defaults) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value }, // Always force update to the latest seed copy to refresh the database
      create: s,
    })
  }

  console.log('✅ Seed done — admin@coastal.vn / coastal2026')
}

main().catch(console.error).finally(() => prisma.$disconnect())
