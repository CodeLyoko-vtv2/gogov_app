import { Stack, useRouter, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FloatingAIButton from "../src/components/FloatingAIButton";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Kiểm tra xem có đang ở màn hình AI cứu hộ hay không
  const isAIChatScreen = pathname === "/AICuuHo";

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="dark" />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            animationDuration: 300,
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        >
          {/* CÁC TRANG CHÍNH CHUYỂN KHÔNG ANIMATION */}
          <Stack.Screen name="index" options={{ animation: "none" }} />
          <Stack.Screen name="HomeSOS" options={{ animation: "none" }} />
          <Stack.Screen name="CaiDat" options={{ animation: "none" }} />
          <Stack.Screen name="SOSVoice" options={{ animation: "none" }} />
          <Stack.Screen name="DanhBa1" options={{ animation: "none" }} />
          <Stack.Screen name="TinTucTheGioi" options={{ animation: "none" }} />

          {/* DANH BẠ & GỌI ĐIỆN */}
          <Stack.Screen name="DanhBa2" /> 
          <Stack.Screen name="DanhBa3" />
          <Stack.Screen name="DanhBa4" />
          <Stack.Screen name="AICuuHo" />

          {/* QUYÊN GÓP */}
          <Stack.Screen name="UngHoTien" />
          <Stack.Screen name="UngHoGao" />
          <Stack.Screen name="UngHoVatPham" />
          <Stack.Screen name="DanhSachQuyenGop" />

          {/* CÁC TRANG KHÁC */}
          <Stack.Screen name="LichSuSOS" />
          <Stack.Screen name="HatNhan1" />
          <Stack.Screen
            name="ChonViTri2"
            options={{
              animation: "slide_from_bottom",
              presentation: "transparentModal",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
          <Stack.Screen
            name="ChonAnh2"
            options={{
              animation: "slide_from_bottom",
              presentation: "transparentModal",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
          <Stack.Screen name="SendingAlert" />
          <Stack.Screen name="XacNhanHuy" options={{ contentStyle: { backgroundColor: "#111111" } }} />
          <Stack.Screen name="DaGuiTinHieu" options={{ contentStyle: { backgroundColor: "#111111" } }} />
          <Stack.Screen name="DaGuiTinHieu3" />
          <Stack.Screen name="TroGiupPhanHoi1" />
          <Stack.Screen name="TroGiupPhanHoi2" />
          <Stack.Screen name="TroGiupPhanHoi4" />
          <Stack.Screen name="TroGiupPhanHoi5" />
          <Stack.Screen name="VeUngDung1" />
          <Stack.Screen name="VeUngDung2" />
        </Stack>

        {/* MẸO GIỮ "TRÍ NHỚ" CHO NÚT:
            Chúng ta không dùng { !isAIChatScreen && <FloatingAIButton /> } 
            Vì làm vậy sẽ "giết" cái nút mỗi khi vào chat -> mất tọa độ cũ.
            Dùng Opacity giúp nút vẫn sống âm thầm bên dưới màn chat, 
            khi thoát chat nó hiện ra ngay lập tức ở đúng chỗ cũ.
        */}
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