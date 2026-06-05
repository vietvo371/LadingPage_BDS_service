# 📚 Tổng Quan Dự Án — Trung Digital Media BDS System

> **ĐỌC FILE NÀY TRƯỚC** khi làm bất kỳ việc gì trong dự án.
> Cập nhật lần cuối: 2026-06-05

---

## I. Mô Hình Kinh Doanh

**Trung Digital Media** xây và bán landing page BDS cho môi giới bất động sản.

```
Môi giới mua web → Trung deploy site → Khách điền form → Môi giới nhận lead qua email
```

| Thu nhập | Giá |
|----------|-----|
| Phí duy trì | 999.000đ/năm/site |
| Thù lao coder | 200.000đ × số web ACTIVE / tuần |

---

## II. Kiến Trúc 3 Tầng

```
TẦNG 1 — Landing Page (public)
  coastal.muadatquangngai.com/
  → Khách xem, điền form

TẦNG 2 — Site Admin (môi giới)
  coastal.muadatquangngai.com/admin
  → Môi giới đăng nhập, xem leads CỦA MÌNH, chỉnh nội dung site

TẦNG 3 — Master Admin (chỉ Trung)
  admin.muadatquangngai.com/
  → Quản lý tất cả site, leads tổng, thù lao, gia hạn
```

---

## III. 2 Git Repositories

### Folder Tổng (local)
```
/Volumes/MAC_OPTION/TrungDigitalMedia/
├── landing-template/    ← SOURCE CODE template (git: LadingPage_BDS_service)
├── master-admin/        ← Master Admin (git: Master-Admin-BDS)
└── sites/               ← Mỗi môi giới = 1 subfolder clone từ landing-template
    ├── coastal/         ← BROKER_ID=1, PORT=3005
    └── suckhoetaman/    ← BROKER_ID=2, PORT=3001
```

### Repo 1 — Landing Page + Site Admin (template)
```
github.com/vietvo371/LadingPage_BDS_service
Local: /Volumes/MAC_OPTION/TrungDigitalMedia/landing-template

Branch:
  main     ← Production (stable)
  develop  ← Đang phát triển (CHƯA merge main)

Quy tắc: KHÔNG clone trực tiếp repo này lên server
         → Mỗi site = git clone riêng vào sites/<tên>/
```

### Repo 2 — Master Admin
```
github.com/vietvo371/Master-Admin-BDS
Local: /Volumes/MAC_OPTION/TrungDigitalMedia/master-admin

Branch: main

Deploy: admin.muadatquangngai.com (PORT=4000)
```

---

## IV. Server & Infrastructure

```
VPS: 139.180.138.113
Panel: CyberPanel (https://139.180.138.113:8090)
Web Server: OpenLiteSpeed
DB: MySQL — 1 database chung (multi-tenant)

Sites đang chạy:
  coastal.muadatquangngai.com  BROKER_ID=1  PORT=3005  SSH=coast6950
  suckhoetaman.com             BROKER_ID=2  PORT=3001  SSH=suckh2097

Master Admin (chưa deploy):
  admin.muadatquangngai.com    PORT=4000
```

---

## V. Database Schema (Multi-tenant)

```prisma
Broker    { id, name, phone, domain, template, status, activatedAt, expiredAt, notifyEmail }
User      { id, brokerId(NULL=MASTER), role(MASTER|BROKER), email, password }
Lead      { id, brokerId, name, phone, email, message, status, source }
Setting   { id, brokerId, key, value }  @@unique([brokerId, key])
```

**Phân quyền:**
- `BROKER` → query thêm `where: { brokerId: session.brokerId }`
- `MASTER` → không filter, thấy tất cả

---

## VI. Cấu Hình .env Mỗi Site

```env
DATABASE_URL="mysql://user:pass@localhost:3306/dbname"
JWT_SECRET="your-strong-secret"
BROKER_ID=1                          ← KHÁC NHAU MỖI SITE
RESEND_API_KEY="re_xxx"              ← Dùng chung
NEXT_PUBLIC_GOOGLE_SHEETS_URL=""     ← Tuỳ chọn
```

**Master Admin .env:**
```env
DATABASE_URL="mysql://..."           ← Cùng DB với các sites
JWT_SECRET="..."                     ← Cùng secret
```

---

## VII. Tài Khoản Mặc Định (sau seed)

| Role | Email | Password |
|------|-------|----------|
| MASTER | master@trungdigitalmedia.com | master2026@TDM |
| BROKER (coastal) | admin@coastal.vn | coastal2026 |

---

## VIII. Flow Khi Có Lead Mới

```
Khách điền form → POST /api/lead
  → Lưu DB (Lead với brokerId từ BROKER_ID env)
  → Gửi email đến Broker.notifyEmail (Resend API)
  → Gửi Google Sheets (nếu có env)
Môi giới nhận email ngay → gọi chốt nóng
```

**Lưu ý email:**
- `from` hiện dùng `onboarding@resend.dev` (test)
- Production: verify domain `trungdigitalmedia.com` trên resend.com
- File: `src/lib/email.ts`

---

## IX. Flow Thêm Môi Giới Mới

