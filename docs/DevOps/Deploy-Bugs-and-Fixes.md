# 🐛 Bug Log — Deploy Next.js lên CyberPanel

> Ghi lại các lỗi gặp phải và cách fix khi deploy Next.js lên VPS CyberPanel + OpenLiteSpeed.

---

## BUG 1 — SSH bị Connection Refused sau khi thử root sai password

**Triệu chứng:**
```
ssh root@139.180.138.113
ssh: connect to host ... port 22: Connection refused
```

**Nguyên nhân:** CSF Firewall tự động block IP sau nhiều lần nhập sai password SSH.

**Fix:**
1. Vào CyberPanel → **Security** → **CSF** → **CSF Native GUI**
2. Tìm **Temporary Allow/Deny**
3. Đổi dropdown → `allow`
4. Nhập IP của bạn (whatismyip.com)
5. Port: `*`, Time: `3600` seconds → Submit

---

## BUG 2 — npm/node/npx not found sau khi SSH

**Triệu chứng:**
```
Command 'npm' not found, but can be installed with: apt install npm
```

**Nguyên nhân:** User SSH (vd: `coast6950`) không có Node.js trong PATH. NVM cài theo từng user, không phải global.

**Fix:** Load NVM trước mỗi lần SSH mới:
```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
```

**Cài NVM lần đầu (không cần root):**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
nvm install 20
```

> ⚠️ Lưu ý: NVM không persistent — phải load lại mỗi lần SSH mới

---

## BUG 3 — Port đã bị chiếm (EADDRINUSE)

**Triệu chứng:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Nguyên nhân:** Port 3000 (hoặc 3001) đã có project khác dùng trên cùng server.

**Fix:** Dùng port khác khi start PM2:
```bash
pm2 start npm --name "ten-project" -- start -- -p 3005
```

**Kiểm tra port đang dùng:**
```bash
ss -tlnp
```

**Quy tắc chọn port:** Mỗi project một port riêng, tăng dần: 3000, 3001, 3005, 3010...

---

## BUG 4 — Prisma migrate dùng sai version (v7 thay vì v6)

**Triệu chứng:**
```
Error: The datasource property `url` is no longer supported in schema files.
Prisma CLI Version : 7.8.0
```

**Nguyên nhân:** `npx prisma` tải version mới nhất (v7) trong khi project dùng v6. Prisma v7 có breaking change — không còn hỗ trợ `url = env("DATABASE_URL")` trong schema.prisma.

**Fix:** Dùng prisma từ node_modules local thay vì npx:
```bash
./node_modules/.bin/prisma migrate deploy
```

---

## BUG 5 — Prisma: Invalid port number trong DATABASE_URL

**Triệu chứng:**
```
Error: P1013: The provided database string is invalid. invalid port number in database URL.
```

**Nguyên nhân:** Password database chứa ký tự đặc biệt (`!`, `#`, `@`) không được encode trong URL.

**Fix:** Encode các ký tự đặc biệt trong password:

| Ký tự | Encode |
|-------|--------|
| `!`   | `%21`  |
| `#`   | `%23`  |
| `@`   | `%40`  |
| `$`   | `%24`  |
| `&`   | `%26`  |
| `+`   | `%2B`  |
| ` `   | `%20`  |

**Ví dụ:**
```env
# SAI
DATABASE_URL="mysql://user:Pass!#@word@@localhost:3306/db"

# ĐÚNG
DATABASE_URL="mysql://user:Pass%21%23%40word%40@localhost:3306/db"
```

> 💡 Tip: Khi tạo password database nên tránh dùng các ký tự đặc biệt, hoặc dùng password toàn chữ + số cho đơn giản.

---

## BUG 6 — Prisma schema not found khi chạy migrate

**Triệu chứng:**
```
Error: Could not find Prisma Schema that is required for this command.
Checked following paths:
schema.prisma: file not found
prisma/schema.prisma: file not found
```

**Nguyên nhân:** Chạy lệnh prisma không đúng thư mục, hoặc file `prisma/schema.prisma` chưa có trong git repo.

**Fix:**
1. Đảm bảo đang đứng trong thư mục root của project
2. Kiểm tra file tồn tại: `ls prisma/schema.prisma`
3. Nếu thiếu → push từ local lên rồi `git pull` lại

---

## BUG 7 — npm install chỉ cài 158 packages (thiếu devDependencies)

**Triệu chứng:** Sau `npm install` chỉ có 158 packages thay vì ~595.

**Nguyên nhân:** Lần đầu chỉ có `package.json` cơ bản, chưa có đủ source code.

**Fix:** Sau khi `git pull` đầy đủ code → chạy lại `npm install` để cài đủ packages.

---

## BUG 8 — CyberPanel: Lỗi "package required" khi tạo website

**Triệu chứng:** Báo lỗi `'package'` khi Create Website.

**Nguyên nhân:** Chưa tạo Package trước.

**Fix:**
1. **Packages** → **Create Package**
2. Name: `default`, tất cả limit để `0`
3. Quay lại tạo website, chọn package `default`

---

## 📋 Checklist Trước Khi Deploy

- [ ] Đã tạo Package trong CyberPanel
- [ ] Đã tạo Website với domain đúng
- [ ] Đã tạo Database và copy password
- [ ] Password database **không có ký tự đặc biệt** (hoặc đã encode)
- [ ] File `.env` đã điền đúng `DATABASE_URL` và `JWT_SECRET`
- [ ] NVM đã load: `export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"`
- [ ] Port chưa bị chiếm bởi project khác
- [ ] `./node_modules/.bin/prisma migrate deploy` thành công
- [ ] `pm2 logs` hiện `✓ Ready` không có error
- [ ] vHost Conf đã cấu hình đúng port
- [ ] SSL đã cấp qua Let's Encrypt

---

## 🔧 Lệnh Debug Hữu Ích

```bash
# Xem logs PM2
pm2 logs ten-project --lines 20

# Xem port đang dùng
ss -tlnp

# Kiểm tra app đang chạy
pm2 list

# Restart app
pm2 restart ten-project

# Kiểm tra .env
cat .env

# Kiểm tra kết nối database
./node_modules/.bin/prisma db pull
```
