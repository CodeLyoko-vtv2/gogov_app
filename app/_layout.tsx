// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* StatusBar: Giúp các icon pin, sóng, giờ trên điện thoại 
        hiển thị đẹp trên nền trắng của app 
      */}
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          // 1. Ẩn header mặc định của hệ thống để dùng Header custom chuẩn Figma
          headerShown: false,

          // 2. Cấu hình hiệu ứng trượt slide từ phải sang trái
          animation: 'slide_from_right',

          // 3. Thời gian thực hiện hiệu ứng (300ms là tốc độ chuẩn, mượt mà)
          animationDuration: 300,

          // 4. Giữ nền trắng cho toàn bộ các màn hình trong lúc chuyển cảnh
          // Việc này giúp tránh hiện tượng lộ nền đen/xám khi đang trượt
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        {/* Định nghĩa các màn hình (Routes). 
          Tên name phải trùng với tên file trong thư mục app/
        */}
        
        {/* Màn hình chính (Cài đặt) */}
        <Stack.Screen 
          name="index" 
          options={{
            // Bạn có thể tùy chỉnh riêng cho từng màn hình ở đây nếu muốn
          }} 
        />

        {/* Màn hình Lịch sử SOS */}
        <Stack.Screen 
          name="LichSuSOS" 
        />

      </Stack>
    </SafeAreaProvider>
  );
}