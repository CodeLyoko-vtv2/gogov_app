import { useRouter } from 'expo-router';

// ✅ ĐƯA BIẾN NÀY RA NGOÀI HOOK: Nó trở thành biến dùng chung cho toàn App
let globalTimerId = null; 

export const useEmergencySystem = () => {
  const router = useRouter();

  const activateEmergencyClock = () => {
    // 1. Xóa timer cũ (Lúc này nó sẽ xóa đúng cái đang chạy dù sếp ở bất kỳ đâu)
    if (globalTimerId) {
      clearTimeout(globalTimerId);
      console.log("[Hệ thống] Đã hủy báo động cũ đang chạy ngầm.");
    }

    const randomTime = Math.floor(Math.random() * 60000) + 1000;
    console.log(`[Hệ thống] Công tắc ON! Báo động sau: ${randomTime / 1000}s`);

    // 2. Gán ID vào biến toàn cục
    globalTimerId = setTimeout(() => {
      console.log("[Hệ thống] ĐÃ ĐẾN GIỜ TÁC CHIẾN!");
      globalTimerId = null; // Reset sau khi chạy xong
      router.push('/BaoDongNhiemVu');
    }, randomTime);
  };

  const deactivateEmergencyClock = () => {
    if (globalTimerId) {
      clearTimeout(globalTimerId);
      globalTimerId = null;
      console.log("[Hệ thống] Đã ngắt kết nối báo động toàn cục.");
    }
  };

  return { activateEmergencyClock, deactivateEmergencyClock };
};