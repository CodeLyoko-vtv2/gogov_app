//src/screens/Onboarding/PhanLoaiNguoiDungScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Giả định bạn đã có file định nghĩa màu sắc chung
import { COLORS } from '../../constants/colors';

export default function PhanLoaiNguoiDungScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // STATE: Lưu trữ vai trò đang được chọn. Mặc định chọn 'nguoi_dan'
  const [selectedRole, setSelectedRole] = useState('nguoi_dan');

  const handleContinue = () => {
    console.log("Vai trò được chọn:", selectedRole);
    if (selectedRole === 'nguoi_dan') {
      router.push('/HomeSOS');
    } else if (selectedRole === 'chien_doi') {
      router.push('/(rescue)');
    }
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      
      {/* 1. KHU VỰC LOGO & TIÊU ĐỀ */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../../assets/images/Logo-Gogo-V.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Bạn là ai?</Text>
        <Text style={styles.subtitle}>
          Chọn vai trò phù hợp để cá nhân hoá trải nghiệm của bạn trong ứng dụng
        </Text>
      </View>

      {/* 2. KHU VỰC CHỌN VAI TRÒ */}
      <View style={styles.cardsContainer}>
        
        {/* Card 1: Người dân */}
        <TouchableOpacity 
          style={[
            styles.roleCard, 
            selectedRole === 'nguoi_dan' ? styles.cardActive : styles.cardInactive
          ]}
          activeOpacity={0.8}
          onPress={() => setSelectedRole('nguoi_dan')}
        >
          <View style={styles.iconCircle}>
            <Image 
              source={require('../../../assets/icons/Group 4.png')} 
              style={styles.roleIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.roleTitle}>Người dân</Text>
            <Text style={styles.roleDescription}>
              Gửi yêu cầu hỗ trợ và nhận cảnh báo khẩn cấp
            </Text>
          </View>
        </TouchableOpacity>

        {/* Card 2: Chiến đội cứu hộ */}
        <TouchableOpacity 
          style={[
            styles.roleCard, 
            selectedRole === 'chien_doi' ? styles.cardActive : styles.cardInactive
          ]}
          activeOpacity={0.8}
          onPress={() => setSelectedRole('chien_doi')}
        >
          <View style={styles.iconCircle}>
            <Image 
              source={require('../../../assets/icons/Group 483771.png')} 
              style={styles.roleIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.roleTitle}>Chiến đội cứu hộ</Text>
            <Text style={styles.roleDescription}>
              Tiếp nhận và xử lý các yêu cầu cứu hộ
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* 3. NÚT TIẾP TỤC (Nằm sát đáy) */}
      <View style={[styles.footerContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity 
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
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
  // --- Header ---
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  // --- Cards ---
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardActive: {
    borderColor: COLORS.primary, // Đỏ khi được chọn
  },
  cardInactive: {
    borderColor: '#E5E7EB', // Xám nhạt khi không được chọn
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FDECEE', // Nền đỏ hồng nhạt cho icon
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleIcon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  // --- Footer ---
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 25, // Bo tròn nhiều như thiết kế
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
});