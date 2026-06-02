---
tags: [coastal, tech, dev]
updated: 2026-06-02
---

# Tech Stack & Architecture

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14.2.3 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion 11 |
| DB | MySQL local (Prisma 6 + prisma-client-js) |
| Auth | jose JWT + httpOnly cookie |
| Deploy | Vercel (auto khi push main) |
| Icons | Inline SVG |

## Components

```
src/components/
├── Header.tsx          ← Sticky, hamburger mobile
├── GalleryMosaic.tsx   ← Full-width mosaic + Share/Like
├── GalleryModal.tsx    ← Fullscreen, tabs, lightbox, form cuối
├── PropertyMain.tsx    ← Giá, countdown, stats, description
├── PropertySidebar.tsx ← Agent card, form liên hệ, sticky
├── CountdownTimer.tsx  ← Đếm ngược đến 27/06/2026
├── CounterStats.tsx    ← 4 số (93.9ha, 7100 tỷ, 14.4%, 1111+)
├── ViewLikeCounter.tsx ← Lượt xem + Lưu → /api/stats
├── LocationMap.tsx     ← Google Maps + tabs địa điểm
├── PartnersStrip.tsx   ← Marquee logo đối tác
├── ScrollReveal.tsx    ← Framer Motion fade-in wrapper
├── FloatingActions.tsx ← "Nhận Báo Giá" + back-to-top
└── Footer.tsx          ← Logo, contacts, QR Zalo
```

## API Routes

### `/api/lead` — Form → Google Sheets
```env
NEXT_PUBLIC_GOOGLE_SHEETS_URL="https://script.google.com/macros/s/AKfycbxgGJ3VlmP6N0YuHjzyCyjCRsYFNXxa98bYCx17joyguZLLTdW7kD-_9shyzdl7qF5V/exec"
```
- Script mẫu: `docs/google-sheets-script.js`
- Các form dùng: PropertySidebar, GalleryModal (sau 43 ảnh), ContactForm

### `/api/stats` — Lượt xem / Lưu (Upstash Redis)
```env
UPSTASH_REDIS_REST_URL="https://close-adder-107638.upstash.io"
UPSTASH_REDIS_REST_TOKEN="gQAAAAAAAaR2..."
```
- Keys: `coastal_views`, `coastal_likes`

## SEO

- Title: Coastal Quảng Ngãi — Khu Đô Thị Nghỉ Dưỡng Cao Cấp Ven Biển
- BASE_URL: `https://coastal-quangngai.vn` *(đổi khi có domain thật)*
- JSON-LD: RealEstateListing + Organization + WebSite
- OG Image: `/public/og-image.jpg` (1200×630)

## Admin Routes

```
/admin/login      ← Login (jose JWT)
/admin            ← Dashboard: stats leads
/admin/leads      ← Bảng leads, filter, đổi status, export CSV
/admin/settings   ← Sửa giá/hotline/countdown không cần deploy
```

```
src/
├── lib/
│   ├── auth.ts       ← jose signToken/verifyToken/getSession
│   ├── prisma.ts     ← Prisma singleton với libsql adapter
│   └── utils.ts      ← cn() helper
├── middleware.ts      ← Bảo vệ /admin/* bằng JWT Edge-compatible
├── components/
│   ├── ui/           ← shadcn: button, input, card, label
│   └── admin/
│       └── AdminSidebar.tsx
└── app/
    ├── admin/
    │   ├── login/
    │   ├── leads/
    │   └── settings/
    └── api/
        ├── auth/login + logout
        └── admin/leads + settings
```

## DB (Prisma 6 + MySQL)

- Local: `mysql://root@localhost:3306/coastal_admin`
- Models: `User`, `Lead`, `Setting`
- Seed: `npm run seed` → admin@coastal.vn / coastal2026
- Dùng `prisma-client-js` — không cần adapter, giống chanan-clone

## shadcn/ui (manual install — không dùng CLI)

Components trong `src/components/ui/`: button, input, card, label  
CSS vars shadcn trong `globals.css`, Tailwind tokens trong `tailwind.config.ts`

## Lệnh thường dùng

```bash
npm run dev          # dev local
npm run seed         # tạo admin user + default settings
npm run build        # build check
git push origin main # deploy (auto Vercel)
```

---
*Xem [[STATUS]] để biết tình trạng · [[ASSET-MAP]] cho cấu trúc ảnh*
