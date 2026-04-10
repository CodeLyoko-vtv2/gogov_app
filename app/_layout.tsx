// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FloatingAIButton from "../src/components/FloatingAIButton";

export default function RootLayout() {
  const [aiModalVisible, setAiModalVisible] = useState(false);

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
          {/* Các trang chính chuyển không animation */}
          <Stack.Screen name="index" options={{ animation: "none" }} />
          <Stack.Screen name="HomeSOS" options={{ animation: "none" }} />
          <Stack.Screen name="CaiDat" options={{ animation: "none" }} />
          <Stack.Screen name="SOSVoice" options={{ animation: "none" }} />

          {/* Các trang còn lại dùng animation mặc định */}
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
          <Stack.Screen
            name="SendingAlert"
            options={{ contentStyle: { backgroundColor: "#FFFFFF" } }}
          />
          <Stack.Screen
            name="XacNhanHuy"
            options={{ contentStyle: { backgroundColor: "#111111" } }}
          />
          <Stack.Screen
            name="DaGuiTinHieu"
            options={{ contentStyle: { backgroundColor: "#111111" } }}
          />
          <Stack.Screen name="DaGuiTinHieu3" />
          <Stack.Screen name="TroGiupPhanHoi1" />
          <Stack.Screen name="TroGiupPhanHoi2" />
          <Stack.Screen name="TroGiupPhanHoi4" />
          <Stack.Screen name="TroGiupPhanHoi5" />
          <Stack.Screen name="VeUngDung1" />
          <Stack.Screen name="VeUngDung2" />
        </Stack>

        <FloatingAIButton
          onPress={() => setAiModalVisible(true)}
          isListening={false}
          hasNotification={false}
        />

        <Modal
          visible={aiModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setAiModalVisible(false)}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setAiModalVisible(false)}
          >
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>AI Assistant</Text>
              <Text style={styles.modalDescription}>
                Màn hình AI sẽ được tích hợp tại đây.
              </Text>
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },
  modalDescription: {
    fontSize: 14,
    color: "#4A4A4A",
    lineHeight: 20,
  },
});
