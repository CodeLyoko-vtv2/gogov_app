import { Stack } from 'expo-router';
import SuaThongTinCaNhanScreen from '../../src/screens/UserApp/PersonalInfo/SuaTTCN1Screen';

export default function SuaThongTinCaNhan() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaThongTinCaNhanScreen />
    </>
  );
}
