# 🏗️ Kiến Trúc Hệ Thống Master Admin — Trung Digital Media

> Tài liệu thiết kế tổng thể cho hệ thống quản lý chuỗi Landing Page BDS.

---

## I. Tổng Quan Hệ Thống (3 Tầng)

```
TẦNG 1 — Landing Page (public)
└── Tất cả domain trỏ về 1 Next.js instance (port 3000)
    Hệ thống tự nhận diện domain → load đúng settings của broker

TẦNG 2 — Site Admin (mỗi môi giới 1 tài khoản)
└── Môi giới đăng nhập → CHỈ thấy lead + sửa nội dung site CỦA HỌ
    (tự cách ly theo brokerId trong session)

TẦNG 3 — Master Admin (chỉ Trung Digital Media)
└── Thấy TẤT CẢ: mọi site, mọi lead, tính thù lao, quản lý gia hạn
```

---

## II. Kiến Trúc Database — Multi-tenant (1 DB Chung)

### Lý do chọn Multi-tenant
- ✅ Tiết kiệm chi phí server — chỉ 1 process, 1 DB
- ✅ Master Admin query trực tiếp, không cần webhook sync
- ✅ Update code 1 lần = tất cả broker nhận ngay
- ✅ Thêm broker mới không cần đụng code hay terminal
- ✅ Chuẩn SaaS chuyên nghiệp

### Schema Prisma

```prisma
model Broker {
  id          Int       @id @default(autoincrement())
  name        String                    // Tên môi giới
  phone       String
  domain      String    @unique         // "coastal.muadatquangngai.com" — KEY nhận diện
  template    String                    // "mau-1" | "mau-2" | "mau-3"
  status      String    @default("ACTIVE") // ACTIVE | PAUSED | EXPIRED
  activatedAt DateTime
  expiredAt   DateTime                  // Cảnh báo đỏ/vàng khi gần hết hạn
  notifyEmail String?                   // Email nhận thông báo lead mới
  leads       Lead[]
  settings    Setting[]
  users       User[]
  createdAt   DateTime  @default(now())
}

model Lead {
  id        Int      @id @default(autoincrement())
  brokerId  Int                         // ← KEY phân biệt data của ai
  broker    Broker   @relation(fields: [brokerId], references: [id])
  name      String
  phone     String
  email     String?
  message   String?  @db.Text
  source    String   @default("unknown")
  status    String   @default("NEW")   // NEW | CONTACTED | CLOSED
  note      String?  @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Setting {
  id        Int    @id @default(autoincrement())
  brokerId  Int                          // ← KEY phân biệt settings của ai
  broker    Broker @relation(fields: [brokerId], references: [id])
  key       String
  value     String @db.Text
  updatedAt DateTime @updatedAt
  @@unique([brokerId, key])             // Mỗi broker có key riêng
}

model User {
  id        Int      @id @default(autoincrement())
  brokerId  Int?                        // NULL = Master Admin | có giá trị = Môi giới
  broker    Broker?  @relation(fields: [brokerId], references: [id])
  role      String                      // "MASTER" | "BROKER"
  email     String   @unique
  password  String
  name      String   @default("Admin")
  createdAt DateTime @default(now())
}
```

---

## III. Cách Nhận Diện Broker (Domain-Based)

**Không còn env `BROKER_ID`** — hệ thống tự đọc domain từ HTTP request:

```typescript
// src/app/api/lead/route.ts
const host = request.headers.get('host')  // "coastal.muadatquangngai.com"
const broker = await prisma.broker.findUnique({
  where: { domain: host }
})
// broker.id → dùng làm brokerId cho Lead, Setting lookup
await prisma.lead.create({ data: { ...body, brokerId: broker.id } })
```

```typescript
// src/app/page.tsx — Landing page
const host = headers().get('host')
const broker = await prisma.broker.findUnique({ where: { domain: host } })
const settings = await prisma.setting.findMany({ where: { brokerId: broker.id } })
```

---

## IV. Phân Quyền (Authorization Logic)

```typescript
// Môi giới — chỉ thấy data của mình
const leads = await prisma.lead.findMany({
  where: { brokerId: session.brokerId }
})

// Master Admin — thấy tất cả
const leads = await prisma.lead.findMany()

// Kiểm tra quyền trong middleware
if (session.role === 'BROKER' && session.brokerId !== targetBrokerId) {
  return 403 Forbidden
}
```

---

## V. Luồng Data

```
coastal.muadatquangngai.com  →  Host header → tìm domain trong DB → brokerId: 1
suckhoetaman.com             →  Host header → tìm domain trong DB → brokerId: 2
domain-moi.com               →  Host header → tìm domain trong DB → brokerId: 3
                                      ↓
                            admin.muadatquangngai.com → Master thấy ALL
```

### Auto-Notification khi có Lead mới
```
Khách điền form trên duan-vin.com
      ↓
POST /api/lead
      ↓
1. Đọc Host header → tìm Broker trong DB
2. Lưu Lead với brokerId
3. Gửi Email đến broker.notifyEmail (Resend)
      ↓
Môi giới nhận email realtime → gọi điện chốt nóng
```

---

## VI. Tính Năng Master Admin

### Dashboard
- Tổng số website đang chạy (ACTIVE)
- Tổng leads thu về từ tất cả sites
- Tính thù lao coder tuần này

### Quản lý Môi giới
- Bảng: Tên, SĐT, Domain, Mẫu giao diện, Trạng thái, Hết hạn
- Toggle nhanh: ACTIVE / PAUSED / EXPIRED
- Màu cảnh báo gia hạn: 🔴 ≤7 ngày | 🟡 ≤14 ngày
- Thêm mới: nhập form → tự tạo Broker + User trong DB

### Quản lý Lead
- Xem lead của từng môi giới hoặc tất cả
- Xuất Excel

### Tính Thù Lao Coder
```
COUNT(Broker WHERE status = 'ACTIVE') × 200.000đ = Tổng thù lao
```

---

## VII. Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 App Router |
| Database | MySQL (1 DB chung, multi-tenant) |
| ORM | Prisma |
| Auth | JWT (jose) |
| Email notification | Resend |
| Export Excel | xlsx |
| UI | shadcn/ui + Tailwind |

---

## VIII. Git Branch Workflow

```
main          ← Production (chỉ merge khi test xong)
  ↑ merge
develop       ← Development & Testing
```

**Quy tắc:**
- Làm việc trên `develop`
- Test OK → merge vào `main` → push → SSH server → `git pull && npm run build && pm2 restart landing-template`
