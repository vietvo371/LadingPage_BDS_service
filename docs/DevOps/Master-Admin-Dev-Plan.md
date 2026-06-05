# 📋 Kế Hoạch Phát Triển — Master Admin System

> Branch: `develop` → test xong → merge `main` → push production

---

## PHASE 1 — Refactor Database (Multi-tenant)
> Mục tiêu: Chuyển từ 1 site/1 DB → 1 DB dùng chung có brokerId

- [ ] **1.1** Thêm model `Broker` vào schema.prisma
- [ ] **1.2** Sửa model `Lead` — thêm `brokerId`
- [ ] **1.3** Sửa model `Setting` — thêm `brokerId`, đổi PK từ `key` → `@@unique([brokerId, key])`
- [ ] **1.4** Sửa model `User` — thêm `brokerId` (nullable) + `role: MASTER | BROKER`
- [ ] **1.5** Viết migration Prisma
- [ ] **1.6** Cập nhật seed.ts — tạo broker mẫu + user mẫu

---

## PHASE 2 — Sửa Landing Page & Site Admin (Tầng 2)
> Mục tiêu: Mỗi site đọc đúng settings + leads theo brokerId

- [ ] **2.1** `src/app/page.tsx` — load settings theo `brokerId` (từ env hoặc domain)
- [ ] **2.2** `GET /api/admin/settings` — filter theo `brokerId` của user đang login
- [ ] **2.3** `POST /api/admin/settings` — chỉ update settings của brokerId mình
- [ ] **2.4** `GET /api/admin/leads` — filter theo `brokerId`
- [ ] **2.5** `POST /api/lead` — tự động gán `brokerId` khi lưu lead mới
- [ ] **2.6** Middleware auth — phân biệt MASTER vs BROKER

---

## PHASE 3 — Email Notification khi có Lead mới
> Mục tiêu: Môi giới nhận email ngay khi khách điền form

- [ ] **3.1** Cài thư viện: `npm install resend` (hoặc nodemailer)
- [ ] **3.2** Thêm `RESEND_API_KEY` vào `.env`
- [ ] **3.3** Sửa `POST /api/lead` — sau khi lưu DB, gửi email đến `broker.notifyEmail`
- [ ] **3.4** Template email: Tên khách, SĐT, Thời gian, Tên dự án

---

## PHASE 4 — Build Master Admin (Tầng 3)
> Mục tiêu: Dashboard tổng, quản lý tất cả môi giới + leads

- [ ] **4.1** Tạo route `/master` hoặc project mới
- [ ] **4.2** Login riêng cho MASTER role
- [ ] **4.3** Dashboard: tổng web, tổng traffic, tổng leads
- [ ] **4.4** Trang `/master/brokers` — bảng danh sách môi giới
  - Toggle status: ACTIVE / PAUSED / EXPIRED
  - Màu cảnh báo gia hạn (đỏ ≤7 ngày, vàng ≤14 ngày)
  - Ngày kích hoạt / hết hạn
- [ ] **4.5** Trang `/master/brokers/[id]` — chi tiết leads của môi giới đó
- [ ] **4.6** Trang `/master/leads` — tất cả leads toàn hệ thống
  - Filter theo môi giới, trạng thái, ngày
  - Xuất Excel
- [ ] **4.7** Trang `/master/compensation` — tính thù lao coder
  - Đếm web ACTIVE × 200.000đ
  - Nút "Chốt tuần này"

---

## PHASE 5 — Thêm Môi Giới Mới (Workflow)
> Quy trình chuẩn khi có khách mua web mới

- [ ] **5.1** Master Admin tạo Broker record mới
- [ ] **5.2** Master Admin tạo User (BROKER role) cho môi giới
- [ ] **5.3** Deploy landing page mới lên server (subdomain mới)
- [ ] **5.4** Set `BROKER_ID=x` trong `.env` của site đó
- [ ] **5.5** Môi giới nhận email với link admin + mật khẩu

---

## Thứ Tự Ưu Tiên

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
  DB         API       Email    Master    Workflow
  (nền)      (fix)     (notify) (build)   (process)
```

---

## Git Workflow

```bash
# Làm việc hàng ngày
git checkout develop
git add .
git commit -m "feat: mô tả"

# Khi test xong, merge lên production
git checkout main
git merge develop
git push origin main

# SSH server, pull và deploy
ssh coast6950@139.180.138.113
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
cd ~/public_html/LadingPage_BDS_service
git pull
npm run build
pm2 restart coastal
```