```
1. Master Admin → /brokers/new → điền form
2. Hệ thống tạo: Broker record + User BROKER
3. Copy link/email/pass → gửi môi giới

4. Cloudflare: thêm A record mới → IP VPS
5. CyberPanel: tạo website mới
6. SSH: git clone repo, tạo .env (BROKER_ID=X, PORT=30XX)
7. npm install
   npx prisma generate
   ./node_modules/.bin/prisma migrate deploy
   npx tsx prisma/seed.ts   ← CHỈ lần đầu
8. npm run build
   pm2 start npm --name "xxx" -- start -- -p 30XX
   pm2 save
9. CyberPanel: cấu hình vHost proxy → port tương ứng
10. CyberPanel: cấp SSL
```

---

## X. Flow Update Code

```bash
# Làm việc trên develop
git checkout develop
# sửa code, commit...

# Test xong → merge main → push
git checkout main && git merge develop && git push origin main

# SSH server redeploy
ssh coast6950@139.180.138.113
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
cd ~/public_html/LadingPage_BDS_service
git pull && npm install && npm run build && pm2 restart coastal
```

---

## XI. Trạng Thái Chi Tiết — ĐỌC KỸ TRƯỚC KHI CODE

### 🗂️ Git Status
```
Repo 1 (LadingPage_BDS_service):
  branch main    → code CŨ (chưa có multi-tenant, chưa có Broker table)
  branch develop → code MỚI (5 phases hoàn chỉnh, đã test local OK)
  → CHƯA merge develop → main
  → CHƯA push lên server

Repo 2 (Master-Admin-BDS):
  branch main → code MỚI, đã push GitHub
  → CHƯA deploy lên server
```

### ✅ Đã làm & test local OK
| Phase | Nội dung | Branch | Test |
|-------|---------|--------|------|
| Phase 1 | Thêm Broker model, multi-tenant schema | develop | ✅ |
| Phase 2 | API filter theo brokerId | develop | ✅ |
| Phase 3 | Email notification (Resend) | develop | ✅ email nhận được |
| Phase 4 | Master Admin dashboard, brokers, leads, compensation | Master-Admin-BDS/main | ✅ |
| Phase 5 | Form thêm môi giới mới + copy credentials | Master-Admin-BDS/main | ✅ |

### 🔲 Chưa làm
| Việc | Mức độ |
|------|--------|
| Merge `develop` → `main` (Repo 1) | 🔴 Cần làm trước khi deploy |
| Deploy Repo 1 lên server (migrate DB + rebuild) | 🔴 Cần làm |
| Deploy Repo 2 (Master Admin) lên server | 🔴 Cần làm |
| Verify domain `trungdigitalmedia.com` trên Resend | 🟡 Trước khi production |
| Export Excel leads | 🟢 Nice to have |

### 📋 Việc tiếp theo cần làm (theo thứ tự)
```
BƯỚC 1: Repo 1 — merge develop → main → push
  git checkout main
  git merge develop
  git push origin main

BƯỚC 2: Server — deploy Repo 1 (migration quan trọng!)
  ssh coast6950@139.180.138.113
  export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
  cd ~/public_html/LadingPage_BDS_service
  git pull
  npm install
  npx prisma generate
  ./node_modules/.bin/prisma migrate deploy   ← Tạo Broker table + thêm brokerId
  npm run build
  pm2 restart coastal
  ⚠️ KHÔNG seed lại — khách đã có data

BƯỚC 3: Server — deploy Repo 2 (Master Admin)
  Tạo website mới trên CyberPanel: admin.muadatquangngai.com
  SSH vào, clone Master-Admin-BDS
  Tạo .env (DATABASE_URL + JWT_SECRET)
  npm install && npx prisma generate
  npm run build
  pm2 start npm --name "master-admin" -- start -- -p 4000
  Cấu hình vHost proxy → port 4000

BƯỚC 4: Verify domain Resend
  Vào resend.com/domains → Add domain trungdigitalmedia.com
  Thêm DNS records theo hướng dẫn Resend
  Sửa src/lib/email.ts: đổi from onboarding@resend.dev → noreply@trungdigitalmedia.com
```

---

## XII. Local Dev

```bash
# Template / Landing Page dev
cd /Volumes/MAC_OPTION/TrungDigitalMedia/landing-template
npm run dev   → http://localhost:3000
# Đăng nhập site admin: admin@coastal.vn / coastal2026

# Master Admin
cd /Volumes/MAC_OPTION/TrungDigitalMedia/master-admin
PORT=4000 npm run dev   → http://localhost:4000
# Đăng nhập: master@trungdigitalmedia.com / master2026@TDM

# Xem tất cả sites
ls /Volumes/MAC_OPTION/TrungDigitalMedia/sites/
```

---

## XIII. Tài Liệu Chi Tiết (docs/DevOps/)

| File | Nội dung |
|------|---------|
| `Deploy-NextJS-CyberPanel.md` | 11 bước deploy site lên server |
| `Update-Code-Workflow.md` | Quy trình update code production |
| `Deploy-Bugs-and-Fixes.md` | 10 bugs đã gặp + cách fix |
| `Master-Admin-Architecture.md` | Thiết kế DB schema, flow |
| `Master-Admin-Dev-Plan.md` | 5 phases kế hoạch phát triển |
