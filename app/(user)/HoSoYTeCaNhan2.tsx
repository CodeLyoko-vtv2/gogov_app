import { Stack } from 'expo-router';
import HoSoYTeCaNhan2Screen from '../../src/screens/UserApp/MedicalRecord/HoSoYTeCaNhan2Screen';

export default function HoSoYTeCaNhan2() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HoSoYTeCaNhan2Screen />
    </>
  );
}
