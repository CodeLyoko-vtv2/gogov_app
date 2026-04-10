//  src/screens/UserApp/Warnings/TheoDoiTrangThaiDoiCuuHoScreen.js
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function TheoDoiTrangThaiDoiCuuHoScreen() {
  const router = useRouter();

  // Thành phần mục dòng thời gian (Timeline Item)
  const TimelineItem = ({ title, time, icon, isLast, isFirst }) => (
    <View style={styles.timelineRow}>
      <View style={styles.iconColumn}>
        {/* Vòng tròn chứa icon */}
        <View style={[styles.statusIconWrapper, isFirst && styles.activeStatusIcon]}>
          <Image source={icon} style={styles.statusIcon} resizeMode="contain" />
        </View>
        {/* Đường kẻ dọc nối các bước */}
        {!isLast && <View style={styles.verticalLine} />}
      </View>

      <View style={styles.textContent}>
        <Text style={[styles.statusTitle, isFirst && styles.activeText]}>{title}</Text>
        <Text style={styles.statusTime}>{time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/* Header chuẩn của dự án */}
      <UserHeader title="THÔNG BÁO" />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 1. Khu vực Bản đồ */}
        <Image
          source={require('../../../../assets/images/Rectangle 4906.png')}
          style={styles.mapView}
          resizeMode="cover"
        />

        {/* 2. Thẻ thông tin đội cứu hộ - Đã đổi View thành TouchableOpacity */}
        <TouchableOpacity
          activeOpacity={0.9} // Thêm hiệu ứng mờ nhẹ khi bấm cho chuyên nghiệp
          style={styles.infoCard}
          onPress={() => router.push('/TheoDoiChiTietTrangThaiDoiCuuHo')}
        >
          <Text style={styles.cardLabel}>Thông tin đội cứu hộ</Text>
          <Text style={styles.etaText}>Dự kiến đến trong 10 phút</Text>

          <View style={styles.divider} />

          <Text style={styles.teamName}>Đội cứu hộ ABC</Text>
          <Text style={styles.plateNumber}>Biển số: 43A-78413</Text>
        </TouchableOpacity>

        {/* 3. Dòng thời gian trạng thái */}
        <View style={styles.timelineContainer}>
          <TimelineItem
            isFirst={true}
            title="Đội cứu hộ đang đến"
            time="Hiện tại"
            icon={require('../../../../assets/icons/Primary1.png')}
          />
          <TimelineItem
            title="Đội cứu đã xuất phát"
            time="9:30"
            icon={require('../../../../assets/icons/Polygon 2.png')}
          />
          <TimelineItem
            title="Đã tìm thấy đội cứu hộ phù hợp"
            time="9:29"
            icon={require('../../../../assets/icons/Primary3.png')}
          />
          <TimelineItem
            isLast={true}
            title="Đã gửi yêu cầu thành công"
            time="9:30"
            icon={require('../../../../assets/icons/check.png')}
          />
        </View>
      </ScrollView>

      {/* 4. Nút Gọi đội cứu hộ cố định ở đáy */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.callButton} activeOpacity={0.8} onPress={() => router.push('/GoiChoDoiCuuHo')}>
          <Text style={styles.callButtonText}>Gọi đội cứu hộ</Text>
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mapView: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginTop: 20,
  },
  // Style cho thẻ thông tin đội cứu hộ
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderColor: 'transparent',
  },
  cardLabel: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  etaText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '600',
    marginBottom: 4,
  },
  plateNumber: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '600',
  },
  // Style cho dòng thời gian
  timelineContainer: {
    marginTop: 30,
    paddingLeft: 5,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 0,
    height: 70,
  },
  iconColumn: {
    alignItems: 'center',
    marginRight: 15,
    width: 32,
  },
  statusIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  activeStatusIcon: {
    backgroundColor: '#FEE2E2',
  },
  statusIcon: {
    width: 16,
    height: 16,
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#E5E7EB',
    position: 'absolute',
    top: 32,
    bottom: -10,
    zIndex: 1,
  },
  textContent: {
    flex: 1,
    paddingTop: 4,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  activeText: {
    color: COLORS.black,
  },
  statusTime: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  // Nút gọi cứu hộ ở đáy
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.white,
  },
  callButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  callButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
});