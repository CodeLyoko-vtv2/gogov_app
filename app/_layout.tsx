// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          // MẶC ĐỊNH: Tất cả sẽ lướt từ phải sang (như LichSuSOS, các trang con...)
          animation: 'slide_from_right', 
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        {/* DANH SÁCH CÁC TRANG KHÔNG LƯỚT (CHUYỂN 0 GIÂY) */}
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="HomeSOS" options={{ animation: 'none' }} />
        <Stack.Screen name="Network" options={{ animation: 'none' }} />
        <Stack.Screen name="Call" options={{ animation: 'none' }} />
        <Stack.Screen name="CaiDat" options={{ animation: 'none' }} />
        <Stack.Screen name="SOSVoice" options={{ animation: 'none' }} />

        {/* CÁC TRANG CÒN LẠI (LichSuSOS, TroGiup...) SẼ TỰ ĐỘNG LƯỚT VÌ THEO MẶC ĐỊNH Ở TRÊN */}
      </Stack>
    </SafeAreaProvider>
  );
}