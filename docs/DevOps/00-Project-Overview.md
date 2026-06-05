# 📚 Tổng Quan Dự Án — Trung Digital Media BDS System

> Tài liệu này mô tả toàn bộ hệ thống chuỗi Landing Page BDS của Trung Digital Media.
> Đọc file này trước khi đọc bất kỳ tài liệu nào khác.

---

## I. Mô Hình Kinh Doanh

**Trung Digital Media** xây dựng và bán landing page BDS cho các môi giới bất động sản.

```
Môi giới mua web → Trung deploy site → Khách hàng vào điền form → Môi giới nhận lead
```

**Doanh thu:**
- Phí setup: 1 lần
- Phí duy trì: **999.000đ/năm** mỗi site
- Thù lao coder: **200.000đ × số web đang chạy** / tuần

---

## II. Kiến Trúc Hệ Thống (3 Tầng)

```
╔══════════════════════════════════════════════════════╗
║  TẦNG 1 — Landing Page (Public)                      ║
║  Khách hàng (nhà đầu tư) vào xem và điền form       ║
╠══════════════════════════════════════════════════════╣
║  TẦNG 2 — Site Admin (Môi giới)                      ║
║  /admin — môi giới đăng nhập, xem lead, sửa nội dung ║
╠══════════════════════════════════════════════════════╣
║  TẦNG 3 — Master Admin (Trung Digital Media)         ║
║  Quản lý tất cả site, lead, thù lao, gia hạn         ║
╚══════════════════════════════════════════════════════╝
```

---

## III. Sơ Đồ Server Thực Tế

```
VPS: 139.180.138.113 (CyberPanel + OpenLiteSpeed)
MySQL: 1 database chung (multi-tenant)

┌─────────────────────────────────────────────────────┐
│                    VPS Server                        │
│                                                      │
│  /home/coastal.../   BROKER_ID=1  PORT=3005          │
│    └─ coastal.muadatquangngai.com                    │
│         ├── /          (landing page public)         │
│         └── /admin     (site admin môi giới)         │
│                                                      │
│  /home/suckhoe.../    BROKER_ID=2  PORT=3001         │
│    └─ suckhoetaman.com                               │
│                                                      │
│  /home/domain-moi.../ BROKER_ID=3  PORT=3010         │
│    └─ domain-moi.com  (site tiếp theo)               │
│                                                      │
│  /home/masteradmin/   PORT=4000                      │
│    └─ admin.muadatquangngai.com  (Master Admin)      │
│                                                      │
│  MySQL ──────── 1 DB chung ──────── tất cả sites     │
└─────────────────────────────────────────────────────┘
```

---

## IV. Database Schema (Multi-tenant)

```
Broker          ← danh sách môi giới
  id, name, phone, domain, template
  status (ACTIVE/PAUSED/EXPIRED)
  activatedAt, expiredAt, notifyEmail

User            ← tài khoản đăng nhập
  brokerId (NULL = Master Admin)
  role: MASTER | BROKER
  email, password

Lead            ← khách hàng điền form
  brokerId      ← phân biệt lead của ai
  name, phone, email, message
  status: NEW | CONTACTED | CLOSED

Setting         ← nội dung từng site
  brokerId      ← phân biệt settings của ai
  key, value    ← ví dụ: hotline, gallery_data...
```

**Phân quyền:**
```typescript
// BROKER → chỉ thấy data của mình
where: { brokerId: session.brokerId }

// MASTER → thấy tất cả
where: {}  // không filter
```

---

## V. Git Repository

### Repo 1: Landing Page + Site Admin
```
github.com/vietvo371/LadingPage_BDS_service

Branch:
  main     ← Production (chỉ merge khi test xong)
  develop  ← Development & Testing

Dùng cho: TẤT CẢ landing page sites
Phân biệt site: bằng BROKER_ID trong .env
```

### Repo 2: Master Admin (chưa tạo)
```
github.com/vietvo371/Master-Admin-BDS

Dùng cho: admin.muadatquangngai.com
```

---

## VI. Flow Data — Khi Khách Hàng Điền Form

```
1. Khách vào coastal.muadatquangngai.com
2. Điền form (Tên, SĐT)
3. POST /api/lead
      ├── Lưu vào DB (Lead với brokerId=1)
      ├── Gửi email đến broker.notifyEmail  ← Resend API
      └── Gửi Google Sheets (nếu có)
4. Môi giới nhận email ngay lập tức
5. Môi giới gọi điện chốt nóng
6. Master Admin thấy lead trong dashboard tổng
```

