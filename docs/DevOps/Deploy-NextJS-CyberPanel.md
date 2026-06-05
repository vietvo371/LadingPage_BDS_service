# 🚀 Quy Trình Deploy Next.js lên CyberPanel (VPS)

> Tài liệu này ghi lại đầy đủ các bước deploy một dự án Next.js (landing page BDS) lên VPS chạy CyberPanel + OpenLiteSpeed.

---

## 📋 Yêu Cầu

- VPS đã cài **CyberPanel** (OpenLiteSpeed)
- Domain đã trỏ về IP VPS qua **Cloudflare** (A record)
- Project Next.js đã có **Git repo trên GitHub**
- MySQL có sẵn trên server (CyberPanel tích hợp sẵn)

---

## BƯỚC 1 — Cloudflare: Thêm A Record

| Field | Giá trị |
|-------|---------|
| Type | `A` |
| Name | tên subdomain (vd: `coastal`) |
| IPv4 | IP VPS |
| Proxy | **Bật (cam)** — Proxied |

---

## BƯỚC 2 — CyberPanel: Tạo Package

> Package = gói tài nguyên cho website (cần tạo trước mới tạo được website)

1. **Packages** → **Create Package**
2. Package Name: `default`
3. Tất cả giới hạn để `0` (unlimited)
4. **Create Package**

---

## BƯỚC 3 — CyberPanel: Tạo Website

1. **Websites** → **Create Website**
2. Điền:
   - **Select Package:** `default`
   - **Domain Name:** `coastal.muadatquangngai.com`
   - **Email:** email admin
   - **Select PHP:** chọn bất kỳ (Next.js không dùng PHP)
3. **Create Website**

---

## BƯỚC 4 — CyberPanel: Tạo Database MySQL

1. **Databases** → **Create Database**
2. Điền:
   - **Select Website:** chọn website vừa tạo
   - **Database Name:** `coastal` → tự thêm prefix thành `coas_coastal`
   - **User Name:** `db` → tự thêm prefix thành `coas_db`
   - **Password:** click **Generate** → **copy lại password**
3. **Create Database**

> ⚠️ Ghi nhớ: Database name, username, password để dùng ở bước sau.

---

## BƯỚC 5 — CyberPanel: Lấy SSH User

1. **Websites** → **List Websites** → **Manage** website
2. Tìm mục **SSH Access**
3. Ghi lại **SSH username** (vd: `coast6950`)
4. Đặt password cho SSH user

---

## BƯỚC 6 — Unblock IP (nếu bị khóa)

Nếu SSH bị `Connection refused` sau khi thử sai password nhiều lần:

1. CyberPanel → **Security** → **CSF** → **CSF Native GUI**
2. Tìm mục **Temporary Allow/Deny**
3. Đổi dropdown → **allow**
4. Nhập IP của bạn (kiểm tra tại whatismyip.com)
5. Port: `*`, Time: `3600` seconds
6. Click **Temporary Allow/Deny**

---

## BƯỚC 7 — SSH: Cài NVM + Node.js

```bash
ssh <ssh_user>@<IP_VPS>
```

```bash
# Cài NVM (không cần root)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Cài Node.js 20
nvm install 20
node -v && npm -v
```

> ⚠️ Mỗi lần SSH mới cần chạy lại dòng `export NVM_DIR...` trước khi dùng npm/node

---

## BƯỚC 8 — SSH: Clone Repo và Cấu Hình .env

```bash
cd ~/public_html
git clone https://github.com/<username>/<repo>.git .
```

Tạo file `.env`:

```bash
nano .env
```

Nội dung:

```env
DATABASE_URL="mysql://<db_user>:<db_password>@localhost:3306/<db_name>"
JWT_SECRET="your-strong-secret-key-production"
```

Lưu: `Ctrl+X` → `Y` → `Enter`

---

## BƯỚC 9 — SSH: Build và Chạy với PM2

