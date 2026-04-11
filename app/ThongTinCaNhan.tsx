import { Stack } from 'expo-router';
import ThongTinCaNhanScreen from '../src/screens/UserApp/PersonalInfo/ThongTinCaNhanScreen';

export default function ThongTinCaNhan() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThongTinCaNhanScreen />
    </>
  );
}
