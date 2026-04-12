// src/screens/RescueTeam/Profile/CaiDatScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import Header dùng chung
import RescueHeader from '../../../components/RescueHeader';
import { COLORS } from '@/src/constants/colors';

// Import dàn icon sếp vừa gửi
const AccountIcon = require('../../../../assets/icons/FAQ Circle.png'); // Icon người
const NotiIcon = require('../../../../assets/icons/Vector30.png');     // Icon chuông
const MapIcon = require('../../../../assets/icons/Vector25.png');      // Icon bản đồ
const PrivacyIcon = require('../../../../assets/icons/Vector26.png');  // Icon chấm than tròn

export default function SettingsScreen() {
  const router = useRouter();

  // Danh sách các mục cài đặt khớp 100% với ảnh mockup
  const settingsOptions = [
    { id: '1', title: 'Cài đặt tài khoản', icon: AccountIcon,  onPress: () => router.push('/CaiDatTaiKhoan') },
    { id: '2', title: 'Cài đặt thông báo', icon: NotiIcon, onPress: () => router.push('') },
    { id: '3', title: 'Cài đặt bản đồ', icon: MapIcon, onPress: () => router.push('') },
    { id: '4', title: 'Quyền riêng tư', icon: PrivacyIcon, onPress: () => router.push('') },
  ];

  return (
    <View style={styles.container} edges={['top']}>
      {/* 1. HEADER CHUẨN */}
      <RescueHeader 
        title="Cài đặt" 
        onBackPress={() => router.back()} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. DANH SÁCH CÁC MỤC CÀI ĐẶT */}
        <View style={styles.menuList}>
          {settingsOptions.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuCard}
              activeOpacity={0.7}
              onPress={item.onPress}
            >
              <View style={styles.leftContent}>
                <Image 
                  source={item.icon} 
                  style={styles.menuIcon} 
                  resizeMode="contain" 
                />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>

              <Ionicons name="chevron-forward" size={24} color="#000" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

// ==========================================
// 🎨 STYLE CHUẨN "CÀI ĐẶT.PNG" - FONT MẶC ĐỊNH
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RESCUE_BACKGROUND, // Nền trắng sạch sẽ
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuList: {
    gap: 16, // Khoảng cách giữa các card
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F7F8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    // Hiệu ứng đổ bóng đặc trưng của mockup
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // Viền cực nhạt để định hình card
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginRight: 20,
    tintColor: '#000', // Đảm bảo icon hiện màu đen đồng bộ
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});