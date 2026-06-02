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
| Form → SQLite DB | ✅ | Lưu đồng thời vào DB admin |
| Upstash Redis (views) | ✅ | Đang đếm thật |
| Upstash Redis (likes) | ✅ | Đang đếm thật |
| Admin login | ✅ | /admin/login · jose JWT + httpOnly cookie |
| Admin dashboard | ✅ | Thống kê leads, 3 trạng thái |
| Admin leads | ✅ | Table, filter, đổi status, export CSV |
| Admin settings | ✅ | Chỉnh giá/hotline/countdown không cần deploy |
| Deploy auto Vercel | ✅ | Push main → auto deploy |

## 🔐 Admin

- URL: `/admin/login`
- Email: `admin@coastal.vn`
- Mật khẩu: `coastal2026` *(đổi sau khi deploy)*

## 📋 Todo còn lại

- [ ] Đổi `BASE_URL` trong `layout.tsx` khi có domain thật
- [ ] Điền hotline thật vào ContactForm (hiện: `1800 xxxx`)
- [ ] Đổi mật khẩu admin sau khi deploy lên Vercel
- [ ] Thêm `JWT_SECRET` vào Vercel env vars
- [ ] Deploy DB lên Vercel (SQLite → Turso hoặc PlanetScale)
- [ ] (Optional) Vercel Analytics
- [ ] (Optional) Video tour embed

## 🔗 Notes chi tiết

- [[PROJECT-INFO]] — Thông tin dự án, liên hệ, nội dung
- [[TECH-STACK]] — Components, API routes, env vars
- [[ASSET-MAP]] — Cấu trúc ảnh, tên file, quy tắc

---
*Project path: `/Volumes/MAC_OPTION/Build_Ladingpage` · Branch: main*
