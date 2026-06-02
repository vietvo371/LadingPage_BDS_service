---
tags: [coastal, archive, session-log]
---

# 🏖️ Coastal Quảng Ngãi — Session Archive

> [!tip] Dùng Obsidian? Mở [[STATUS]] thay file này — nhỏ hơn, load nhanh hơn.

> **Last updated:** 02/06/2026  
> **Live URL:** https://coastal-quangngai.vercel.app  
> **Project path:** `/Volumes/MAC_OPTION/Build_Ladingpage`  
> **GitHub:** `vietvo371/LadingPage_BDS_service` (branch: main)

## ✅ Verified Production Status (02/06/2026)

| Hệ thống | Status |
|----------|--------|
| Google Sheets form | ✅ Hoạt động — data vào sheet thật |
| Upstash Redis views | ✅ Hoạt động — 17+ lượt xem thật |
| Upstash Redis likes | ✅ Hoạt động |
| Deploy Vercel | ✅ Auto deploy khi push main |

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14.2.3 (App Router, Static) |
| Styling | Tailwind CSS |
| Font | **Be Vietnam Pro** (Vietnamese + Latin) |
| Màu chủ đạo | `#e06f46` (cam/coral) |
| Animation | Framer Motion 11 |
| Deploy | Vercel (auto-deploy khi push GitHub) |
| Icons | Inline SVG (không dùng library) |

---

## 🎨 Design Reference

- **Layout gốc:** JamesEdition.com (property listing style)
- **Notion brief:** `37061caa175280c59e73f89faae7e8dd`
- **Màu sắc:** `#e06f46` thay blue của JamesEdition
- **Font:** Be Vietnam Pro thay Playfair/Inter

---

## 🔑 Thông tin liên hệ thật

```
Tên:     Nguyễn Quốc Trung
Team:    Đội ngũ sàn PQR
Hotline: 0365 285 863
Email:   trungnguyen.coastal@gmail.com
Zalo:    0365 285 863 (QR: /public/images/logo/qr-zalo.png)
Địa chỉ: 308 Hai Bà Trưng, Quảng Ngãi
```

---

## 🏗️ Cấu trúc Components

```
src/
├── app/
│   ├── page.tsx              ← Layout chính: Gallery + 2-col main/sidebar
│   ├── layout.tsx            ← SEO metadata, font, JSON-LD schema
│   ├── globals.css           ← CSS vars, marquee animation
│   └── api/
│       ├── lead/route.ts     ← POST → Google Sheets webhook
│       └── stats/route.ts    ← GET/POST → Upstash Redis (views/likes)
└── components/
    ├── Header.tsx            ← Sticky, hamburger mobile, logo
    ├── GalleryMosaic.tsx     ← Full-width mosaic + Share/Like buttons
    ├── GalleryModal.tsx      ← Fullscreen gallery, tabs, lightbox, form cuối
    ├── PropertyMain.tsx      ← Giá, countdown, stats, photo tabs, description
    ├── PropertySidebar.tsx   ← Agent card, form liên hệ, sticky
    ├── CountdownTimer.tsx    ← Đếm ngược đến 27/06/2026
    ├── CounterStats.tsx      ← 4 số đếm lên (93.9ha, 7100 tỷ, 14.4%, 1111+)
    ├── ViewLikeCounter.tsx   ← Lượt xem + Lưu (→ /api/stats)
    ├── LocationMap.tsx       ← Google Maps + tabs địa điểm lân cận
    ├── PartnersStrip.tsx     ← Marquee logo đối tác, luôn có màu
    ├── ScrollReveal.tsx      ← Framer Motion fade-in wrapper
    ├── FloatingActions.tsx   ← Nút "Nhận Báo Giá" + back-to-top nổi
    └── Footer.tsx            ← Logo, contacts, QR Zalo, social icons
```

---

## 🖼️ Assets Structure

```
public/images/
├── logo/
│   ├── logo-coastal-clean.png   ← Logo đã crop whitespace (DÙNG CÁI NÀY)
│   ├── avt_trung.jpg            ← Avatar Nguyễn Quốc Trung
│   ├── qr-zalo.png              ← QR code Zalo 0365285863
│   └── zalo.jpg                 ← Logo Zalo cho button
├── logo-doi-tac/                ← SWECO, SHMS, GioForma, DJC, 100architects
├── mau-nha/                     ← 8 loại nhà × 6-8 ảnh render
│   ├── dinh-thu-tri-lieu/       ← 01=spec sheet, 02+=render đẹp
│   ├── biet-thu-bien-don-lap/
│   ├── biet-thu-bien-song-lap/
│   ├── nha-cong-vien/
│   ├── nha-quang-truong/
│   ├── nha-dai-lo/
│   ├── nha-ven-song/
│   └── nha-vuon/                ← Bắt đầu từ -03 (không có 01, 02)
└── ngoai-that/
    └── phoi-canh-tong-the.jpg   ← Ảnh hero chính (aerial view)
```

