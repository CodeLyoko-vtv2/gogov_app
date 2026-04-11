// app/(user)/(tabs)/_layout.tsx
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 300,
        contentStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      {/* CÁC TRANG CHÍNH CHUYỂN KHÔNG ANIMATION */}
      <Stack.Screen name="HomeSOS" options={{ animation: "none" }} />
      <Stack.Screen name="CaiDat" options={{ animation: "none" }} />
      <Stack.Screen name="SOSVoice" options={{ animation: "none" }} />
      <Stack.Screen name="DanhBa1" options={{ animation: "none" }} />
      <Stack.Screen name="TinTucTheGioi" options={{ animation: "none" }} />

      {/* DANH BẠ & GỌI ĐIỆN */}
      <Stack.Screen name="DanhBa2" /> 
      <Stack.Screen name="DanhBa3" />
      <Stack.Screen name="DanhBa4" />
      <Stack.Screen name="AICuuHo" />

      {/* QUYÊN GÓP */}
      <Stack.Screen name="UngHoTien" />
      <Stack.Screen name="UngHoGao" />
      <Stack.Screen name="UngHoVatPham" />
      <Stack.Screen name="DanhSachQuyenGop" />

      {/* CÁC TRANG KHÁC */}
      <Stack.Screen name="LichSuSOS" />
      <Stack.Screen name="HatNhan1" />
      <Stack.Screen
        name="ChonViTri2"
        options={{
          animation: "slide_from_bottom",
          presentation: "transparentModal",
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
      <Stack.Screen
        name="ChonAnh2"
        options={{
          animation: "slide_from_bottom",
          presentation: "transparentModal",
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
      <Stack.Screen name="SendingAlert" />
      <Stack.Screen name="XacNhanHuy" options={{ contentStyle: { backgroundColor: "#111111" } }} />
      <Stack.Screen name="DaGuiTinHieu" options={{ contentStyle: { backgroundColor: "#111111" } }} />
      <Stack.Screen name="DaGuiTinHieu3" />
      <Stack.Screen name="TroGiupPhanHoi1" />
      <Stack.Screen name="TroGiupPhanHoi2" />
      <Stack.Screen name="TroGiupPhanHoi4" />
      <Stack.Screen name="TroGiupPhanHoi5" />
      <Stack.Screen name="VeUngDung1" />
      <Stack.Screen name="VeUngDung2" />
    </Stack>
  );
}