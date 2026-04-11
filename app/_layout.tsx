import { Stack, useRouter, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FloatingAIButton from "../src/components/FloatingAIButton";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Kiểm tra xem có đang ở màn hình AI cứu hộ hay không (Bao gồm cả khi nằm trong folder user)
  const isAIChatScreen = pathname === "/AICuuHo" || pathname === "/(user)/AICuuHo";

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="dark" />

        {/* TRẠM ĐIỀU HƯỚNG GỐC */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ animation: "fade" }} />
          
          {/* 2 Ngã rẽ khổng lồ: User và Rescue */}
          <Stack.Screen name="(user)" options={{ animation: "fade" }} />
          <Stack.Screen name="(rescue)" options={{ animation: "fade" }} />
        </Stack>

        {/* NÚT AI NỔI GIỮ NGUYÊN */}
        <View 
          style={[
            StyleSheet.absoluteFill, 
            { opacity: isAIChatScreen ? 0 : 1 }
          ]}
          pointerEvents={isAIChatScreen ? 'none' : 'box-none'}
        >
          <FloatingAIButton
            onPress={() => router.push("/AICuuHo")}
            isListening={false}
            hasNotification={false}
          />
        </View>

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});