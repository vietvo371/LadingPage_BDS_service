import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('coastal2026', 10)

  await prisma.user.upsert({
    where: { email: 'admin@coastal.vn' },
    update: {},
    create: {
      email: 'admin@coastal.vn',
      password: hash,
      name: 'Admin Coastal',
      role: 'ADMIN',
    },
  })

  const defaults = [
    { key: 'price_range', value: '4.8 Tỷ – 30 Tỷ' },
    { key: 'location', value: 'Xã Tư Nghĩa – Quảng Ngãi' },
    { key: 'hotline', value: '0365 285 863' },
    { key: 'zalo_link', value: 'https://zalo.me/0365285863' },
    { key: 'open_date', value: '2026-06-27' },
    { key: 'open_date_time', value: '2026-06-27T08:00:00' },
    { key: 'open_title', value: 'Sự Kiện Mở Bán — Giai Đoạn 1' },
    { key: 'total_units', value: '1111' },
    { key: 'area_ha', value: '93.9' },
    { key: 'total_investment', value: '7.100' },
    { key: 'density', value: '14.4' },
    { key: 'about_quote', value: 'Khởi nguồn từ khát vọng kiến tạo một biểu tượng sống mới, Coastal Quảng Ngãi mang đến đặc quyền sống tinh hoa – nơi thiên nhiên khoáng đạt giao hòa cùng nhịp giao thương sầm uất ngay trung tâm thành phố.' },
    { key: 'about_desc', value: 'Dưới bàn tay tâm huyết của Chủ đầu tư Haus Quảng Ngãi, dự án tự hào là khu đô thị sinh thái biển tiên phong sở hữu tọa độ vàng "Kề giang – Cận hải" vô cùng hiếm có. Tại đây, mỗi ngày trôi qua là một trải nghiệm sống chuẩn mực bên bờ sông Trà Khúc thơ mộng, quyện cùng hơi thở tươi mát của đại dương bao la.' },
    { key: 'agent_name', value: 'Nguyễn Quốc Trung' },
    { key: 'agent_team', value: 'Đội ngũ sàn PQR' },
    { key: 'agent_avatar', value: '/images/logo/avt_trung.jpg' },
    { key: 'agent_join_year', value: '2026' },
    { key: 'agent_bookings', value: '5' },
    { key: 'agent_address', value: '308 Hai Bà Trưng · Quảng Ngãi' },
    { key: 'property_info_html', value: `<div>
  <p><strong>1. Tọa Độ Vàng – Kề Giang Cận Hải</strong><br/>Coastal Quảng Ngãi sở hữu tọa độ hiếm có: kề giang cận hải, nằm ngay trung tâm Tp. Quảng Ngãi, chỉ cách biển 3km và tiếp giáp sông Trà Khúc thơ mộng.</p>
  <p><strong>2. Quy Mô Đồng Bộ – Hạ Tầng Chuẩn Mực</strong><br/>Tổng diện tích 93.9ha với hơn 1.111 sản phẩm, mật độ xây dựng chỉ 14.4%, phần còn lại dành trọn cho cây xanh, tiện ích và không gian sống.</p>
  <p><strong>3. Bảo Chứng Đầu Tư – Pháp Lý Vững Chắc</strong><br/>Giữa những biến động của thị trường, dự án mang đến an tâm tuyệt đối với sổ đỏ sở hữu lâu dài.</p>
  <p><strong>4. Chính Sách Bán Hàng Ưu Việt</strong><br/>Các chính sách thanh toán ưu đãi từ Chủ đầu tư mang đến những đặc quyền tối ưu.</p>
</div>` },
    { key: 'amenities_html', value: `<div>
  <p><strong>Sinh Hoạt Cộng Đồng</strong></p>
  <ul>
    <li>Điểm ngắm hoàng hôn</li>
    <li>Công viên rừng ngập mặn</li>
    <li>Khu vui chơi thám hiểm rừng</li>
    <li>Đường dạo ven biển – ven sông</li>
  </ul>
  <p><br></p>
  <p><strong>Thể Thao &amp; Giải Trí</strong></p>
  <ul>
    <li>Resort 5 sao</li>
    <li>Design Exhibition</li>
    <li>Trung tâm chăm sóc sức khoẻ</li>
    <li>Công viên thể thao ven sông</li>
  </ul>
  <p><br></p>
  <p><strong>Thương Mại Dịch Vụ</strong></p>
  <ul>
    <li>Quảng trường biển</li>
    <li>Quảng trường chợ nổi</li>
    <li>Phố mua sắm ẩm thực</li>
    <li>Trường liên cấp quốc tế</li>
  </ul>
</div>` },
    { key: 'gallery_data', value: JSON.stringify([
      {
        id: 'tong-the',
        label: 'Phối Cảnh Tổng Thể',
        photos: [
          { src: '/images/ngoai-that/phoi-canh-tong-the.jpg', caption: 'Phối cảnh tổng thể Coastal Quảng Ngãi' },
        ],
      },
      {
        id: 'nha-vuon',
        label: 'Nhà Vườn',
        photos: [
          { src: '/images/mau-nha/nha-vuon/nha-vuon-04.png', caption: 'Nhà Vườn — kiến trúc đặc trưng' },
          { src: '/images/mau-nha/nha-vuon/nha-vuon-05.png', caption: 'Nhà Vườn — không gian sống' },
          { src: '/images/mau-nha/nha-vuon/nha-vuon-06.png', caption: 'Nhà Vườn — vườn cây' },
          { src: '/images/mau-nha/nha-vuon/nha-vuon-07.png', caption: 'Nhà Vườn — góc nhìn tổng thể' },
        ],
      },
      {
        id: 'ven-song',
        label: 'Nhà Ven Sông',
        photos: [
          { src: '/images/mau-nha/nha-ven-song/nha-ven-song-02.png', caption: 'Nhà Ven Sông — kiến trúc tạo trải nghiệm' },
          { src: '/images/mau-nha/nha-ven-song/nha-ven-song-03.png', caption: 'Nhà Ven Sông — view sông' },
          { src: '/images/mau-nha/nha-ven-song/nha-ven-song-04.png', caption: 'Nhà Ven Sông — không gian' },
          { src: '/images/mau-nha/nha-ven-song/nha-ven-song-05.png', caption: 'Nhà Ven Sông — mặt tiền' },
          { src: '/images/mau-nha/nha-ven-song/nha-ven-song-06.png', caption: 'Nhà Ven Sông — ban đêm' },
        ],
      },
      {
        id: 'dai-lo',
        label: 'Nhà Đại Lộ',
        photos: [
          { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-02.png', caption: 'Nhà Đại Lộ — phố thương mại sầm uất' },
          { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-03.png', caption: 'Nhà Đại Lộ — mặt tiền' },
          { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-04.png', caption: 'Nhà Đại Lộ — kiến trúc' },
          { src: '/images/mau-nha/nha-dai-lo/nha-dai-lo-05.png', caption: 'Nhà Đại Lộ — góc phố' },
        ],
      },
      {
        id: 'quang-truong',
        label: 'Nhà Quảng Trường',
        photos: [
          { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-02.png', caption: 'Nhà Quảng Trường — phố thương mại' },
          { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-03.png', caption: 'Nhà Quảng Trường — góc phố' },
          { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-04.png', caption: 'Nhà Quảng Trường — mặt tiền' },
          { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-05.png', caption: 'Nhà Quảng Trường — kiến trúc' },
          { src: '/images/mau-nha/nha-quang-truong/nha-quang-truong-06.png', caption: 'Nhà Quảng Trường — ban đêm' },
        ],
      },
      {
        id: 'cong-vien',
        label: 'Nhà Công Viên',
        photos: [
          { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-03.png', caption: 'Nhà Công Viên — mặt tiền' },
          { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-02.png', caption: 'Nhà Công Viên — ngoại thất' },
          { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-04.png', caption: 'Nhà Công Viên — khu vườn' },
          { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-05.png', caption: 'Nhà Công Viên — không gian' },
          { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-06.png', caption: 'Nhà Công Viên — góc 2' },
          { src: '/images/mau-nha/nha-cong-vien/nha-cong-vien-07.png', caption: 'Nhà Công Viên — chi tiết' },
        ],
      },
      {
        id: 'biet-thu-song',
        label: 'Biệt Thự Song Lập',
        photos: [
          { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-02.png', caption: 'Biệt Thự Song Lập — ngoại thất' },
          { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-03.png', caption: 'Biệt Thự Song Lập — khu vườn' },
          { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-04.png', caption: 'Biệt Thự Song Lập — không gian' },
          { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-05.png', caption: 'Biệt Thự Song Lập — góc 2' },
          { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-06.png', caption: 'Biệt Thự Song Lập — ban đêm' },
          { src: '/images/mau-nha/biet-thu-bien-song-lap/biet-thu-bien-song-lap-07.png', caption: 'Biệt Thự Song Lập — toàn cảnh' },
        ],
      },
      {
        id: 'biet-thu-don',
        label: 'Biệt Thự Đơn Lập',
        photos: [
          { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-02.png', caption: 'Biệt Thự Biển Đơn Lập — ngoại thất' },
          { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-03.png', caption: 'Biệt Thự Đơn Lập — góc vườn' },
          { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-04.png', caption: 'Biệt Thự Đơn Lập — không gian' },
          { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-05.png', caption: 'Biệt Thự Đơn Lập — chi tiết' },
          { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-06.png', caption: 'Biệt Thự Đơn Lập — nội thất' },
          { src: '/images/mau-nha/biet-thu-bien-don-lap/biet-thu-bien-don-lap-07.png', caption: 'Biệt Thự Đơn Lập — toàn cảnh' },
        ],
      },
      {
        id: 'dinh-thu',
        label: 'Dinh Thự Trị Liệu',
        photos: [
          { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-03.png', caption: 'Hồ bơi Dinh Thự — view sông' },
          { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-02.png', caption: 'Dinh Thự Trị Liệu — ngoại thất' },
          { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-04.png', caption: 'Dinh Thự — không gian sống' },
          { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-05.png', caption: 'Dinh Thự — chi tiết kiến trúc' },
          { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-06.png', caption: 'Dinh Thự — góc nhìn 2' },
          { src: '/images/mau-nha/dinh-thu-tri-lieu/dinh-thu-tri-lieu-07.png', caption: 'Dinh Thự — cảnh quan' },
        ],
      },
    ]) },
  ]

  for (const s of defaults) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value }, // Always force update to the latest seed copy to refresh the database
      create: s,
    })
  }

  console.log('✅ Seed done — admin@coastal.vn / coastal2026')
}

main().catch(console.error).finally(() => prisma.$disconnect())
