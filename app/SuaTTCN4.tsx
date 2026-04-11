import { Stack } from 'expo-router';
import SuaTTCN4Screen from '../src/screens/UserApp/PersonalInfo/SuaTTCN4Screen';

export default function SuaTTCN4() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SuaTTCN4Screen />
    </>
  );
}
