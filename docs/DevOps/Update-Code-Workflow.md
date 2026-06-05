# 🔄 Quy Trình Update Code — Fix Local → Deploy Server

> Sau khi fix bug hoặc thêm tính năng ở local, làm theo các bước này để deploy lên server nhanh nhất.

---

## 🖥️ Trên Máy Local (Mac)

```bash
# 1. Commit và push code
git add .
git commit -m "fix: mô tả thay đổi"
git push origin main
```

---

## 🌐 Trên Server (SSH)

```bash
# 2. SSH vào server
ssh coast6950@139.180.138.113

# 3. Load NVM (BẮT BUỘC mỗi lần SSH mới)
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"

# 4. Vào thư mục project
cd ~/public_html/LadingPage_BDS_service

# 5. Pull code mới
git pull

# 6. Cài packages mới (nếu có thay đổi package.json)
npm install

# 7. Build lại
npm run build

# 8. Restart app
pm2 restart coastal

# 9. Kiểm tra
pm2 logs coastal --lines 10
```

---

## ⚡ Lệnh Gộp Nhanh (1 dòng)

```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && cd ~/public_html/LadingPage_BDS_service && git pull && npm install && npm run build && pm2 restart coastal
```

---

## 🌱 Seed Database — CHỈ KHI ĐƯỢC YÊU CẦU

> ⚠️ **KHÔNG chạy seed trong quy trình update bình thường!**
> Chỉ chạy khi:
> - Deploy lần đầu tiên (database còn trống)
> - Được yêu cầu rõ ràng: *"cần seed lại"*

```bash
npx tsx prisma/seed.ts
```

**Tại sao không chạy tự động?**
Khách đã thêm leads, sửa settings qua admin panel → seed sẽ **reset settings về default** dù đã fix `update: {}`, vẫn tiềm ẩn rủi ro.

---

## ⚠️ Lưu Ý Quan Trọng

- **Phải rebuild** sau mỗi lần `git pull` — không rebuild là app chạy code cũ
- **NVM phải load** trước khi dùng npm/node/pm2
- Nếu thêm migration mới → chạy thêm trước khi build:
  ```bash
  ./node_modules/.bin/prisma migrate deploy
  ```
- Nếu thêm seed data:
  ```bash
  npx tsx prisma/seed.ts
  ```
