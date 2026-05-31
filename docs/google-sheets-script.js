/**
 * Google Apps Script - Xử lý Webhook từ Next.js
 * 
 * Hướng dẫn cài đặt:
 * 1. Tạo 1 file Google Sheets mới (ví dụ: "Coastal Leads").
 * 2. Đổi tên Sheet đầu tiên thành "Leads" (hoặc giữ nguyên "Sheet1" nhưng sửa code bên dưới).
 * 3. Thêm các tiêu đề cột ở dòng 1: Timestamp, Source, Name, Phone, Email, Message/Interest, Date, Type.
 * 4. Trên menu Google Sheets, chọn Tiện ích mở rộng (Extensions) -> Apps Script.
 * 5. Xóa hết code cũ và dán toàn bộ đoạn code này vào.
 * 6. Nhấn Lưu (Ctrl + S / Cmd + S).
 * 7. Nhấn "Triển khai" (Deploy) -> "Bản triển khai mới" (New deployment).
 * 8. Chọn loại "Ứng dụng web" (Web app).
 * 9. Cấu hình:
 *    - Mô tả: Tùy ý.
 *    - Thực thi với tư cách: "Tôi" (Me).
 *    - Ai có quyền truy cập: "Bất kỳ ai" (Anyone).
 * 10. Nhấn "Triển khai" (Deploy) và cấp quyền truy cập theo yêu cầu.
 * 11. Copy URL Web app (ví dụ: https://script.google.com/macros/s/XXX/exec).
 * 12. Dán URL này vào biến NEXT_PUBLIC_GOOGLE_SHEETS_URL trong file .env.local của dự án.
 */

function doPost(e) {
  try {
    // Phân tích dữ liệu JSON gửi đến
    var data = JSON.parse(e.postData.contents);
    
    // Mở Sheet đang làm việc (Mặc định lấy Sheet đầu tiên hoặc theo tên)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    if (!sheet) sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // Lấy timestamp hiện tại
    var timestamp = new Date();
    
    // Dữ liệu từ form
    var source = data.source || '';
    var name = data.name || '';
    var phone = data.phone || '';
    var email = data.email || '';
    var message = data.message || data.interest || data.budget || ''; // Form liên hệ có interest/budget, form tin nhắn có message
    if (data.budget) message += ' - Budget: ' + data.budget;
    var date = data.date || '';
    var type = data.type || '';
    
    // Nối dữ liệu thành 1 mảng để thêm vào dòng mới
    var rowData = [timestamp, source, name, phone, email, message, date, type];
    
    // Thêm dòng mới vào Sheet
    sheet.appendRow(rowData);
    
    // Trả về JSON xác nhận thành công
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Trả về JSON báo lỗi
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
