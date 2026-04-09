Markdown
# 🚒 GoGo-V App - Ứng dụng Cứu hộ Khẩn cấp

Đây là kho lưu trữ mã nguồn giao diện (UI) cho đồ án ứng dụng GoGo-V. 
Dự án tập trung xây dựng luồng giao diện trên điện thoại thực tế cho 3 phân hệ người dùng chính, bỏ qua xử lý Backend.

## 👥 Phân hệ ứng dụng
1. **Citizen (Người dân):** Cảnh báo thiên tai, nhấn SOS, xem tin tức, bản đồ an toàn.
2. **Rescue Team (Đội cứu hộ):** Nhận nhiệm vụ, bản đồ di chuyển, cập nhật trạng thái.
3. **Coordination Center (Trung tâm điều phối):** Theo dõi bản đồ tổng, phân công lực lượng, xem thống kê.

## 🛠 Công nghệ sử dụng
- **Framework:** React Native (Expo)
- **Navigation:** **Expo Router** (File-based Routing) 
- **Map:** React Native Maps
- **UI:** Expo Linear Gradient

---

## 🚀 Hướng dẫn cài đặt cho thành viên nhóm

**Bước 1:** Kéo code về máy (Chỉ làm lần đầu)
```bash
git clone [https://github.com/CodeLyoko-vtv2/gogov_app.git](https://github.com/CodeLyoko-vtv2/gogov_app.git)
cd gogov_app
Bước 2: Cài đặt thư viện (BẮT BUỘC)

Bash
npm install
Bước 3: Chạy ứng dụng

Bash
npm start
(Sau đó dùng app Expo Go trên điện thoại quét mã QR, hoặc bấm phím a để chạy máy ảo Android).

⚠️ QUY TẮC LÀM VIỆC NHÓM (BẮT BUỘC ĐỌC)
TUYỆT ĐỐI KHÔNG CODE TRỰC TIẾP TRÊN NHÁNH main.

Nhận làm màn hình nào, phải tạo nhánh mới trước khi code.
Cú pháp: git checkout -b feature/ten-man-hinh (VD: feature/login).

Quy tắc đặt tên file: Đặt tên theo tên Frame trên Figma nhưng chuyển về dạng Không dấu, Viết hoa chữ cái đầu (PascalCase).
Ví dụ: Frame "Cài đặt" -> CaiDatScreen.js.

Cấu trúc Expo Router: - Code giao diện chính tại thư mục: src/screens/...

Khai báo đường dẫn tại thư mục: app/ (Chỉ cần tạo file và import màn hình từ src vào).

Cách chuyển trang: Sử dụng router từ expo-router.
Ví dụ: router.push('/cai-dat').

Code xong, push nhánh của mình lên Github và báo nhóm trưởng gộp code.

Ai cần cài thêm thư viện gì mới bằng lệnh npm install... thì phải nhắn lên group chat để mọi người biết và pull về.