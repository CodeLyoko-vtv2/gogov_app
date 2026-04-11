import { Stack } from 'expo-router';
import SuaTTCN6Screen from '../../src/screens/UserApp/PersonalInfo/SuaTTCN6Screen';

export default function SuaTTCN6() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaTTCN6Screen />
    </>
  );
}
