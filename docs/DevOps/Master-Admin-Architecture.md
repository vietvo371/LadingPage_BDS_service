# 🏗️ Kiến Trúc Hệ Thống Master Admin — Trung Digital Media

> Tài liệu thiết kế tổng thể cho hệ thống quản lý chuỗi Landing Page BDS.

---

## I. Tổng Quan Hệ Thống (3 Tầng)

```
TẦNG 1 — Landing Page (public)
└── Khách hàng (nhà đầu tư) điền form liên hệ

TẦNG 2 — Site Admin (mỗi môi giới 1 tài khoản)
└── Môi giới đăng nhập → CHỈ thấy lead + sửa nội dung site CỦA HỌ

TẦNG 3 — Master Admin (chỉ Trung Digital Media)
└── Thấy TẤT CẢ: mọi site, mọi lead, tính thù lao, quản lý gia hạn
```

---

## II. Kiến Trúc Database — Multi-tenant (1 DB Chung)

### Lý do chọn Multi-tenant
- ✅ Tiết kiệm chi phí server nhất
- ✅ Master Admin query trực tiếp, không cần webhook sync
- ✅ Chuẩn SaaS chuyên nghiệp
- ✅ Dễ quản lý, maintain

### Schema Prisma

```prisma
model Broker {
  id          Int       @id @default(autoincrement())
  name        String                    // Tên môi giới
  phone       String
  domain      String    @unique         // coastal.muadatquangngai.com
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
  id       Int    @id @default(autoincrement())
  brokerId Int                          // ← KEY phân biệt settings của ai
  broker   Broker @relation(fields: [brokerId], references: [id])
  key      String
  value    String @db.Text
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

## III. Phân Quyền (Authorization Logic)

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

## IV. Luồng Data

```
coastal.muadatquangngai.com  →  brokerId: 1  →  DB chung
suckhoetaman.com             →  brokerId: 2  →  DB chung
domain-moi.com               →  brokerId: 3  →  DB chung
                                      ↓
                            masteradmin.com → thấy ALL
```

### Auto-Notification khi có Lead mới
```
Khách điền form
      ↓
POST /api/lead
      ↓
1. Lưu DB (Lead với brokerId)
2. Gửi Email đến broker.notifyEmail
      ↓
Môi giới nhận email realtime → gọi điện chốt nóng
```

---

## V. Tính Năng Master Admin

### Dashboard
- Tổng số website đang chạy
- Tổng traffic toàn hệ thống
- Tổng leads thu về từ tất cả sites
- → Dùng làm Case Study chào mời khách mới

### Quản lý Môi giới
- Bảng danh sách: STT, Tên, SĐT, Domain, Mẫu giao diện, Trạng thái
- Toggle nhanh: Đang chạy / Tạm dừng / Hết hạn
- Màu cảnh báo gia hạn:
  - 🔴 Đỏ: còn ≤ 7 ngày
  - 🟡 Vàng: còn ≤ 14 ngày
- Phí duy trì: 999.000đ/năm

### Quản lý Lead
- Xem lead của từng môi giới
- Xuất Excel

### Tính Thù Lao Coder
```
COUNT(Broker WHERE status = 'ACTIVE') × 200.000đ = Tổng thù lao
```

---

## VI. Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 App Router |
| Database | MySQL (1 DB chung, multi-tenant) |
| ORM | Prisma |
| Auth | JWT (jose) |
| Email notification | Resend hoặc Nodemailer |
| Export Excel | xlsx |
| UI | shadcn/ui + Tailwind |

---

## VII. Git Branch Workflow

```
main          ← Production (chỉ merge khi test xong)
  ↑ merge
develop       ← Development & Testing
  ↑ feature branches
feature/xxx   ← Từng tính năng nhỏ
```

**Quy tắc:**
- Làm việc trên `develop`
- Test OK → merge vào `main`
- Push `main` lên server production
- KHÔNG push `develop` lên production
