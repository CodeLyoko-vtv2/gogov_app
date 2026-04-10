// src/screens/UserApp/Profile/TroGiupPhanHoi4Screen.js
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Gọi các Component dùng chung
import UserHeader from "../../../components/UserHeader";
import UserMenuCard from "../../../components/UserMenuCard";
import { COLORS } from "../../../constants/colors";

export default function TroGiupPhanHoi4Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // State để lưu trữ dữ liệu người dùng nhập vào Form
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="LIÊN HỆ HỖ TRỢ" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.contentScroll,
            { paddingBottom: Math.max(insets.bottom + 16, 40) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* SỬ DỤNG USER MENU CARD SIÊU GỌN */}
          <UserMenuCard
            iconSource={require("../../../../assets/icons/material-symbols_call-outline-sharp.png")}
            title="Tổng đài"
            subtitle="1900 1234"
          />

          <UserMenuCard
            iconSource={require("../../../../assets/icons/material-symbols_mail-outline.png")}
            title="Email"
            subtitle="hotro@sosrescueapp.com"
          />

          {/* ĐƯỜNG KẺ NGANG */}
          <View style={styles.divider} />

          {/* FORM NHẬP TIN NHẮN */}
          <Text style={styles.formTitle}>Hoặc gửi tin nhắn cho chúng tôi</Text>

          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            placeholderTextColor="#999999"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Nội dung bạn cần hỗ trợ..."
            placeholderTextColor="#999999"
            multiline={true}
            numberOfLines={6}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
            onBlur={() => setMessage(message.trim())} // Fix lỗi mất chữ gợi ý
          />

          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Gửi tin nhắn</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// STYLE ĐÃ ĐƯỢC CẮT GIẢM SẠCH SẼ NHỮNG PHẦN DƯ THỪA
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000000",
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
