# BDS Showcase Redesign — Coastal Quảng Ngãi
Date: 2026-05-26

## Summary
Redesign trang showcase "Trung Digital Media" từ HTML/CSS+Vite sang Next.js 14 + Tailwind + Shadcn với visual direction Luxury Dark (đen-vàng kim) phù hợp phân khúc BĐS cao cấp.

## Visual Direction
- **Theme:** Luxury Dark — nền đen/than `#0d0d0d`, accent vàng kim `#c9a84c`, trắng ngà
- **Typography:** Playfair Display (serif heading) + Inter (body)
- **Feel:** Vinhomes/Novaland-style — sang trọng, tin cậy, đẳng cấp

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Shadcn/ui
- Framer Motion (scroll animation, parallax)
- Deploy: Vercel

## Sections (top → bottom)
1. **Header** — fixed, logo + nav links + CTA button
2. **Hero Cinematic** — full-screen ảnh nền + text overlay + 2 CTA + stats row
3. **Templates Section** — Featured (1 lớn) + Compact (2 nhỏ) layout
4. **Contact Form** — Shadcn form fields + webhook-ready submit
5. **Referral Box** — chương trình 100k
6. **Footer** — brand + links + contacts

## Templates
- Giữ nguyên 3 file HTML trong `public/templates/` — link "Xem Live Demo" vẫn hoạt động
- Không port sang Next.js (YAGNI)

## Key Components
- `HeroCinematic` — parallax bg image, gradient overlay, animated headline
- `TemplatesSection` — 1 featured card + 2 compact cards, hover overlay "Xem Demo"
- `ContactForm` — Shadcn form, console.log submit (webhook hookup later)
- `SuccessModal` — Shadcn Dialog
