import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import { COLORS } from '../../../constants/colors';

// Lấy cả chiều rộng và chiều cao màn hình
const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TheoDoiChiTietTrangThaiDoiCuuHoScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>

      {/* 1. KHU VỰC BẢN ĐỒ VÀ LỘ TRÌNH - Đã chỉnh tỷ lệ 60% */}
      <ImageBackground
        source={require('../../../../assets/images/Rectangle 4906.png')}
        style={styles.mapContainer}
      >
        {/* Nút Back (Frame 2.png) */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image
            source={require('../../../../assets/icons/Frame 2.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* Lộ trình (Vector12.png) và Xe cứu thương (image 3.png) */}
        <View style={styles.routeOverlay}>
          <Image
            source={require('../../../../assets/icons/Vector12.png')}
            style={styles.routeLine}
            resizeMode="contain"
          />
          <Image
            source={require('../../../../assets/icons/image 3.png')}
            style={styles.ambulanceIcon}
            resizeMode="contain"
          />
          {/* Điểm đích (Chấm xanh) */}
          <View style={styles.destinationDot} />
        </View>

        {/* Nút Zoom và Định vị phía dưới góc phải */}
        <View style={styles.mapControls}>
          <View style={styles.zoomGroup}>
            <TouchableOpacity style={styles.controlItem}>
              <Image source={require('../../../../assets/icons/Vector11.png')} style={styles.zoomIcon} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.controlItem}>
              <Image source={require('../../../../assets/icons/Line 19.png')} style={styles.minusIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.locationButton}>
            <Image source={require('../../../../assets/icons/location-06.png')} style={styles.locationIcon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* 2. KHU VỰC THÔNG TIN CHI TIẾT */}
      <View style={styles.contentSection}>
        <Text style={styles.statusHeader}>Đội cứu hộ đang đến!</Text>

        {/* Hàng chứa 2 thẻ thông số */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Thời gian dự kiến</Text>
            <Text style={styles.statValue}>10 phút</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Khoảng cách</Text>
            <Text style={styles.statValue}>2.0 km</Text>
          </View>
        </View>

        {/* Thẻ thông tin xe cứu thương */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleIconWrapper}>
            <Image
              source={require('../../../../assets/icons/Primary1.png')}
              style={styles.carIcon}
            />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleTitle}>Xe cứu thương</Text>
            <Text style={styles.plateText}>Biển số: 43A-78413</Text>
          </View>
        </View>

        {/* Nút Xác nhận trạng thái */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => router.push('/XacNhanAnToan')}
          activeOpacity={0.8}>
          <Text style={styles.mainButtonText}>Xác nhận trạng thái</Text>
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
  mapContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.6, // Gán 60% chiều cao màn hình ở đây
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  routeOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeLine: {
    width: 150,
    height: 100,
    position: 'absolute',
    top: '67%',
    left: '25.5%',
  },
  ambulanceIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: '62%',
    left: '22%',
  },
  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#325EEC',
    borderWidth: 2,
    borderColor: COLORS.white,
    position: 'absolute',
    top: '82.7%',
    left: '61.6%',
  },
  mapControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  zoomGroup: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  controlItem: {
    padding: 12,
    alignItems: 'center',
  },
  zoomIcon: {
    width: 18,
    height: 18,
  },
  minusIcon: {
    width: 18,
    height: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '70%',
    alignSelf: 'center',
  },
  locationButton: {
    padding: 5,
  },
  locationIcon: {
    width: 44,
    height: 44,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    marginTop: -20,
  },
  statusHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    width: '47%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FEF9F9',
    borderRadius: 16,
    marginBottom: 20,
  },
  vehicleIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  carIcon: {
    width: 24,
    height: 24,
  },
  vehicleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  plateText: {
    fontSize: 15,
    color: COLORS.gray,
    fontWeight: '600',
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    // Đặt nút ở dưới cùng phần Content
    marginTop: 'auto',
    marginBottom: 30,
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});