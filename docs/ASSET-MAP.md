---
tags: [coastal, assets, images]
updated: 2026-06-02
---

# Asset Map — Ảnh & Media

## Cấu trúc thư mục

```
public/images/
├── logo/
│   ├── logo-coastal-clean.png   ← Logo chính (đã crop whitespace)
│   ├── avt_trung.jpg            ← Avatar Nguyễn Quốc Trung
│   ├── qr-zalo.png              ← QR Zalo 0365285863
│   └── zalo.jpg                 ← Logo Zalo
├── logo-doi-tac/                ← SWECO, SHMS, GioForma, DJC, 100architects
├── ngoai-that/
│   └── phoi-canh-tong-the.jpg  ← Ảnh hero chính (aerial view)
└── mau-nha/                     ← 8 loại nhà × 6-8 ảnh render
    ├── dinh-thu-tri-lieu/
    ├── biet-thu-bien-don-lap/
    ├── biet-thu-bien-song-lap/
    ├── nha-cong-vien/
    ├── nha-quang-truong/
    ├── nha-dai-lo/
    ├── nha-ven-song/
    └── nha-vuon/                ← Bắt đầu từ -03 (không có 01, 02)
```

## Quy tắc đặt tên

> [!important] Quan trọng
> - `*-01.png` = spec sheet / mặt bằng → **KHÔNG dùng trong gallery**
> - `*-02.png` trở đi = render 3D đẹp → **Dùng trong gallery**
> - `nha-vuon` bắt đầu từ `-03` (không có 01, 02)

## Gallery categories (GalleryModal.tsx)

Thứ tự tabs hiện tại trong GalleryModal:
1. Tất cả
2. Biệt thự biển
3. Nhà vườn / Nhà phố
4. Tiện ích
5. Phối cảnh

---
*Xem [[TECH-STACK]] để biết component dùng ảnh này*
