import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function CanhBaoNgapLutScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="CẢNH BÁO" />

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 1. Hình ảnh minh họa lũ lụt */}
        <Image 
          source={require('../../../../assets/images/bao-1 1.png')} 
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* 2. Thẻ Cảnh báo nguy hiểm chính */}
        <View style={styles.dangerCard}>
          <Text style={styles.dangerLabel}>CẢNH BÁO NGUY HIỂM</Text>
          <Text style={styles.dangerTitle}>Nguy cơ lũ lụt cao</Text>
          <View style={styles.divider} />
          <View style={styles.dangerInfoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Thời gian lũ lên</Text>
              <Text style={styles.infoValue}>14:00 hôm nay</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Mức đỉnh lũ dự kiến</Text>
              <Text style={styles.infoValue}>Trên báo động 3</Text>
            </View>
          </View>
        </View>

        {/* 3. Section: Khu vực cần tránh (Dùng shadow Đỏ) */}
        <Text style={styles.sectionTitle}>Khu vực cần tránh</Text>
        <View style={[styles.itemCard, styles.dangerShadow]}>
          <View style={[styles.iconBox, { backgroundColor: '#FFF5F5' }]}>
            <Image 
              source={require('../../../../assets/icons/warning-01.png')} 
              style={[styles.itemIcon, { tintColor: COLORS.primary }]} 
            />
          </View>
          <View style={styles.itemTextContent}>
            <Text style={styles.itemTitleMedium}>Đường ven sông ABC</Text>
            <Text style={styles.itemSubtitle}>Nguy cơ sạt lở, ngập sâu</Text>
          </View>
        </View>

        {/* 4. Section: Các địa điểm an toàn (Dùng shadow Xanh) */}
        <Text style={styles.sectionTitle}>Các địa điểm an toàn</Text>
        <View style={[styles.itemCard, styles.safeShadow]}>
          <View style={[styles.iconBox, { backgroundColor: '#F0FFF4' }]}>
            <Image 
              source={require('../../../../assets/icons/shield-05.png')} 
              style={[styles.itemIcon, { tintColor: COLORS.green }]} 
            />
          </View>
          <View style={styles.itemTextContent}>
            <Text style={styles.itemTitleMedium}>Nhà văn hoá cộng đồng</Text>
            <Text style={styles.itemSubtitle}>Cách bạn 5km</Text>
          </View>
        </View>

      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => router.push('/BanDo')}
        >
          <Text style={styles.mainButtonText}>Xem trên bản đồ</Text>
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
    height: 200,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 25,
  },
  dangerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderColor: 'transparent',
    marginBottom: 25,
  },
  dangerLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  dangerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 15,
  },
  dangerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
  },
  // --- STYLE CHUNG CHO CARD ---
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  // --- SHADOW RIÊNG BIỆT ---
  dangerShadow: {
    shadowColor: COLORS.primary,
  },
  safeShadow: {
    shadowColor: '#00B247',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderColor: 'transparent', 
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  itemTextContent: {
    flex: 1,
  },
  itemTitleMedium: {
    fontSize: 16,
    fontWeight: '500', 
    color: '#000',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '600',
  },
  bottomButtonContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.white,
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});