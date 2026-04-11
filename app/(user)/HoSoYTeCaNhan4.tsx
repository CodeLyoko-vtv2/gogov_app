import { Stack } from 'expo-router';
import HoSoYTeCaNhan4Screen from '../../src/screens/UserApp/MedicalRecord/HoSoYTeCaNhan4Screen';

export default function HoSoYTeCaNhan4() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HoSoYTeCaNhan4Screen />
    </>
  );
}
