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
    { key: 'open_date', value: '2026-06-27' },
    { key: 'hotline', value: '0365 285 863' },
    { key: 'total_units', value: '1111' },
    { key: 'area_ha', value: '93.9' },
    { key: 'total_investment', value: '7.100' },
    { key: 'density', value: '14.4' },
  ]

  for (const s of defaults) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }

  console.log('✅ Seed done — admin@coastal.vn / coastal2026')
}

main().catch(console.error).finally(() => prisma.$disconnect())
