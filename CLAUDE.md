# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Đọc Trước — Folder Structure

```
/Volumes/MAC_OPTION/TrungDigitalMedia/
├── landing-template/   ← BẠN ĐANG Ở ĐÂY — 1 instance phục vụ TẤT CẢ môi giới
├── master-admin/       ← Master Admin dashboard (repo riêng)
└── sites/              ← CŨ / DEPRECATED — không dùng nữa
```

Tài liệu đầy đủ: `docs/DevOps/00-Project-Overview.md`

---

## Project Overview

**Trung Digital Media — BDS Landing Page** — Next.js multi-tenant SaaS cho chuỗi landing page bất động sản. **1 instance duy nhất** phục vụ tất cả môi giới — broker được nhận diện qua **domain của request** (không còn BROKER_ID). Multi-tenant MySQL DB. Built with Next.js 14 App Router, Prisma (MySQL), and shadcn/ui.

## Commands

```bash
# Development
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server

# Database
npm run seed         # Seed the database (tsx prisma/seed.ts)
npx prisma migrate dev --name <name>   # Create and apply a migration
npx prisma migrate deploy              # Apply pending migrations in production
npx prisma generate                    # Regenerate Prisma client after schema changes
npx prisma studio                      # Open Prisma Studio GUI
```

No lint or test commands are configured in this project.

## Architecture

### App Structure

- `src/app/page.tsx` — the landing page (Server Component); loads all settings from DB via Prisma, wraps everything in `SettingsProvider`, then renders the public-facing component stack
- `src/app/admin/` — admin panel routes (all protected by JWT middleware)
- `src/app/api/` — REST API routes for auth, lead capture, settings CRUD, file uploads, and stats
- `src/middleware.ts` — Edge middleware that guards all `/admin/*` routes (except `/admin/login`) by verifying the `coastal_admin_token` JWT cookie

### Settings System

Content is stored as key-value pairs in the `Setting` DB table. The `SettingsProvider` context (`src/components/SettingsProvider.tsx`) holds a `SettingsMap` with typed keys and hardcoded defaults. On the landing page, settings are fetched server-side and merged over defaults. In the admin editor (`/admin/editor`), they are fetched client-side via `GET /api/admin/settings` and saved via `POST /api/admin/settings`.

Rich-text fields (`property_info_html`, `amenities_html`) are stored as raw HTML and rendered with `@tailwindcss/typography` (`prose` class). Gallery data (`gallery_data`) is stored as a JSON string parsed into a typed structure of categories + photos.

### Authentication

JWT-based auth using `jose`. Token is stored as the `coastal_admin_token` HttpOnly cookie (7-day expiry). `src/lib/auth.ts` provides `signToken`, `verifyToken`, and `getSession` helpers. The `JWT_SECRET` env var must be set in production (falls back to a hardcoded dev secret).

### Database

Prisma with MySQL. Three models:
- `User` — admin accounts
- `Lead` — captured contact form submissions (name, phone, email, source, status, note)
- `Setting` — all editable site content as key-value pairs

The `dev.db` file in the project root is a SQLite artifact and is not used — the actual DB is MySQL via `DATABASE_URL`.

### Admin Panel Pages

| Route | Purpose |
|---|---|
| `/admin` | Dashboard with lead stats and recent leads |
| `/admin/leads` | Full leads table with status management |
| `/admin/editor` | Content editor with live preview; manages all `SettingsMap` keys including gallery CRUD |
| `/admin/profile` | Change admin name/password |

### Public Landing Page Components

All public components read from `useSettings()`. Key components:
- `HeroCinematic` / `HeroSection` — above-the-fold hero with countdown timer
- `GalleryMosaic` — photo gallery with modal, driven by parsed `gallery_data` setting
- `PropertyMain` — tabbed content rendering `property_info_html` and `amenities_html` as rich text
- `PropertySidebar` — sticky contact form that POSTs to `POST /api/lead`
- `ContactForm` — re-used contact form component
- `CountdownTimer` — counts down to `open_date_time` setting
- `FloatingActions` — floating CTA buttons (hotline, Zalo)

### Path Alias

`@/` maps to `src/` (configured in `tsconfig.json`).
