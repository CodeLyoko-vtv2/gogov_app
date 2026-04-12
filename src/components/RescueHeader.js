import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/src/constants/colors';

export default function RescueHeader({ 
  title, 
  onRightPress, 
  rightIcon = "add",
  // Thêm 2 thuộc tính mới với giá trị mặc định
  borderBottomWidth = 0, 
  borderBottomColor = '#F0F0F0' 
}) {
  const router = useRouter();

  return (
    <View style={[
      styles.header, 
      { 
        borderBottomWidth: borderBottomWidth, 
        borderBottomColor: borderBottomColor 
      }
    ]}>
      {/* Nút quay lại mặc định */}
      <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Tiêu đề động */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Nút chức năng bên phải (nếu có) */}
      <TouchableOpacity onPress={onRightPress} style={styles.headerIcon}>
        {onRightPress && <Ionicons name={rightIcon} size={28} color="#000" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 100,
    paddingTop: 40, // Tăng khoảng cách trên để cân đối với chiều cao mới
    backgroundColor: COLORS.RESCUE_BACKGROUND, // Đổi sang trắng để thấy rõ đường kẻ nếu có
  },
  headerIcon: {
    padding: 4,
    minWidth: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
});