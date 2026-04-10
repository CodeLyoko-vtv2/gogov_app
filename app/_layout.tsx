// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 300,
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
        {/* Các trang chính chuyển không animation */}
        <Stack.Screen name="index" options={{ animation: "none" }} />
        <Stack.Screen name="HomeSOS" options={{ animation: "none" }} />
        <Stack.Screen name="CaiDat" options={{ animation: "none" }} />
        <Stack.Screen name="SOSVoice" options={{ animation: "none" }} />

        {/* Các trang còn lại dùng animation mặc định */}
        <Stack.Screen name="LichSuSOS" />
        <Stack.Screen name="SendingAlert" />
        <Stack.Screen name="XacNhanHuy" />
        <Stack.Screen name="DaGuiTinHieu" />
        <Stack.Screen name="DaGuiTinHieu3" />
        <Stack.Screen name="TroGiupPhanHoi1" />
        <Stack.Screen name="TroGiupPhanHoi2" />
        <Stack.Screen name="TroGiupPhanHoi4" />
        <Stack.Screen name="TroGiupPhanHoi5" />
        <Stack.Screen name="VeUngDung1" />
        <Stack.Screen name="VeUngDung2" />
      </Stack>
    </SafeAreaProvider>
  );
}
