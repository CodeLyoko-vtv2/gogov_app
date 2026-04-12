import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

export default function RescueLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Màn hình (tabs) sẽ chứa thanh Bottom Tab */}
      <Stack.Screen name="(tabs)" /> 
      
      {/* Các màn hình dưới đây sẽ CHÈN ĐÈ lên thanh Tab (Ẩn Tab) */}
      <Stack.Screen name="YeuCauVatTu" options={{ title: 'Yêu cầu vật tư' }} />
    </Stack>
  );
}