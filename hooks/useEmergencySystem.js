import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export const useEmergencySystem = () => {
  const router = useRouter();
  const timerRef = useRef(null);

  // Hàm "Bật công tắc" - Kích hoạt đếm ngược ngẫu nhiên
  const activateEmergencyClock = () => {
    // Xóa timer cũ nếu đang có cái nào chạy ngầm
    if (timerRef.current) clearTimeout(timerRef.current);

    const randomTime = Math.floor(Math.random() * 50000) + 1000; // 1-30 giây
    console.log(`[Hệ thống] Công tắc đã bật! Báo động sau: ${randomTime / 1000}s`);

    timerRef.current = setTimeout(() => {
      console.log("[Hệ thống] ĐÃ ĐẾN GIỜ TÁC CHIẾN!");
      router.push('/BaoDongNhiemVu'); // Hoặc path sếp đặt
    }, randomTime);
  };

  // Hàm "Tắt công tắc" - Dùng khi cần dừng báo động khẩn cấp
  const deactivateEmergencyClock = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      console.log("[Hệ thống] Đã ngắt kết nối báo động.");
    }
  };

  return { activateEmergencyClock, deactivateEmergencyClock };
};