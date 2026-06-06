# 📋 Kế Hoạch Phát Triển — Master Admin System

> Branch: `develop` → test xong → merge `main` → push production

---

## PHASE 1 — Refactor Database (Multi-tenant) ✅ DONE
> Mục tiêu: Chuyển từ 1 site/1 DB → 1 DB dùng chung có brokerId

- [x] **1.1** Thêm model `Broker` vào schema.prisma (có trường `domain @unique`)
- [x] **1.2** Sửa model `Lead` — thêm `brokerId`
- [x] **1.3** Sửa model `Setting` — thêm `brokerId`, `@@unique([brokerId, key])`
- [x] **1.4** Sửa model `User` — thêm `brokerId` (nullable) + `role: MASTER | BROKER`
- [x] **1.5** Viết migration Prisma
- [x] **1.6** Cập nhật seed.ts — tạo broker mẫu + user mẫu

---

## PHASE 2 — Sửa Landing Page & Site Admin (Tầng 2) ✅ DONE
> Mục tiêu: Nhận diện broker qua domain, load đúng settings + leads

- [x] **2.1** `src/app/page.tsx` — đọc `Host` header → tìm broker theo domain → load settings
- [x] **2.2** `GET /api/admin/settings` — filter theo `brokerId` của user đang login
- [x] **2.3** `POST /api/admin/settings` — chỉ update settings của brokerId mình
- [x] **2.4** `GET /api/admin/leads` — filter theo `brokerId`
- [x] **2.5** `POST /api/lead` — đọc Host header → tìm broker → gán `brokerId` tự động
- [x] **2.6** Middleware auth — phân biệt MASTER vs BROKER

> ⚠️ Không còn `BROKER_ID` trong `.env` — broker được nhận diện 100% qua domain

---

## PHASE 3 — Email Notification khi có Lead mới ✅ DONE
> Mục tiêu: Môi giới nhận email ngay khi khách điền form

- [x] **3.1** Cài Resend: `npm install resend`
- [x] **3.2** Thêm `RESEND_API_KEY` vào `.env`
- [x] **3.3** `POST /api/lead` — sau khi lưu DB, gửi email đến `broker.notifyEmail`
- [x] **3.4** Template email: Tên khách, SĐT, Thời gian, Tên dự án

---

## PHASE 4 — Build Master Admin (Tầng 3) ✅ DONE
> Mục tiêu: Dashboard tổng, quản lý tất cả môi giới + leads

- [x] **4.1** Project riêng `master-admin/` (repo: Master-Admin-BDS)
- [x] **4.2** Login riêng cho MASTER role
- [x] **4.3** Dashboard: tổng web, tổng leads, thù lao coder
- [x] **4.4** Trang `/brokers` — bảng danh sách môi giới
  - Toggle status: ACTIVE / PAUSED / EXPIRED
  - Màu cảnh báo gia hạn (đỏ ≤7 ngày, vàng ≤14 ngày)
- [x] **4.5** Trang `/brokers/[id]` — chi tiết leads
- [x] **4.6** Trang `/leads` — tất cả leads, filter, xuất Excel
- [x] **4.7** Trang `/compensation` — tính thù lao coder (ACTIVE × 200k)

---

## PHASE 5 — Thêm Môi Giới Mới (Workflow) ✅ DONE
> Quy trình đơn giản hoá tối đa — không cần clone, không cần terminal

- [x] **5.1** Master Admin form tạo Broker record mới (nhập domain, tên, SĐT, mẫu)
- [x] **5.2** Tự động tạo User (BROKER role) kèm credentials
- [x] **5.3** Copy credentials gửi cho môi giới
- [ ] **5.4** *(Infra — thủ công)* Cloudflare A record + CyberPanel vHost proxy → port 3000
  > Xem chi tiết: `Deploy-NextJS-CyberPanel.md` — Phần B

> ⚠️ **Không còn bước "Set BROKER_ID trong .env"** — broker nhận diện qua domain

---

## Thứ Tự Ưu Tiên

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
  DB         API       Email    Master    Workflow
  ✅          ✅         ✅        ✅         ✅
```

**Còn lại:**
- Deploy lên server production (xem `00-Project-Overview.md` → Mục VIII)
- Verify domain Resend production

---

## Git Workflow

```bash
# Làm việc hàng ngày
git checkout develop
git add .
git commit -m "feat: mô tả"

# Khi test xong, deploy
git checkout main
git merge develop
git push origin main

# SSH server — 1 lần = tất cả sites cập nhật
ssh coast6950@139.180.138.113
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
cd ~/public_html/LadingPage_BDS_service
git pull && npm run build && pm2 restart landing-template
```
