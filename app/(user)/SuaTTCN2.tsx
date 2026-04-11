import { Stack } from 'expo-router';
import SuaTTCN2Screen from '../../src/screens/UserApp/PersonalInfo/SuaTTCN2Screen';

export default function SuaTTCN2() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaTTCN2Screen />
    </>
  );
}
