import { Stack } from 'expo-router';
import HoSoYTeCaNhan1Screen from '../../src/screens/UserApp/MedicalRecord/HoSoYTeCaNhan1Screen';

export default function HoSoYTeCaNhan1() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HoSoYTeCaNhan1Screen />
    </>
  );
}