---

## VII. Flow Thêm Môi Giới Mới

```
1. Master Admin: tạo Broker record mới
   → name, phone, domain, expiredAt, notifyEmail

2. Master Admin: tạo User (BROKER role)
   → email, password, brokerId

3. Cloudflare: thêm A record
   → Name: ten-moi, IPv4: 139.180.138.113

4. CyberPanel: tạo website mới
   → domain: ten-moi.muadatquangngai.com

5. SSH server: clone + cấu hình
   git clone <repo> ~/public_html/ten-moi.../
   nano .env → BROKER_ID=X, PORT=30XX

6. Build + PM2 start với port mới

7. CyberPanel: cấu hình vHost proxy

8. Gửi thông tin login cho môi giới
   → URL: ten-moi.com/admin
   → Email + Password
```

---

## VIII. Flow Update Code (Sửa Bug / Thêm Tính Năng)

### Sửa code chung (áp dụng tất cả site):
```
1. git checkout develop
2. Sửa code, test local
3. git add . && git commit
4. git checkout main && git merge develop
5. git push origin main
6. SSH vào từng site:
   git pull && npm run build && pm2 restart <name>
```

### Sửa nội dung 1 site cụ thể:
```
→ Môi giới tự vào /admin chỉnh sửa
→ KHÔNG cần đụng code
```

---

## IX. Tech Stack

| Thành phần | Công nghệ |
|-----------|-----------|
| Framework | Next.js 14 App Router |
| Database | MySQL (CyberPanel) |
| ORM | Prisma v6 |
| Auth | JWT (jose) - HttpOnly cookie |
| UI | shadcn/ui + Tailwind CSS |
| Rich Text | React Quill |
| Email | Resend (3000 emails/tháng miễn phí) |
| Process Manager | PM2 |
| Web Server | OpenLiteSpeed (CyberPanel) |
| DNS/CDN | Cloudflare |
| Node Version | v20 (via NVM) |

---

## X. Cấu Hình .env Mỗi Site

```env
DATABASE_URL="mysql://user:pass@localhost:3306/dbname"
JWT_SECRET="your-strong-secret"

BROKER_ID=1                    ← SỐ KHÁC NHAU MỖI SITE
RESEND_API_KEY="re_xxx"        ← Dùng chung 1 key
NEXT_PUBLIC_GOOGLE_SHEETS_URL=""
```

---

## XI. Trạng Thái Phát Triển (Development Status)

### ✅ Đã hoàn thành
- [x] Landing page công khai (Tầng 1)
- [x] Site Admin cho môi giới (Tầng 2)
- [x] Database schema multi-tenant (Phase 1)
- [x] API filter theo brokerId (Phase 2)
- [x] Email notification khi có lead (Phase 3)

### 🔄 Đang phát triển (branch: develop)
- [ ] Master Admin dashboard (Phase 4)
- [ ] Workflow thêm môi giới mới (Phase 5)

### 📋 Kế hoạch tiếp theo
- [ ] Master Admin: quản lý broker, leads tổng, tính thù lao
- [ ] Cảnh báo gia hạn (đỏ/vàng)
- [ ] Export Excel

---

## XII. Tài Liệu Liên Quan

| File | Nội dung |
|------|---------|
| `Deploy-NextJS-CyberPanel.md` | Quy trình deploy site mới lên server |
| `Update-Code-Workflow.md` | Quy trình update code lên production |
| `Deploy-Bugs-and-Fixes.md` | Các lỗi thường gặp và cách fix |
| `Master-Admin-Architecture.md` | Thiết kế chi tiết Master Admin |
| `Master-Admin-Dev-Plan.md` | Kế hoạch 5 phases phát triển |

---

## XIII. Thông Tin Truy Cập

| Thứ | URL | Tài khoản |
|-----|-----|-----------|
| VPS CyberPanel | https://139.180.138.113:8090 | (hỏi Trung) |
| Site Coastal Admin | https://coastal.muadatquangngai.com/admin | admin@coastal.vn |
| Master Admin | https://admin.muadatquangngai.com | master@trungdigitalmedia.com |
| GitHub | github.com/vietvo371/LadingPage_BDS_service | vietvo371 |
