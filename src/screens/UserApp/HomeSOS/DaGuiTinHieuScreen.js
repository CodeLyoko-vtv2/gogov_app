import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { getSelectedLocationText } from "../../../state/selectedLocation";

export default function DaGuiTinHieuScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const locationParam = Array.isArray(params.location)
    ? params.location[0]
    : params.location;
  const locationText =
    (typeof locationParam === "string" && locationParam.trim()) ||
    getSelectedLocationText() ||
    "FPT Complex, Nam Kỳ Khởi Nghĩa";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../../../../assets/images/Rectangle 4894.png")}
        resizeMode="cover"
        style={styles.mapBackground}
      >
        <View style={styles.overlay} />

        <View style={[styles.content, { paddingBottom: insets.bottom + 8 }]}>
          <View style={styles.card}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="warning-amber" size={34} color="#EF6A6A" />
            </View>

            <Text style={styles.title}>ĐÃ GỬI TÍN HIỆU CẦU CỨU</Text>

            <Text style={styles.description}>
              Tín hiệu SOS và vị trí hiện tại của bạn đã được gửi đến các liên
              hệ khẩn cấp
            </Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Vị trí của bạn:</Text>
              <Text style={styles.rowValue}>{locationText}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Thông báo đến:</Text>
              <Text style={styles.notifyValue}>Trung tâm cứu hộ</Text>
            </View>

            <TouchableOpacity
              style={styles.homeButton}
              activeOpacity={0.85}
              onPress={() => router.replace("/HomeSOS")}
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
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 18,
    alignItems: "center",
  },
  iconWrapper: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#FCEDEE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#151515",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 28,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "rgba(0,0,0,0.48)",
    textAlign: "center",
    width: "97%",
    marginBottom: 22,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ECECEC",
    marginBottom: 18,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  rowLabel: {
    width: 124,
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
  rowValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#000000",
    fontWeight: "700",
  },
  notifyValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#000000",
    fontWeight: "700",
  },
  homeButton: {
    width: "100%",
    height: 60,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 22,
  },
  botButton: {
    position: "absolute",
    right: 12,
    bottom: 86,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F17E7E",
    alignItems: "center",
    justifyContent: "center",
  },
});
