import { Resend } from 'resend'

// Lazy init — tránh crash lúc build khi RESEND_API_KEY chưa có
function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 'placeholder')
}

interface LeadNotificationData {
  brokerName: string
  brokerEmail: string
  projectName: string
  leadName: string
  leadPhone: string
  leadEmail?: string | null
  leadMessage?: string | null
  source: string
  submittedAt: string
}

export async function sendLeadNotification(data: LeadNotificationData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY chưa cấu hình — bỏ qua gửi email')
    return
  }

  const { brokerName, brokerEmail, projectName, leadName, leadPhone, leadEmail, leadMessage, source, submittedAt } = data

  await getResend().emails.send({
    // TODO: Sau khi verify domain trungdigitalmedia.com trên Resend → đổi lại
    // from: 'Hệ Thống Lead <noreply@trungdigitalmedia.com>',
    from: 'Hệ Thống Lead <onboarding@resend.dev>',
    to: brokerEmail,
    subject: `🔥 Khách hàng mới: ${leadName} — ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">

        <div style="background: #1a1a2e; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 20px;">🔥 Khách Hàng Mới Đăng Ký!</h1>
          <p style="color: #aaa; margin: 5px 0 0;">${projectName}</p>
        </div>

        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">

          <p style="margin: 0 0 16px; color: #333;">Xin chào <strong>${brokerName}</strong>,</p>
          <p style="margin: 0 0 20px; color: #555;">Có khách hàng vừa đăng ký tư vấn. Liên hệ <strong>ngay</strong> để chốt nóng!</p>

          <div style="background: #fff; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 16px; color: #e74c3c; font-size: 16px;">📋 Thông Tin Khách Hàng</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 120px;">Họ tên:</td>
                <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 16px;">${leadName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Số điện thoại:</td>
                <td style="padding: 8px 0; color: #e74c3c; font-weight: bold; font-size: 18px;">
                  <a href="tel:${leadPhone}" style="color: #e74c3c; text-decoration: none;">${leadPhone}</a>
                </td>
              </tr>
              ${leadEmail ? `
              <tr>
                <td style="padding: 8px 0; color: #888;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${leadEmail}</td>
              </tr>` : ''}
              ${leadMessage ? `
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Tin nhắn:</td>
                <td style="padding: 8px 0; color: #333; font-style: italic;">"${leadMessage}"</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #888;">Nguồn:</td>
                <td style="padding: 8px 0; color: #333;">${source}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Thời gian:</td>
                <td style="padding: 8px 0; color: #333;">${submittedAt}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center;">
            <a href="tel:${leadPhone}"
               style="display: inline-block; background: #e74c3c; color: #fff; padding: 14px 32px;
                      border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
              📞 Gọi Ngay ${leadPhone}
            </a>
          </div>

          <p style="margin: 20px 0 0; color: #aaa; font-size: 12px; text-align: center;">
            Email tự động từ hệ thống Trung Digital Media
          </p>
        </div>
      </div>
    `,
  })
}
