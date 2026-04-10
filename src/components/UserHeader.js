// src/components/UserHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';

// Bổ sung prop onBackPress để nhận lệnh điều hướng tùy chỉnh
export default function UserHeader({ title, onBackPress }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Nếu có onBackPress truyền vào thì chạy hàm đó, ngược lại mặc định router.back() */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBackPress ? onBackPress : () => router.back()}
        >
          <Image 
            source={require('../../assets/icons/Frame 2.png')} 
            style={styles.backIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        {/* Tiêu đề động */}
        <Text style={styles.headerTitle}>{title}</Text>
        
        {/* Cục View rỗng để cân bằng Flexbox */}
        <View style={{ width: 24 }} />
      </View>
    </View>
  );
}

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
    flex: 1, // Đảm bảo nội dung căn giữa theo chiều dọc của khoảng trống còn lại
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
    fontSize: 28, 
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
});