import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  BeVietnamPro_400Regular, 
  BeVietnamPro_500Medium, 
  BeVietnamPro_700Bold 
} from '@expo-google-fonts/be-vietnam-pro';

export default function RescueLayout() {
  const [loaded, error] = useFonts({
    'BeVietnam-Regular': BeVietnamPro_400Regular,
    'BeVietnam-Medium': BeVietnamPro_500Medium,
    'BeVietnam-Bold': BeVietnamPro_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Màn hình (tabs) sẽ chứa thanh Bottom Tab */}
      <Stack.Screen name="(tabs)" /> 
      
      {/* Các màn hình dưới đây sẽ CHÈN ĐÈ lên thanh Tab (Ẩn Tab) */}
      <Stack.Screen name="YeuCauVatTu" options={{ title: 'Yêu cầu vật tư' }} />
    </Stack>
  );
}