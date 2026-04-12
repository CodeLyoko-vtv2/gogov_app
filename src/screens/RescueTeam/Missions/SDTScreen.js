//src/screens/RescueTeam/Missions/SDTScreen.js
import { COLORS } from '@/src/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RescueHeader from '../../../components/RescueHeader';

// --- ASSETS ---
const UserIcon = require('../../../../assets/icons/Vector17.png'); // Icon xám sếp vừa gửi

export default function SDTScreen() {
  const router = useRouter();

  // Dữ liệu danh bạ tác chiến
  const contacts = [
    {
      id: '1',
      role: 'Nạn nhân',
      name: 'Nguyễn Văn A',
      phone: '0123 456 789',
      btnLabel: 'Gọi nạn nhân',
      btnColor: '#F27A3A', // Màu Cam Rescue
    },
    {
      id: '2',
      role: 'Người thân',
      name: 'Trần Thị B',
      phone: '0123 456 999',
      btnLabel: 'Gọi người thân',
      btnColor: '#F27A3A',
    },
    {
      id: '3',
      role: 'Tổng đài hỗ trợ',
      name: 'Trung tâm chỉ huy',
      phone: '1900 8684',
      btnLabel: 'Gọi tổng đài',
      btnColor: '#E14343', // Màu Đỏ khẩn cấp
    },
  ];

  const handleCall = (number) => {
    // Loại bỏ khoảng trắng trước khi gọi
    const cleanNumber = number.replace(/\s/g, '');
    Linking.openURL(`tel:${cleanNumber}`);
  };

  return (
    <View style={styles.container} edges={['top']}>
      {/* 1. HEADER */}
      <RescueHeader
        title="Liên Hệ"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {contacts.map((item) => (
          <View key={item.id} style={styles.contactCard}>

            {/* THÔNG TIN NGƯỜI LIÊN HỆ */}
            <View style={styles.topRow}>
              <View style={styles.avatarContainer}>
                <Image source={UserIcon} style={styles.avatarIcon} resizeMode="contain" />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.roleText}>{item.role}</Text>
                <Text style={styles.nameText}>{item.name}</Text>
              </View>
            </View>

            <Text style={styles.phoneText}>{item.phone}</Text>

            {/* NÚT GỌI CHIẾN THUẬT */}
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.callBtn, { backgroundColor: item.btnColor }]}
                activeOpacity={0.8}
                onPress={() => router.push(`/Call`)} // Điều hướng đến
              >
                <Text style={styles.callBtnText}>{item.btnLabel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RESCUE_BACKGROUND, // Nền hơi xám nhẹ để nổi bật Card trắng
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  // Card Styles
  contactCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    // Shadow X0 Y4 Blur4 25% chuẩn Figma của sếp
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD8C4', // Màu cam nhạt làm nền avatar
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    width: 25,
    height: 25,
    tintColor: '#F27A3A', // Nhuộm icon xám thành cam sếp nhé
  },
  infoContainer: {
    marginLeft: 15,
  },
  roleText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000',
  },
  phoneText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginBottom: 10,
    letterSpacing: 1,
  },
  callBtn: {
    width: '70%',
    height: 38,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  callBtnText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
  },
});