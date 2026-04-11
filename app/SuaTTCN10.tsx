import { Stack } from 'expo-router';
import SuaTTCN10Screen from '../src/screens/UserApp/PersonalInfo/SuaTTCN10Screen';

export default function SuaTTCN10() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaTTCN10Screen />
    </>
  );
}
