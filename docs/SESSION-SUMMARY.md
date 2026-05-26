# Session Summary — Redesign Build_Ladingpage
**Ngày:** 2026-05-26  
**Dự án:** `/Volumes/MAC_OPTION/Build_Ladingpage`

---

## 🎯 Mục tiêu
Redesign toàn bộ hệ thống landing page BĐS "Trung Digital Media / Coastal Quảng Ngãi" từ HTML/CSS + Vite sang tech stack hiện đại, với visual direction Luxury Dark phù hợp phân khúc BĐS cao cấp.

---

## 🔍 Kiểm tra ban đầu
- Dự án ban đầu: HTML/CSS thuần + Vite build tool
- 1 trang showcase (`index.html`) + 3 template pages (`dautu`, `ancu`, `lead`)
- CSS dùng màu kem/sand (Mona Land style) — chưa phù hợp BĐS cao cấp
- Lỗi phát hiện: biến CSS `--text-gold` dùng nhưng chưa khai báo trong `:root`
- Form submit chỉ `console.log`, chưa kết nối backend

---

## 🎨 Quyết định thiết kế (qua Brainstorming + Visual Companion)

| Hạng mục | Lựa chọn | Lý do |
|---|---|---|
| **Visual Direction** | Luxury Dark | Nền đen-vàng kim, sang trọng như Vinhomes/Novaland |
| **Tech Stack** | Next.js 14 + Tailwind + Shadcn | Scalable, dễ mở rộng sau (admin, webhook, CMS) |
| **Hero Layout** | Full-screen Cinematic | Ảnh nền toàn màn hình, ấn tượng tối đa |
| **Template Cards** | Featured (1 lớn) + Compact (2 nhỏ) | Tạo hierarchy rõ ràng, nổi bật sản phẩm chủ lực |

---

## 🏗️ Công việc đã thực hiện

### 1. Setup Next.js Project
- Xóa Vite config cũ, init Next.js 14 (App Router) + TypeScript
- Cài Tailwind CSS, Shadcn/ui, Framer Motion
- Google Fonts: **Playfair Display** (heading serif) + **Inter** (body)
- Deploy-ready trên Vercel

### 2. Trang Showcase Chính (`src/app/page.tsx`)
Các component đã tạo:

| Component | Mô tả |
|---|---|
| `Header.tsx` | Fixed nav, scroll-aware blur, logo vàng kim |
| `HeroCinematic.tsx` | Full-screen ảnh resort, gradient overlay, headline + stats |
| `TemplatesSection.tsx` | 1 featured card (3/5) + 2 compact cards (2/5) |
| `ContactForm.tsx` | Shadcn-style form + Success Modal |
| `ReferralBox.tsx` | Chương trình 100k dashed border |
| `Footer.tsx` | 3-col: brand / contact / links |

### 3. Redesign 3 Template CSS (Luxury Dark)
Rewrite toàn bộ `style.css` cho 3 templates — giữ nguyên HTML/content:

#### Mẫu 1 — Focus Đầu Tư (`dautu/style.css`)
- Hero full-screen biển + spec cards vàng kim
- ROI Calculator: dark sliders, gold thumb, output panel
- Bảng so sánh: header row vàng, dark cells
- Payment steps: gold badges
- Form đăng ký: dark inputs + gold CTA

#### Mẫu 2 — Focus An Cư (`ancu/style.css`)
- Split hero: content trái + quick-form phải (dark card)
- Amenities photo grid với hover overlay
- Floorplan tabs: active tab gold underline
- Gallery 4-col với hover scale effect
- Site visit form centered với gold border

#### Mẫu 3 — Thu Lead Nhanh (`lead/style.css`)
- Countdown timer: gold bordered boxes + monospace
- 3 bullet points: gold circle icons
- Form compact + CTA vàng full-width
- Sticky bar: Hotline / Zalo / Nhận Bảng Giá

---

## 🎨 Design System — Luxury Dark

```css
/* Màu sắc */
--bg:           #0d0d0d   /* Nền chính */
--bg-card:      #111111   /* Card */
--bg-alt:       #0a0a0a   /* Section thay thế */
--gold:         #c9a84c   /* Accent vàng kim */
--border:       rgba(201,168,76,0.15)
--border-hover: rgba(201,168,76,0.4)
--text:         #ffffff
--text-muted:   rgba(255,255,255,0.5)

/* Typography */
Heading: Playfair Display (serif)
Body:    Inter (sans-serif)

/* UI */
Border-radius: 0 (sharp corners — luxury style)
Transition: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 📁 Cấu trúc thư mục cuối

```
/Volumes/MAC_OPTION/Build_Ladingpage/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Header.tsx
│       ├── HeroCinematic.tsx
│       ├── TemplatesSection.tsx
│       ├── ContactForm.tsx
│       ├── ReferralBox.tsx
│       └── Footer.tsx
├── public/
│   ├── images/
│   │   ├── investment.png
│   │   ├── resort.png
│   │   └── lead.png
│   └── templates/
│       ├── dautu/  (index.html + style.css — Luxury Dark)
│       ├── ancu/   (index.html + style.css — Luxury Dark)
│       └── lead/   (index.html + style.css — Luxury Dark)
├── .claude/
│   └── launch.json
├── docs/
│   └── superpowers/specs/
│       └── 2026-05-26-bds-showcase-redesign.md
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Cách chạy

```bash
cd /Volumes/MAC_OPTION/Build_Ladingpage
npm run dev
# → http://localhost:3000
```

| URL | Trang |
|---|---|
| `http://localhost:3000` | Showcase chính (Next.js) |
| `http://localhost:3000/templates/dautu/index.html` | Mẫu 1 — Focus Đầu Tư |
| `http://localhost:3000/templates/ancu/index.html` | Mẫu 2 — Focus An Cư |
| `http://localhost:3000/templates/lead/index.html` | Mẫu 3 — Thu Lead |

---

## ⚠️ Việc còn lại (TODO)

- [ ] **Kết nối form webhook** — gửi lead về Zalo OA / Google Sheet / CRM
- [ ] **Điền số điện thoại thật** — thay `0905.xxx.xxx` trong footer và sticky bar
- [ ] **Ảnh dự án thật** — thay ảnh placeholder bằng ảnh thực tế của dự án
- [ ] **Deploy lên Vercel** — `vercel --prod`
- [ ] **Tên miền riêng** — trỏ domain về Vercel
- [ ] **Fix npm security** — 2 vulnerabilities (1 moderate, 1 critical) trong Next.js 14.2.3
- [ ] **Thêm animation** — Framer Motion scroll reveal (đã cài nhưng chưa dùng)
- [ ] **SEO** — thêm Open Graph, sitemap, robots.txt

---

*Generated by Claude — Trung Digital Media BDS Showcase Redesign Session*
