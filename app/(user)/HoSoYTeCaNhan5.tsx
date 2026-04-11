import { Stack } from 'expo-router';
import HoSoYTeCaNhan5Screen from '../../src/screens/UserApp/MedicalRecord/HoSoYTeCaNhan5Screen';

export default function HoSoYTeCaNhan5() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HoSoYTeCaNhan5Screen />
    </>
  );
}
