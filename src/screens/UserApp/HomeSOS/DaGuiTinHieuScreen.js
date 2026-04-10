import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MAP_BACKGROUND_URI =
  "https://www.figma.com/api/mcp/asset/73dc8572-0f3d-4d3d-86c9-5c273f35260f";

export default function DaGuiTinHieuScreen() {
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

        <View style={[styles.content, { paddingBottom: insets.bottom + 8 }]}>
          <View style={styles.card}>
            <View style={styles.iconWrapper}>
              <Image
                source={require("../../../../assets/icons/sos-icon.png")}
                style={styles.sosIcon}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>ĐÃ GỬI TÍN HIỆU CẦU CỨU</Text>

            <Text style={styles.description}>
              Tín hiệu SOS và vị trí hiện tại của bạn đã được gửi đến các liên
              hệ khẩn cấp
            </Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Vị trí của bạn:</Text>
              <Text style={styles.rowValue}>
                FPT Complex,{"\n"}
                Nam Kỳ Khởi Nghĩa
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Thông báo đến:</Text>
              <Text style={styles.notifyValue}>Trung tâm cứu hộ, Ba, Mẹ</Text>
            </View>

            <TouchableOpacity
              style={styles.homeButton}
              activeOpacity={0.85}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.homeButtonText}>Về trang chủ</Text>
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
    backgroundColor: "#111111",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 22,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.48)",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 22,
    alignItems: "center",
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FAE8E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sosIcon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0,0,0,0.5)",
    textAlign: "center",
    width: "92%",
    marginBottom: 18,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginBottom: 16,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  rowLabel: {
    width: 120,
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
  rowValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#000000",
    fontWeight: "600",
  },
  notifyValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#000000",
    fontWeight: "600",
  },
  homeButton: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
