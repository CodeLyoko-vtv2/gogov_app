// src/screens/RescueTeam/Profile/CaiDatTaiKhoanScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Import Header và hằng số
import RescueHeader from '../../../components/RescueHeader';
import { COLORS } from '../../../constants/colors';

// Import dàn icon sếp gửi
const GroupIcon = require('../../../../assets/icons/Vector33.png'); // Icon Đội/Nhóm
const PhoneIcon = require('../../../../assets/icons/Vector31.png'); // Icon Điện thoại
const EmailIcon = require('../../../../assets/icons/Vector32.png'); // Icon Email

export default function CaiDatTaiKhoanScreen() {
  const router = useRouter();

  // Khởi tạo state cho các trường nhập liệu
  const [teamName, setTeamName] = useState('Chiến đội cứu hộ');
  const [phone, setPhone] = useState('0123456789');
  const [email, setEmail] = useState('email@gmail.com');

  return (
    <View style={styles.container} edges={['top']}>
      {/* 1. HEADER CHUẨN */}
      <RescueHeader 
        title="Cài đặt tài khoản" 
        onBackPress={() => router.back()} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. FORM NHẬP LIỆU */}
        <View style={styles.form}>
          
          {/* Tên đội/cá nhân */}
          <Text style={styles.label}>Tên đội/cá nhân</Text>
          <View style={styles.inputContainer}>
            <Image source={GroupIcon} style={styles.inputIcon} resizeMode="contain" />
            <TextInput
              style={styles.input}
              value={teamName}
              onChangeText={setTeamName}
              placeholder="Nhập tên đội..."
            />
          </View>

          {/* Số điện thoại */}
          <Text style={styles.label}>Số điện thoại</Text>
          <View style={styles.inputContainer}>
            <Image source={PhoneIcon} style={styles.inputIcon} resizeMode="contain" />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại..."
            />
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Image source={EmailIcon} style={styles.inputIcon} resizeMode="contain" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Nhập email..."
            />
          </View>

        </View>

        {/* 3. HỆ THỐNG NÚT BẤM (DƯỚI CÙNG) */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.saveButton} 
            activeOpacity={0.8}
            onPress={() => console.log('Lưu thay đổi')}
          >
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton} 
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Huỷ bỏ</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

// ==========================================
// 🎨 STYLE CHUẨN FIGMA - ĐỔ BÓNG X0 Y4 Blur4
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RESCUE_BACKGROUND, // Nền trắng sạch sẽ
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  form: {
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: '800', // Đậm nét theo thiết kế
    color: '#000',
    marginBottom: 12,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
    // --- ĐỔ BÓNG CHUẨN FIGMA (X:0, Y:4, Blur:4, Opacity: 25%) ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Dành cho Android
    // Viền cực nhạt để định hình khối
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  // Buttons
  buttonGroup: {
    marginTop: 'auto', // Đẩy xuống dưới nếu màn hình dài
    gap: 16,
  },
  saveButton: {
    backgroundColor: '#F27A3A', // Màu cam rescue
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  cancelButton: {
    backgroundColor: '#262626', // Màu đen lì
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
});