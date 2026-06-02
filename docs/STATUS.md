---
tags: [coastal, status, context]
updated: 2026-06-02
---

# Coastal Quảng Ngãi — Status

> **Paste note này vào đầu session mới để Claude hiểu ngay context**

## 🟢 Production — Tất cả hoạt động

| Hệ thống | Status | Ghi chú |
|----------|--------|---------|
| Live URL | ✅ | coastal-quangngai.vercel.app |
| Form → Google Sheets | ✅ | Data vào sheet thật |
| Form → MySQL DB | ✅ | Lưu đồng thời vào coastal_admin |
| Upstash Redis (views/likes) | ✅ | Đang đếm thật |
| Admin login | ✅ | jose JWT + httpOnly cookie |
| Admin dashboard | ✅ | Stat cards + leads gần đây |
| Admin leads | ✅ | Table, filter, đổi status, export CSV |
| Admin settings | ✅ | Chỉnh giá/hotline/countdown không cần deploy |
| Deploy auto Vercel | ✅ | Push main → auto deploy |

## 🔐 Admin

- URL: `/admin/login`
- Email: `admin@coastal.vn`
- Mật khẩu: `coastal2026`

## 📋 Todo còn lại

- [ ] Push code lên GitHub (commit chưa push)
- [ ] Điền hotline thật vào ContactForm (hiện: `1800 xxxx`)
- [ ] Đổi `BASE_URL` trong `layout.tsx` khi có domain thật
- [ ] Đổi mật khẩu admin sau khi deploy
- [ ] Thêm `JWT_SECRET` thật vào Vercel env vars
- [ ] Deploy DB lên cloud (SQLite/Turso hoặc MySQL cloud) khi lên Vercel
- [ ] (Optional) Vercel Analytics
- [ ] (Optional) Video tour embed

## 🔗 Notes chi tiết

- [[PROJECT-INFO]] — Thông tin dự án, liên hệ, nội dung
- [[TECH-STACK]] — Components, API routes, env vars, DB
- [[ASSET-MAP]] — Cấu trúc ảnh, tên file, quy tắc

---
*Project path: `/Volumes/MAC_OPTION/Build_Ladingpage` · Branch: main · Chưa push*
