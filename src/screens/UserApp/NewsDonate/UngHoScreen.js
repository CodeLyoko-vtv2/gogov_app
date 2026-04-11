// src/screens/UserApp/NewsDonate/UngHoScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';
import { Route } from 'expo-router/build/Route';

// MẢNG DỮ LIỆU CÁC LỰA CHỌN QUYÊN GÓP
const DONATE_OPTIONS = [
  { 
    id: 1, 
    title: 'Quyên góp tiền', 
    subtitle: 'Hỗ trợ tài chính trực tiếp', 
    buttonText: 'Quyên góp ngay',
    Route: '/UngHoTien'
  },
  { 
    id: 2, 
    title: 'Ủng hộ gạo', 
    subtitle: 'Cung cấp lương thực thiết yếu', 
    buttonText: 'Quyên góp ngay',
    Route: '/UngHoGao'
  },
  { 
    id: 3, 
    title: 'Ủng hộ vật phẩm', 
    subtitle: 'Đóng góp quần áo, thuốc men,..', 
    buttonText: 'Quyên góp ngay',
    Route: '/UngHoVatPham'
  },
  { 
    id: 4, 
    title: 'Danh sách Mạnh thường quân', 
    subtitle: 'Công khai danh sách quyên góp', 
    buttonText: 'Xem ngay',
    Route: '/DanhSachQuyenGop'
  },
];

export default function UngHoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Component phụ render từng thẻ (Card)
  const DonateCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        {/* Icon bàn tay trái tim */}
        <Image 
          source={require('../../../../assets/icons/bxs_donate-heart.png')} 
          style={styles.heartIcon}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>
      </View>

      {/* Nút hành động */}
      <TouchableOpacity 
        style={styles.actionButton}
        activeOpacity={0.8}
        onPress={() => router.push(item.Route)}
      >
        <Text style={styles.actionButtonText}>{item.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <UserHeader title="ỦNG HỘ" />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40 }}
      >
        {/* BANNER CHIẾN DỊCH */}
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../../../../assets/images/Rectangle 4990.png')} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* DANH SÁCH CÁC LỰA CHỌN */}
        <View style={styles.listContainer}>
          {DONATE_OPTIONS.map((item) => (
            <DonateCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
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
  },
  // --- STYLE BANNER ---
  bannerContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 25,
  },
  bannerImage: {
    width: '100%',
    height: 180, // Chiều cao cố định cho banner
    borderRadius: 16,
  },
  // --- STYLE DANH SÁCH THẺ ---
  listContainer: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#FCA5A5', // Màu viền đỏ nhạt/hồng
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heartIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary, // Đảm bảo icon luôn có màu đỏ chủ đạo
    marginTop: 2, // Đẩy nhẹ icon xuống để căn giữa với dòng chữ đầu tiên
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#F5B7B1', // Màu nền hồng nhạt của nút (tương đồng thiết kế)
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#000', // Chữ màu đen
    fontSize: 15,
    fontWeight: '700',
  },
});