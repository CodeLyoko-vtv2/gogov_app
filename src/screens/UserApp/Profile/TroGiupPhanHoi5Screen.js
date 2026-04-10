// src/screens/UserApp/Profile/TroGiupPhanHoi5Screen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function TroGiupPhanHoi5Screen() {
  const [feedback, setFeedback] = useState('');

  return (
    <View style={styles.mainContainer}>
      {/* Tận dụng lại Header cực kỳ gọn gàng */}
      <UserHeader title="GỬI PHẢN HỒI" />

      {/* Dùng KeyboardAvoidingView để bàn phím không che mất nút Gửi */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          
          {/* LỜI CẢM ƠN / HƯỚNG DẪN */}
          <Text style={styles.descriptionText}>
            Chúng tôi rất trân trọng ý kiến của bạn. Vui lòng chia sẻ bất kỳ phản hồi nào để chúng tôi có thể cải thiện ứng dụng.
          </Text>

          {/* Ô NHẬP NỘI DUNG LỚN */}
          <TextInput
            style={styles.textArea}
            placeholder="Nhập phản hồi của bạn tại đây..."
            placeholderTextColor="#999999"
            multiline={true}
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top" 
            onBlur={() => setFeedback(feedback.trim())} // Kỹ thuật fix lỗi mất chữ gợi ý
          />

          {/* NÚT XÁC NHẬN */}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Gửi phản hồi</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white, 
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    fontWeight: '500',
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16, // Đẩy text bắt đầu từ sát lề trên
    paddingBottom: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: COLORS.white,
    height: 250, // Cố định chiều cao ô nhập liệu cho to và rộng rãi như thiết kế
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
});