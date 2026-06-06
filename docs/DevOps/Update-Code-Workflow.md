# 🔄 Quy Trình Update Code — Fix Local → Deploy Server

> **Lợi thế kiến trúc mới:** 1 lần deploy = TẤT CẢ domain môi giới nhận tính năng mới ngay lập tức.

---

## 🖥️ Trên Máy Local (Mac)

```bash
# 1. Làm việc trên branch develop
git checkout develop

# 2. Sửa code, test local
npm run dev   # http://localhost:3000

# 3. Commit và push
git add <files>
git commit -m "feat: mô tả thay đổi"

# 4. Merge lên main để deploy
git checkout main
git merge develop
git push origin main
```

---

## 🌐 Trên Server (SSH)

```bash
# SSH vào server (chỉ cần 1 user, không cần vào từng site)
ssh coast6950@139.180.138.113

# Load NVM (BẮT BUỘC mỗi lần SSH mới)
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"

# Vào thư mục project
cd ~/public_html/LadingPage_BDS_service

# Pull code mới
git pull

# Cài packages mới (nếu có thay đổi package.json)
npm install

# Build lại
npm run build

# Restart — TẤT CẢ domain tự nhận code mới
pm2 restart landing-template

# Kiểm tra
pm2 logs landing-template --lines 10
```

> ✅ Sau bước này: coastal.muadatquangngai.com, suckhoetaman.com và MỌI domain môi giới
> đều chạy code mới — không cần làm gì thêm.

---

## ⚡ Lệnh Gộp Nhanh (1 dòng)

```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && cd ~/public_html/LadingPage_BDS_service && git pull && npm install && npm run build && pm2 restart landing-template
```

---

## 🗃️ Nếu Có Migration Database Mới

```bash
# Chạy TRƯỚC khi build
./node_modules/.bin/prisma migrate deploy

# Sau đó build và restart như bình thường
npm run build && pm2 restart landing-template
```

> ⚠️ KHÔNG dùng `npx prisma` — sẽ tải Prisma v7 và gây breaking error.
> Luôn dùng `./node_modules/.bin/prisma`.

---

## 🌱 Seed Database — CHỈ KHI ĐƯỢC YÊU CẦU

> ⚠️ **KHÔNG chạy seed trong quy trình update bình thường!**
> Chỉ chạy khi deploy lần đầu tiên (database còn trống).

```bash
npx tsx prisma/seed.ts
```

---

## ⚠️ Lưu Ý Quan Trọng

- **Phải rebuild** sau mỗi lần `git pull` — không rebuild là app chạy code cũ
- **NVM phải load** trước khi dùng npm/node/pm2
- **PM2 name là `landing-template`** (không phải `coastal` như trước)
- **1 restart duy nhất** cập nhật tất cả domain — không cần restart riêng cho từng site
