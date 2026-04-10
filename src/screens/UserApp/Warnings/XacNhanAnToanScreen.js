// src/screens/UserApp/Warnings/XacNhanAnToanScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from "react-native-safe-area-context";

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function XacNhanAnToanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Lấy thông số tai thỏ/nút home ảo

  // Màu xanh lá theo thiết kế
  const SUCCESS_GREEN = '#52B467'; 

  return (
    <View style={styles.mainContainer}>
      {/* 1. HEADER CHUẨN */}
      <UserHeader 
        title="XÁC NHẬN" 
        onBackPress={() => router.back()} 
      />

      {/* 2. NỘI DUNG TRUNG TÂM */}
      <View style={styles.contentContainer}>
        {/* Icon Checkmark lớn (checkmark-01.png) */}
        <View style={styles.iconCircle}>
          <Image 
            source={require('../../../../assets/icons/checkmark-01.png')} 
            style={styles.checkIcon}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.mainTitle}>ĐÁNH DẤU BẠN{"\n"}AN TOÀN</Text>
          <Text style={styles.subDescription}>
            Hành động này sẽ cập nhật trạng thái của bạn và gửi thông báo đến đội cứu hộ và các liên hệ khẩn cấp
          </Text>
        </View>
      </View>

      {/* 3. NÚT XÁC NHẬN Ở ĐÁY (Sử dụng insets.bottom để thay thế SafeAreaView) */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 30 }]}>
        <TouchableOpacity 
          style={[styles.safeButton, { backgroundColor: SUCCESS_GREEN }]}
          activeOpacity={0.8}
          onPress={() => {
            
            router.replace('/HomeSOS');
          }}
        >
          {/* Icon khiên trắng (Vector13.png) */}
          <Image 
            source={require('../../../../assets/icons/Vector13.png')} 
            style={styles.shieldIcon}
          />
          <Text style={styles.safeButtonText}>TÔI AN TOÀN</Text>
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
    // Trừ đi chiều cao header để nội dung nằm chính giữa vùng còn lại
    marginTop: -80, 
  },
  iconCircle: {
    width: 150,
    height: 150,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 20,
  },
  subDescription: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  safeButton: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // Đổ bóng theo style của dự án
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shieldIcon: {
    width: 20,
    height: 24,
    tintColor: COLORS.white,
    marginRight: 12,
  },
  safeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
});