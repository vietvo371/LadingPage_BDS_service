---
tags: [coastal, tech, dev]
updated: 2026-06-02
---

# Tech Stack & Architecture

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14.2.3 (App Router) |
| Styling | Tailwind CSS + shadcn/ui v4 (CLI install) |
| Icons | lucide-react |
| Animation | Framer Motion 11 |
| DB | MySQL local — `coastal_admin` (Prisma 6) |
| Auth | jose JWT + httpOnly cookie (Edge-compatible) |
| Deploy | Vercel (auto khi push main) |

## Admin — Routes

```
/admin/login      ← Login form (shadcn Card + Input)
/admin            ← Dashboard: 4 stat cards + leads gần đây
/admin/leads      ← Table leads, filter, đổi status, export CSV
/admin/settings   ← Sửa giá/hotline/countdown không cần deploy
```

## Admin — Architecture

```
src/
├── middleware.ts                ← Bảo vệ /admin/* bằng jose jwtVerify (Edge)
├── lib/
│   ├── auth.ts                 ← jose signToken/verifyToken/getSession
│   ├── prisma.ts               ← Prisma singleton (prisma-client-js, không adapter)
│   └── utils.ts                ← cn() helper
├── hooks/
│   └── use-mobile.ts           ← shadcn sidebar hook
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx     ← "use client" — SidebarProvider + AdminSidebar + SidebarInset
│   │   └── AdminSidebar.tsx    ← shadcn Sidebar với lucide icons, render prop cho Link
│   └── ui/                     ← shadcn CLI: button, card, input, label, badge,
│                                  table, sidebar, sheet, tooltip, skeleton, separator, avatar
└── app/
    ├── admin/
    │   ├── layout.tsx          ← metadata noindex
    │   ├── page.tsx            ← Server Component, prisma queries
    │   ├── leads/page.tsx      ← Client Component
    │   └── settings/page.tsx   ← Client Component
    └── api/
        ├── auth/login + logout
        ├── admin/leads + settings
        └── lead/               ← Form → MySQL + Google Sheets song song
```

## DB (Prisma 6 + MySQL)

```
Host:    localhost:3306
DB:      coastal_admin
Tables:  User, Lead, Setting
Seed:    npm run seed → admin@coastal.vn / coastal2026
```

**Quan trọng:**
- Prisma 6 dùng `prisma-client-js` — không cần driver adapter (khác Prisma 7)
- URL trong cả `.env` (cho Prisma CLI) và `.env.local` (cho Next.js runtime)
- `prisma.config.ts` chỉ dùng ở Prisma 7 — đã xóa

## shadcn/ui v4 — Lưu ý

- Install bằng `npx shadcn@latest add <component>` — không copy tay
- Button/Input dùng `@base-ui/react` — không có `asChild`, dùng `render` prop
- Sidebar cần `SidebarProvider` ở Client Component (`AdminLayout.tsx`), không đặt trong Server Component
- `SidebarMenuButton` dùng `render={<Link href="..." />}` thay vì `asChild`

## Env vars

```
# .env (Prisma CLI)
DATABASE_URL="mysql://root@localhost:3306/coastal_admin"

# .env.local (Next.js runtime — không commit)
DATABASE_URL="mysql://root@localhost:3306/coastal_admin"
JWT_SECRET="coastal-secret-2026-change-in-prod"
NEXT_PUBLIC_GOOGLE_SHEETS_URL="https://script.google.com/macros/s/..."
UPSTASH_REDIS_REST_URL="https://close-adder-107638.upstash.io"
UPSTASH_REDIS_REST_TOKEN="..."
```

## Lệnh thường dùng

```bash
npm run dev          # dev local
npm run seed         # tạo admin + default settings
npm run build        # build check
git push origin main # deploy auto Vercel
```

---
*Xem [[STATUS]] để biết tình trạng · [[ASSET-MAP]] cho cấu trúc ảnh · [[PROJECT-INFO]] cho nội dung*
