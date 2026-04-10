// src/screens/UserApp/Warnings/Screen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function CanhBaoBaoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Component phụ cho các dòng thông số (Gió, Mưa, Thời gian)
  const InfoRow = ({ icon, label, value, isLast }) => (
    <View style={[styles.infoRow, isLast && { marginBottom: 0 }]}>
      <View style={styles.infoIconWrapper}>
        <Image source={icon} style={styles.infoIcon} resizeMode="contain" />
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  // Component phụ cho các nút menu phía dưới
  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.menuIconWrapper}>
        <Image source={icon} style={styles.menuIcon} resizeMode="contain" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="CẢNH BÁO" />

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* 1. Hình ảnh bão (bao-1 1.png) */}
        <Image 
          source={require('../../../../assets/images/bao-1-2.png')} 
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* 2. Thẻ thông tin chi tiết Bão Kalmeegi */}
        <View style={styles.stormCard}>
          {/* Header thẻ: Icon bão và tên bão */}
          <View style={styles.cardHeader}>
            <View style={styles.mainIconCircle}>
              <Image 
                source={require('../../../../assets/icons/Rain&Thunderstorm.png')} 
                style={styles.mainStormIcon} 
              />
            </View>
            <View>
              <Text style={styles.stormNumber}>Bão số 13</Text>
              <Text style={styles.stormName}>Bão Kalmegi</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Các hàng thông số */}
          <View style={styles.statsGrid}>
            <View style={styles.statsColumn}>
              <InfoRow 
                icon={require('../../../../assets/icons/Wind.png')} 
                label="Tốc độ gió" 
                value="149 km/h" 
              />
            </View>
            <View style={styles.statsColumn}>
              <InfoRow 
                icon={require('../../../../assets/icons/Humidity.png')} 
                label="Lượng mưa" 
                value="~250 mm" 
              />
            </View>
          </View>

          <InfoRow 
            icon={require('../../../../assets/icons/time-01.png')} 
            label="Dự kiến đổ bộ" 
            value="Thứ Sáu, 01:30" 
            isLast={true}
          />
        </View>

        {/* 3. Các nút điều hướng nhanh */}
        <MenuItem 
          icon={require('../../../../assets/icons/shield-05.png')} 
          title="Hướng dẫn an toàn" 
          onPress={() => console.log('Go to Safety Guide')}
        />

        <MenuItem 
          icon={require('../../../../assets/icons/Vector14.png')} 
          title="Đồ dùng tích trữ" 
          onPress={() => router.push('/DoTichTru')}
        />
      </ScrollView>

      {/* 4. Nút gọi khẩn cấp ở đáy */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity 
          style={styles.callButton}
          activeOpacity={0.8}
          onPress={() => router.push('/Goi112')}
        >
          <Text style={styles.callButtonText}>Gọi khẩn cấp 112</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  // Style cho thẻ bão chính
  stormCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderColor: '#FEE2E2',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderColor: 'transparent', 
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  mainIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  mainStormIcon: {
    width: 30,
    height: 30,
  },
  stormNumber: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '600',
  },
  stormName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statsColumn: {
    flex: 1,
  },
  // Style cho từng dòng thông số
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIcon: {
    width: 18,
    height: 18,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  // Style cho Menu Items
  menuItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderColor: 'transparent', 
    marginBottom: 15,
  },
  menuIconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  // Footer & Button
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.white,
  },
  callButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  callButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
  },
});