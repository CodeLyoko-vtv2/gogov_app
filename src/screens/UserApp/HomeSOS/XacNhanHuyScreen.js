import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MAP_BACKGROUND_URI =
  "https://www.figma.com/api/mcp/asset/d1e7327b-b977-490d-a6c5-1d3119386f47";

export default function XacNhanHuyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{ uri: MAP_BACKGROUND_URI }}
        resizeMode="cover"
        style={styles.mapBackground}
      >
        <View style={styles.overlay} />

        <View style={[styles.cardWrap, { paddingBottom: insets.bottom + 8 }]}>
          <View style={styles.card}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="warning-amber" size={42} color="#E86767" />
            </View>

            <Text style={styles.title}>Bạn chắc chắn muốn huỷ?</Text>

            <Text style={styles.description}>
              Tín hiệu SOS sẽ không được gửi đi và các liên hệ khẩn cấp của bạn
              sẽ không được thông báo
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              activeOpacity={0.85}
              onPress={() => router.replace("/HomeSOS")}
            >
              <Text style={styles.confirmText}>Có, Huỷ tín hiệu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.85}
              onPress={() => router.replace("/DaGuiTinHieu")}
            >
              <Text style={styles.backText}>Quay lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  mapBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#111111",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cardWrap: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 24,
    alignItems: "center",
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(250,232,233,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "rgba(0,0,0,0.7)",
    textAlign: "center",
    marginBottom: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0,0,0,0.7)",
    textAlign: "center",
    marginBottom: 22,
  },
  confirmButton: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  backButton: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#F9D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "rgba(0,0,0,0.7)",
  },
});
