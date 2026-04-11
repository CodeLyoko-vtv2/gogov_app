import { Stack } from 'expo-router';
import SuaTTCN9Screen from '../src/screens/UserApp/PersonalInfo/SuaTTCN9Screen';

export default function SuaTTCN9() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaTTCN9Screen />
    </>
  );
}
