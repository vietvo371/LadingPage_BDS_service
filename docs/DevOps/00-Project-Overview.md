# 📚 Tổng Quan Dự Án — Trung Digital Media BDS System

> **ĐỌC FILE NÀY TRƯỚC** khi làm bất kỳ việc gì trong dự án.
> Cập nhật lần cuối: 2026-06-05

---

## I. Mô Hình Kinh Doanh

**Trung Digital Media** xây và bán landing page BDS cho môi giới bất động sản.

```
Môi giới mua web → Trung thêm Domain vào Master Admin → Khách điền form → Môi giới nhận lead
```

| Thu nhập | Giá |
|----------|-----|
| Phí duy trì | 999.000đ/năm/site |
| Thù lao coder | 200.000đ × số web ACTIVE / tuần |

---

## II. Kiến Trúc 3 Tầng (Chuẩn SaaS Multi-tenant)

Toàn bộ hệ thống chạy trên kiến trúc **1 Source Code - Vạn Domain**. Chỉ deploy 1 lần duy nhất, hệ thống tự nhận diện domain để hiển thị giao diện tương ứng.

```
TẦNG 1 — Landing Page Vệ Tinh (public)
  duan-vin.com, datnen-quangngai.vn, ...
  → Khách xem, điền form. Dữ liệu chạy thẳng về Master DB.

TẦNG 2 — Site Admin (môi giới)
  duan-vin.com/admin
  → Môi giới đăng nhập, hệ thống tự cách ly dữ liệu: Môi giới chỉ xem được leads CỦA MÌNH.

TẦNG 3 — Master Admin (chỉ Trung)
  admin.muadatquangngai.com
  → Quản lý tất cả Môi giới, leads tổng, thêm bớt khóa website.
```

---

## III. 2 Git Repositories

### Folder Tổng (local)
```
/Volumes/MAC_OPTION/TrungDigitalMedia/
├── landing-template/    ← PROJECT VỆ TINH (git: LadingPage_BDS_service) - Handle toàn bộ Frontend cho Môi giới
└── master-admin/        ← PROJECT ADMIN TỔNG (git: Master-Admin-BDS)
```

**Quy tắc Cũ vs Mới:**
- Cũ: Mỗi môi giới tạo 1 thư mục riêng, clone repo, đổi port.
- **MỚI: KHÔNG CẦN CLONE NỮA**. 1 project `landing-template` phục vụ 1000 môi giới.

---

## IV. Server & Infrastructure

```
VPS: 139.180.138.113
Panel: CyberPanel
DB: MySQL — 1 database chung duy nhất (coastal_admin)

Tiến trình chạy nền (PM2):
1. landing-template: PORT=3000 (Xử lý toàn bộ domain của môi giới)
2. master-admin:     PORT=4000 (Xử lý admin.muadatquangngai.com)
```

---

## V. Database Schema

```prisma
Broker    { id, name, phone, domain, template, status, activatedAt, expiredAt, notifyEmail }
User      { id, brokerId(NULL=MASTER), role(MASTER|BROKER), email, password }
Lead      { id, brokerId, name, phone, email, message, status, source }
Setting   { id, brokerId, key, value }  @@unique([brokerId, key])
```

---

## VI. Cấu Hình .env (Không còn BROKER_ID)

**landing-template .env:**
```env
DATABASE_URL="mysql://root@localhost:3306/coastal_admin"
JWT_SECRET="your-strong-secret"
RESEND_API_KEY="re_xxx"              ← Dùng chung để gửi mail
NEXT_PUBLIC_GOOGLE_SHEETS_URL=""     
UPSTASH_REDIS_REST_URL="..."         ← Dùng chung (key tự phân tách theo BrokerID)
```

---

## VII. Flow Khi Có Lead Mới

```
Khách điền form trên duan-vin.com → POST /api/lead
  → Hệ thống tự dò domain 'duan-vin.com' ra Broker ID.
  → Lưu DB (Bảng Lead).
  → Gửi email đến Broker.notifyEmail.
Môi giới mở điện thoại thấy email → gọi chốt nóng.
```

---

## VIII. QUY TRÌNH MỚI SIÊU NHANH: Thêm Môi Giới Mới

Với kiến trúc Multi-tenant, việc Onboarding một khách hàng mới rút gọn từ 10 bước xuống còn 3 bước:

```
1. Master Admin → Tạo Môi giới mới (Nhập Domain, Tên, Số điện thoại, Chọn mẫu).
2. Tên miền của khách → Trỏ IP (A record) về VPS 139.180.138.113.
3. CyberPanel → Add Website mới (domain của khách) → Setup Reverse Proxy chĩa về PORT 3000 của landing-template. Cấp SSL.
=> HOÀN TẤT! Web lên ngay lập tức, không cần đụng 1 dòng code hay terminal nào!
```

---

## IX. Flow Update Code (Cập nhật 1 phát ăn 1000 web)

```bash
# Làm việc trên local, test xong push code.

# SSH server redeploy:
ssh coast6950@139.180.138.113
cd ~/public_html/LadingPage_BDS_service
git pull && npm install && npm run build
pm2 restart landing-template

# KẾT QUẢ: Toàn bộ website của tất cả môi giới đều nhận tính năng mới!
```
