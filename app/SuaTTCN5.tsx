import { Stack } from 'expo-router';
import SuaTTCN5Screen from '../src/screens/UserApp/PersonalInfo/SuaTTCN5Screen';

export default function SuaTTCN5() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaTTCN5Screen />
    </>
  );
}