> **Quan trọng:** Ảnh `*-01.png` = spec sheet/mặt bằng. Ảnh `*-02.png` trở đi = render 3D đẹp. Gallery dùng từ `02+`.

---

## 🌐 SEO & Metadata

- **Title:** Coastal Quảng Ngãi — Khu Đô Thị Nghỉ Dưỡng Cao Cấp Ven Biển
- **BASE_URL:** `https://coastal-quangngai.vn` *(cần đổi khi có domain thật)*
- **OG Image:** `/public/og-image.jpg` (1200×630)
- **Favicon set:** favicon.ico, 16/32px PNG, apple-touch 180px, PWA 192/512px
- **JSON-LD:** RealEstateListing + Organization + WebSite schema
- **Sitemap:** `/public/sitemap.xml`
- **Robots:** `/public/robots.txt`
- **Manifest:** `/public/site.webmanifest` (theme: #e06f46)

---

## 🔌 API Routes (Production Setup)

### `/api/lead` — Lưu form lead
```env
NEXT_PUBLIC_GOOGLE_SHEETS_URL="https://script.google.com/macros/s/YOUR_ID/exec"
```
- Script mẫu: `docs/google-sheets-script.js`
- Khi chưa setup → `console.log` + `{ fake: true }`
- Các form dùng: PropertySidebar, GalleryModal (cuối 43 ảnh), ContactForm

### `/api/stats` — Lượt xem / Lưu
```env
UPSTASH_REDIS_REST_URL="https://your-db.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_token"
```
- Đăng ký free: https://upstash.com
- Keys: `coastal_views`, `coastal_likes`
- Khi chưa setup → fake data (1248 views, 87 likes)

### Trạng thái hiện tại
| Tính năng | Code | Production |
|-----------|------|------------|
| Form → Google Sheets | ✅ Ready | ⚠️ Cần điền env var |
| Lượt xem Upstash | ✅ Ready | ⚠️ Cần điền env var |
| Lưu/Like Upstash | ✅ Ready | ⚠️ Cần điền env var |
| Share | ✅ Web Share API | ✅ Live |

---

## 📊 Dự án Coastal Quảng Ngãi — Nội dung

```
Tên:          Coastal Quảng Ngãi (Haus Coastal Quảng Ngãi)
Địa chỉ:      Dung Quất – Sa Huỳnh, Quảng Ngãi, 570000
Maps:         https://maps.app.goo.gl/fayQMvikCVXt9iYf6
Giá:          4.8 Tỷ – 30 Tỷ
Diện tích:    93.9 ha
Vốn đầu tư:  7.100 tỷ
Mật độ XD:   14.4%
Sản phẩm:    ~1.111 căn
Mở bán GĐ1: 27/06/2026
Cập nhật:    30/05/2026
Mã:          MSCT#01
```

**Cơ cấu GĐ1:** 57 NV · 36 NVS · 29 NQT · 25 NDL · 22 NCV · 24 BTSL · 11 BTDL · 8 BTBTL

**Đối tác:** SWECO (Quy hoạch) · GioForma (Kiến trúc) · 100architects (Cảnh quan) · SHMS (Nghỉ dưỡng) · DJC Coalition (Đầu tư)

---

## 🚀 Git Commits — Session này (31/05/2026)

| Commit | Nội dung |
|--------|----------|
| `97fa6eb` | Build landing page theo layout JamesEdition |
| `d155190` | Scroll animations, floating CTA, countdown, counter stats |
| `2c6a1cf` | SEO đầy đủ: favicon, OG, JSON-LD, sitemap, manifest |
| `38b3fea` | Thông tin thật + responsive mobile sidebar |
| `1ab5953` | QR code Zalo thật (0365285863) |
| `f33cb7e` | Xem thêm/Thu gọn cho Quy Mô |
| `a5fae5a` | 4 fix: Tiện ích xem thêm, Maps đúng vị trí, PQR, Booking |
| `de61ec5` | LocationMap component — kiểu BĐS (tabs Trường/Siêu thị/CV/BV) |
| `c99d9de` | Google Maps đúng vị trí Coastal |
| `753088e` | Sidebar sticky fix |
| `3e8a20c` | Countdown 27/06/2026 |
| `814ae40` | Lượt xem + nút yêu thích dưới ngày cập nhật |
| `813cd32` | Share/Like buttons trên gallery mosaic |
| `decf20b` | 3 UX: form sau ảnh là slide, tab order, drag scroll |
| `e7e07f4` | Form hiện cuối grid sau 43 ảnh |
| `29f4e62` | Form gallery style sidebar + sửa chính tả |

## 🚀 Git Commits — Sau session (01/06/2026)

| Commit | Nội dung |
|--------|----------|
| `7bfcbbe` | **API routes thật:** `/api/lead` (Google Sheets) + `/api/stats` (Upstash Redis), `.env.example`, `docs/google-sheets-script.js`, update ViewLikeCounter + ContactForm + PropertySidebar để gọi API |
| `6e06247` | Update GalleryModal: tab order + enable drag-to-scroll |

---

## ⚙️ Để Deploy Production Hoàn Chỉnh

### Bước 1 — Setup Google Sheets
1. Tạo Google Sheet mới
2. Tools → Apps Script → paste code từ `docs/google-sheets-script.js`
3. Deploy → Web App → Anyone → Copy URL
4. Điền vào `.env.local`: `NEXT_PUBLIC_GOOGLE_SHEETS_URL=<url>`

### Bước 2 — Setup Upstash Redis
1. Đăng ký https://upstash.com (free)
2. Tạo database → Copy REST URL + Token
3. Điền vào `.env.local`:
   ```
   UPSTASH_REDIS_REST_URL=https://...upstash.io
   UPSTASH_REDIS_REST_TOKEN=...
   ```

### Bước 3 — Vercel Environment Variables
- Vào Vercel Dashboard → Project → Settings → Environment Variables
- Thêm 3 biến như trong `.env.local`

### Bước 4 — Deploy
```bash
git add -A && git commit -m "..." && vercel --prod
# hoặc: git push origin main → auto deploy
```

---

## 📱 Trạng thái Features

| Feature | Status |
|---------|--------|
| Gallery mosaic full-width | ✅ Live |
| Gallery modal 43 ảnh + categories | ✅ Live |
| Form liên hệ (sidebar, gallery, page) | ✅ UI ready, ⚠️ cần env |
| Lightbox + thumbnail filmstrip | ✅ Live |
| Form slide sau 43 ảnh | ✅ Live |
| Share button (Web Share API) | ✅ Live |
| Like/Save button | ✅ UI ready, ⚠️ cần Redis |
| Lượt xem counter | ✅ UI ready, ⚠️ cần Redis |
| LocationMap + tabs địa điểm | ✅ Live |
| Partners marquee màu | ✅ Live |
| Countdown 27/06/2026 | ✅ Live |
| Counter stats animation | ✅ Live |
| Scroll animations (Framer Motion) | ✅ Live |
| Floating CTA + back-to-top | ✅ Live |
| SEO + JSON-LD + favicon | ✅ Live |
| Mobile responsive | ✅ Checked |
| Xem thêm/Thu gọn (Quy Mô, Tiện ích) | ✅ Live |
| QR Zalo thật | ✅ Live |

---

## 🔜 Việc còn lại

- [x] ~~Điền env var Google Sheets + Upstash Redis vào Vercel~~ ✅ Done
- [ ] Đổi `BASE_URL` trong `layout.tsx` khi có domain thật
- [ ] Thêm số điện thoại hotline thật (hiện `1800 xxxx` ở ContactForm)
- [x] ~~Test form submit end-to-end~~ ✅ Done — data vào sheet thật
- [ ] (Optional) EmailJS để thêm email notification
- [ ] (Optional) Vercel Analytics
- [ ] (Optional) Video tour embed

---

## 💡 Lệnh hữu ích

```bash
# Dev local
npm run dev

# Build check
npm run build

# Deploy
vercel --prod --yes

# Git log
git log --oneline -10

# Clear .next cache nếu bị lỗi
# Dùng Finder delete /Volumes/MAC_OPTION/Build_Ladingpage/.next
```

---

*Được tạo bởi Claude Code — 02/06/2026*
