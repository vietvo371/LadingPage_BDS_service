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
| Form → Google Sheets | ✅ | Data vào sheet thật, có timestamp |
| Upstash Redis (views) | ✅ | 17+ lượt xem thật |
| Upstash Redis (likes) | ✅ | Đang đếm thật |
| Deploy auto Vercel | ✅ | Push main → auto deploy |

## 📋 Todo còn lại

- [ ] Đổi `BASE_URL` trong `layout.tsx` khi có domain thật (hiện: coastal-quangngai.vn)
- [ ] Điền hotline thật vào ContactForm (hiện: `1800 xxxx`)
- [ ] Test form submit từ website thật (không phải curl)
- [ ] (Optional) Vercel Analytics
- [ ] (Optional) Video tour embed

## 🔗 Notes chi tiết

- [[PROJECT-INFO]] — Thông tin dự án, liên hệ, nội dung
- [[TECH-STACK]] — Components, API routes, env vars
- [[ASSET-MAP]] — Cấu trúc ảnh, tên file, quy tắc

---
*Project path: `/Volumes/MAC_OPTION/Build_Ladingpage` · Branch: main*