```bash
# Load NVM trước
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"

# Cài dependencies
npm install

# Migrate database (nếu có Prisma)
npx prisma migrate deploy

# Build Next.js
npm run build

# Cài PM2
npm install -g pm2

# Chạy app (dùng port chưa bị chiếm, vd: 3005)
pm2 start npm --name "ten-project" -- start -- -p 3005
pm2 save

# Kiểm tra logs
pm2 logs ten-project --lines 10
```

> ✅ Thành công khi logs hiện: `✓ Ready in xxxms`

### Chọn Port — Mỗi project một port riêng

| Project | Port |
|---------|------|
| Project 1 | 3000 |
| Project 2 | 3001 |
| Project 3 | 3005 |
| Project 4 | 3010 |

---

## BƯỚC 10 — CyberPanel: Cấu Hình vHost (Reverse Proxy)

1. **Websites** → **List Websites** → **Manage** website
2. Tìm **vHost Conf** → mở editor
3. Paste config sau (thay port tương ứng):

```
docRoot                   $VH_ROOT/public_html
vhDomain                  $VH_NAME
vhAliases                 www.$VH_NAME
adminEmails               your@email.com
enableGzip                1
enableIpGeo               1

index  {
  useServer               0
  indexFiles              index.php, index.html
}

errorlog $VH_ROOT/logs/$VH_NAME.error_log {
  useServer               0
  logLevel                WARN
  rollingSize             10M
}

accesslog $VH_ROOT/logs/$VH_NAME.access_log {
  useServer               0
  logFormat               "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\""
  logHeaders              5
  rollingSize             10M
  keepDays                10
  compressArchive         1
}

extprocessor nodejs3005 {
  type                    proxy
  address                 127.0.0.1:3005
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 nodejs3005
  addDefaultCharset       off
}

context /.well-known/acme-challenge {
  location                /usr/local/lsws/Example/html/.well-known/acme-challenge
  allowBrowse             1
  rewrite  {
    enable                0
  }
  addDefaultCharset       off
  phpIniOverride  {
  }
}

module cache {
  storagePath             /usr/local/lsws/cachedata/$VH_NAME
}

rewrite  {
  enable                  0
  autoLoadHtaccess        0
}

vhssl  {
  keyFile                 /etc/letsencrypt/live/<domain>/privkey.pem
  certFile                /etc/letsencrypt/live/<domain>/fullchain.pem
  certChain               1
  sslProtocol             24
  enableECDHE             1
  renegProtection         1
  sslSessionCache         1
  enableSpdy              15
  enableStapling          1
  ocspRespMaxAge          86400
}
```

> ⚠️ Thay `nodejs3005` và `3005` bằng port thực tế, thay `<domain>` bằng domain thật.

4. Save → Restart LiteSpeed:

```bash
/usr/local/lsws/bin/lswsctrl restart
```

---

## BƯỚC 11 — CyberPanel: Cấp SSL

1. **Websites** → **List Websites** → **Manage** website
2. **SSL** → **Issue SSL** (Let's Encrypt)
3. Chờ vài giây → SSL được cấp tự động

---

## 🔄 Quy Trình Update Code (Lần Sau)

```bash
ssh <ssh_user>@<IP_VPS>
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
cd ~/public_html
git pull
npm install
npm run build
pm2 restart ten-project
```

---

## 📝 Bảng Theo Dõi Các Project Đã Deploy

| Domain | SSH User | Port | DB Name | PM2 Name |
|--------|----------|------|---------|----------|
| coastal.muadatquangngai.com | coast6950 | 3005 | coas_coas_coastal | coastal |
| suckhoetaman.com | suckh2097 | 3001 | — | — |

---

## ⚠️ Lưu Ý Quan Trọng

- **NVM không persistent**: Mỗi lần SSH mới phải chạy lại `export NVM_DIR...` trước khi dùng npm/node
- **Port không được trùng**: Mỗi project một port riêng, kiểm tra bằng `ss -tlnp`
- **prisma/schema.prisma**: Đảm bảo file này có trong repo trước khi chạy `prisma migrate deploy`
- **Cloudflare Proxy**: Bật cam (Proxied) để SSL qua Cloudflare
- **CSF Firewall**: Nếu bị block IP → vào CSF Native GUI → Temporary Allow
