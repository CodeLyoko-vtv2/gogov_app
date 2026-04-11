import { Stack } from 'expo-router';
import SuaTTCN3Screen from '../../src/screens/UserApp/PersonalInfo/SuaTTCN3Screen';

export default function SuaTTCN3() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaTTCN3Screen />
    </>
  );
}
