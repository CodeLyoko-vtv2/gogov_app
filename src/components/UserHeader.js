// src/components/UserHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';

// Nhận prop 'title' để thay đổi tiêu đề linh hoạt theo từng màn hình
export default function Header({ title }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Nút Back đã được tích hợp sẵn lệnh router.back() */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image 
            // Lưu ý: Đường dẫn ảnh lùi ra 2 cấp thư mục (../../)
            source={require('../../assets/icons/Frame 2.png')} 
            style={styles.backIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        {/* Tiêu đề động */}
        <Text style={styles.headerTitle}>{title}</Text>
        
        {/* Cục View rỗng để cân bằng Flexbox, giúp Tiêu đề luôn nằm giữa */}
        <View style={{ width: 24 }} />
      </View>
    </View>
  );
}

// Bê nguyên bộ "bí kíp" Style của Header vào đây 1 lần duy nhất
const styles = StyleSheet.create({
  header: {
    width: '100%', 
    height: 154,
    backgroundColor: '#FEFAFB',
    paddingTop: 77, 
    paddingBottom: 25,
    shadowColor: '#CECECE',
    shadowOffset: { width: 0, height: 4.56 },
    shadowOpacity: 0.35,
    shadowRadius: 5.7,
    elevation: 5, 
    zIndex: 10, 
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24, 
    height: 24,
    tintColor: COLORS.primary, 
  },
  headerTitle: {
    fontSize: 28, // Dùng 28 làm chuẩn an toàn
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
});