// src/screens/UserApp/Contacts/DanhBa4Screen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function DanhBa4Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGoHome = () => {
    // Chuyển hướng về màn hình Home. Thay đổi '/Home' thành đường dẫn thực tế của bạn.
    router.replace('/HomeSOS'); 
  };

  const handleGoBack = () => {
    // Quay lại màn hình trước đó (Màn hình Danh bạ)
    router.replace('/DanhBa1'); 
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER TỪ COMPONENT CHUNG */}
      <UserHeader title="GỌI ĐIỆN" onBackPress={() => router.replace('/DanhBa1')}/>

      {/* KHU VỰC TRUNG TÂM (Trạng thái cuộc gọi) */}
      <View style={styles.contentContainer}>
        
        {/* Vòng tròn chứa icon kết thúc cuộc gọi */}
        <View style={styles.iconBackground}>
          <Image 
            source={require('../../../../assets/icons/solar_end-call-bold.png')} 
            style={styles.endCallIcon}
            resizeMode="contain"
          />
        </View>

        {/* Text thông báo */}
        <Text style={styles.statusText}>Cuộc gọi đã kết thúc</Text>
        <Text style={styles.durationText}>Thời lượng 01:12</Text>

      </View>

      {/* KHU VỰC CÁC NÚT ĐIỀU HƯỚNG DƯỚI ĐÁY */}
      <View style={[styles.footerContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        
        {/* Nút Trang chủ (Primary) */}
        <TouchableOpacity 
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={handleGoHome}
        >
          <Text style={styles.primaryButtonText}>Trang chủ</Text>
        </TouchableOpacity>

        {/* Nút Quay lại (Secondary / Outline) */}
        <TouchableOpacity 
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={handleGoBack}
        >
          <Text style={styles.secondaryButtonText}>Quay lại</Text>
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
  // --- Khu vực trung tâm ---
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Canh giữa theo chiều dọc
    marginTop: -80, // Đẩy toàn bộ khối lên một chút để bù trừ cho phần Header
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDECEE', // Nền hồng nhạt (tương tự thiết kế)
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  endCallIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.primary, // Đổi màu icon ống nghe thành đỏ
  },
  statusText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  durationText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  // --- Khu vực Footer (Nút bấm) ---
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20, // Thêm khoảng cách phía trên nút
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16, // Khoảng cách giữa 2 nút
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000', // Viền đen theo thiết kế
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});