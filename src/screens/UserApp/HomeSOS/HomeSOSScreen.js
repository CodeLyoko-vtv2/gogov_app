// src/screens/UserApp/HomeSOS/HomeSOSScreen.js
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserTabs from "../../../components/UserTabs";
import { COLORS } from "../../../constants/colors";

export default function HomeSOSScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={require("../../../../assets/icons/Rectangle 4880.png")}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nguyễn Vũ Huy</Text>
            <View style={styles.locationRow}>
              <Image
                source={require("../../../../assets/icons/location-dot.png")}
                style={styles.locationIcon}
                resizeMode="contain"
              />
              <Text style={styles.locationText} numberOfLines={1}>
                FPT Complex, Nam Kỳ Khởi Nghĩa
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => router.push("/ThongBao2")}
          >
            <Image
              source={require("../../../../assets/icons/Bell.png")}
              style={styles.bellIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* NỘI DUNG CHÍNH */}
      <ScrollView
        contentContainerStyle={[
          styles.contentScroll,
          { paddingBottom: Math.max(insets.bottom + 110, 140) },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={styles.instructionText}>
          Nhấn <Text style={styles.redBoldText}>nút SOS</Text> để gọi cứu trợ
          khẩn cấp!{"\n"}
          Hoặc chọn loại cứu hộ
        </Text>

        {/* KHỐI CHỮ NHẬT XÁM BO GÓC CHỨA NÚT SOS */}
        <View style={styles.sosWrapper}>
          <TouchableOpacity
            style={styles.sosContainer}
            activeOpacity={0.8}
            onPress={() => router.push("/SendingAlert")}
          >
            <Image
              source={require("../../../../assets/icons/SOS Button.png")}
              style={styles.sosImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* NÚT CHỌN LOẠI CỨU HỘ */}
        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7}>
          <Text style={styles.secondaryButtonText}>Chọn loại cứu hộ</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* THANH ĐIỀU HƯỚNG BOTTOM TAB */}
      <UserTabs activeRoute="/HomeSOS" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    width: "100%",
    height: 154,
    backgroundColor: "#FEFAFB",
    paddingTop: 77,
    paddingBottom: 25,
    shadowColor: "#CECECE",
    shadowOffset: { width: 0, height: 4.56 },
    shadowOpacity: 0.35,
    shadowRadius: 5.7,
    elevation: 5,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: 12,
    height: 14,
    tintColor: "#666666",
    marginRight: 6,
  },
  locationText: {
    fontSize: 13,
    color: "#666666",
    flex: 1,
  },
  bellButton: {
    padding: 5,
  },
  bellIcon: {
    width: 32,
    height: 32,
  },

  contentScroll: {
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 25, // Rút ngắn một chút để tạo sự liền mạch với nút
  },
  redBoldText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  // --- ĐÃ ĐIỀU CHỈNH TỶ LỆ KHỐI XÁM VÀ NÚT SOS ---
  sosWrapper: {
    backgroundColor: "#F5F6F9", // Xám sáng chuẩn thiết kế
    width: "100%",
    borderRadius: 24,
    paddingVertical: 20, // Thu nhỏ padding để khung xám ôm sát vào bóng mờ của nút SOS hơn
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35, // Khoảng cách tới nút bên dưới
  },
  sosContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  sosImage: {
    width: 270, // Tăng nhẹ size của nút SOS để tỷ lệ hài hòa với khung xám
    height: 270,
  },

  // --- ĐÃ ĐIỀU CHỈNH NÚT CHỌN LOẠI CỨU HỘ ---
  secondaryButton: {
    width: "100%", // Kéo rộng 100% để mép viền thẳng hàng với khung xám ở trên
    borderWidth: 1.5, // Giảm nét viền xuống 1.5 cho thanh thoát như thiết kế
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
