import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RescueHeader({ title, onRightPress, rightIcon = "add" }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
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
    height: 56,
    backgroundColor: 'transparent', // Để hòa hợp với SafeAreaView của màn hình
  },
  headerIcon: {
    padding: 4,
    minWidth: 40, // Đảm bảo khoảng cách cân bằng hai bên
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
});