import { Stack } from 'expo-router';
import HoSoYTeCaNhan3Screen from '../../src/screens/UserApp/MedicalRecord/HoSoYTeCaNhan3Screen';

export default function HoSoYTeCaNhan3() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HoSoYTeCaNhan3Screen />
    </>
  );
}
