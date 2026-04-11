// src/screens/UserApp/Contacts/DanhBa2Screen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function DanhBa2Screen() {
  const router = useRouter();

  // STATE LƯU TRỮ DỮ LIỆU NHẬP
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    // Xử lý logic lưu danh bạ ở đây (gọi API hoặc lưu vào Local Storage)
    console.log("Đã lưu danh bạ mới:", { name, phone });
    
    // Lưu xong thì quay về màn Danh bạ 1
    router.back();
  };

  return (
    // Bọc KeyboardAvoidingView để bàn phím không che input
    <KeyboardAvoidingView 
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <UserHeader title="THÊM DANH BẠ" />

      {/* Bọc TouchableWithoutFeedback để khi bấm ra ngoài vùng trống sẽ hạ bàn phím xuống */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          
          {/* TRƯỜNG NHẬP TÊN */}
          <Text style={styles.label}>Tên</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập tên"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words" // Tự động viết hoa chữ cái đầu tiên của tên
            />
          </View>

          {/* TRƯỜNG NHẬP SỐ ĐIỆN THOẠI */}
          <Text style={styles.label}>Số điện thoại</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad" // Hiển thị bàn phím số
            />
          </View>

          {/* NÚT LƯU */}
          <TouchableOpacity 
            style={[
              styles.saveButton, 
              // Làm mờ nút nếu chưa nhập đủ thông tin
              (!name || !phone) && styles.saveButtonDisabled 
            ]}
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={!name || !phone} // Khóa nút nếu chưa nhập xong
          >
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 24, // Khoảng cách giữa các khối input
  },
  textInput: {
    height: 52,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#FCA5A5', // Màu đỏ nhạt/mờ khi nút bị disable
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
});