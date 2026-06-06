# 🚀 Quy Trình Deploy Next.js lên CyberPanel (VPS)

> Tài liệu này có 2 phần:
> - **Phần A**: Deploy `landing-template` lần đầu (chỉ làm **1 lần duy nhất**)
> - **Phần B**: Thêm môi giới mới (không cần code, **3 bước**)

---

## 📋 Yêu Cầu Chung

- VPS đã cài **CyberPanel** (OpenLiteSpeed)
- Domain đã trỏ về IP VPS qua **Cloudflare** (A record)
- MySQL có sẵn trên server (CyberPanel tích hợp sẵn)

---

# PHẦN A — Deploy Landing-Template Lần Đầu

> Chỉ thực hiện 1 lần. Sau đó tất cả môi giới dùng chung instance này.

---

## A1 — Cloudflare: Thêm A Record (cho domain đầu tiên)

| Field | Giá trị |
|-------|---------|
| Type | `A` |
| Name | `coastal` (hoặc `@` nếu root domain) |
| IPv4 | `139.180.138.113` |
| Proxy | **Bật (cam)** — Proxied |

---

## A2 — CyberPanel: Tạo Package

> Package = gói tài nguyên (cần tạo trước mới tạo được website)

1. **Packages** → **Create Package**
2. Package Name: `default`
3. Tất cả giới hạn để `0` (unlimited)
4. **Create Package**

---

## A3 — CyberPanel: Tạo Website

1. **Websites** → **Create Website**
2. Điền:
   - **Select Package:** `default`
   - **Domain Name:** `coastal.muadatquangngai.com`
   - **Email:** email admin
   - **Select PHP:** chọn bất kỳ (Next.js không dùng PHP)
3. **Create Website**

---

## A4 — CyberPanel: Tạo Database MySQL

1. **Databases** → **Create Database**
2. Điền:
   - **Select Website:** chọn website vừa tạo
   - **Database Name:** `coastal_admin`
   - **User Name:** `db`
   - **Password:** click **Generate** → **copy lại password**
3. **Create Database**

> ⚠️ Password KHÔNG dùng ký tự đặc biệt (`!`, `#`, `@`) → khó encode trong DATABASE_URL

---

## A5 — CyberPanel: Lấy SSH User

1. **Websites** → **List Websites** → **Manage** website
2. Tìm mục **SSH Access** → ghi lại SSH username (vd: `coast6950`)
3. Đặt password cho SSH user

---

## A6 — Unblock IP (nếu bị khóa)

Nếu SSH bị `Connection refused` sau khi thử sai password nhiều lần:

1. CyberPanel → **Security** → **CSF** → **CSF Native GUI**
2. **Temporary Allow/Deny** → chọn `allow`
3. Nhập IP của bạn (whatismyip.com), Port: `*`, Time: `3600` → Submit

---

## A7 — SSH: Cài NVM + Node.js

```bash
ssh coast6950@139.180.138.113

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"
nvm install 20
node -v && npm -v
```

> ⚠️ Mỗi lần SSH mới cần chạy lại `export NVM_DIR...` trước khi dùng npm/node

---

## A8 — SSH: Clone Repo và Cấu Hình .env

```bash
cd ~/public_html
git clone https://github.com/vietvo371/LadingPage_BDS_service.git .
nano .env
```

Nội dung `.env`:

```env
DATABASE_URL="mysql://coas_db:<password>@localhost:3306/coas_coastal_admin"
JWT_SECRET="your-strong-secret-key-production"
RESEND_API_KEY="re_xxx"
UPSTASH_REDIS_REST_URL="https://..."
NEXT_PUBLIC_GOOGLE_SHEETS_URL=""
```

> ⚠️ **Không có BROKER_ID** — Broker được nhận diện qua domain của HTTP request.

---

## A9 — SSH: Build và Chạy với PM2

```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh"

npm install
./node_modules/.bin/prisma migrate deploy    # ← Dùng local, KHÔNG dùng npx prisma
npm run build

npm install -g pm2
pm2 start npm --name "landing-template" -- start -- -p 3000
pm2 save

pm2 logs landing-template --lines 10
```

> ✅ Thành công khi logs hiện: `✓ Ready in xxxms`

---

## A10 — CyberPanel: Cấu Hình vHost (Reverse Proxy → port 3000)

1. **Websites** → **List Websites** → **Manage** → **vHost Conf**
2. Paste config:

```
extprocessor nodejs3000 {
  type                    proxy
  address                 127.0.0.1:3000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 nodejs3000
  addDefaultCharset       off
}
```

3. Save → Restart LiteSpeed:

```bash
/usr/local/lsws/bin/lswsctrl restart
```

---

## A11 — CyberPanel: Cấp SSL

1. **Websites** → **Manage** → **SSL** → **Issue SSL** (Let's Encrypt)

---

# PHẦN B — Thêm Môi Giới Mới (Không Cần Code)

> Kiến trúc mới: chỉ cần tạo record trong DB + trỏ domain + vHost proxy.
> Không cần clone, không cần npm install, không cần PM2 mới.

---

## B1 — Master Admin: Tạo Broker Record

1. Vào `admin.muadatquangngai.com` → Login Master
2. **Brokers** → **New Broker**
3. Điền: Tên, SĐT, **Domain** (chính xác, vd: `duan-vin.com`), Mẫu giao diện
4. Copy email/password → gửi cho môi giới

---

## B2 — Cloudflare: Trỏ Domain Mới

| Field | Giá trị |
|-------|---------|
| Type | `A` |
| Name | `@` hoặc subdomain |
| IPv4 | `139.180.138.113` |
| Proxy | **Bật (cam)** |

---

## B3 — CyberPanel: Add Website + Proxy

1. **Packages** → Chắc chắn đã có package `default`
2. **Websites** → **Create Website** → Nhập domain mới
3. **Manage** → **vHost Conf** → Paste config proxy → port **3000** (y chang A10)
4. **SSL** → **Issue SSL**

> ✅ Xong! Domain mới tự hiển thị nội dung của broker tương ứng.
> Hệ thống đọc header `Host` → tìm Broker trong DB → load đúng settings.

---

## 📝 Danh Sách Domains Đang Chạy

| Domain | Broker | PM2 Process | Port |
|--------|--------|-------------|------|
| coastal.muadatquangngai.com | coastal | landing-template | 3000 |
| suckhoetaman.com | suckhoetaman | landing-template | 3000 |
| admin.muadatquangngai.com | — (Master) | master-admin | 4000 |
| *domain-moi.com* | *broker mới* | landing-template | 3000 |

---

## ⚠️ Lưu Ý Quan Trọng

- **NVM không persistent**: Mỗi lần SSH mới phải chạy lại `export NVM_DIR...`
- **Tất cả domain trỏ về port 3000**: Chỉ 1 PM2 process cho tất cả môi giới
- **Không dùng `npx prisma`**: Tải v7 breaking → dùng `./node_modules/.bin/prisma`
- **Password DB**: Không dùng ký tự đặc biệt hoặc phải encode URL
- **Domain trong DB phải khớp chính xác** với domain thực tế (không có www, không có https://)
