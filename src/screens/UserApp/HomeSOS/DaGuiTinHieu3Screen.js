// src/screens/UserApp/HomeSOS/DaGuiTinHieu3Screen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI CÁC HẰNG SỐ MÀU SẮC
import { COLORS } from '../../../constants/colors';

export default function DaGuiTinHieu3Screen() {
  const router = useRouter();

  return (
    <ImageBackground 
      // Sử dụng file bản đồ bạn vừa gửi
      source={require('../../../../assets/images/Rectangle 4894.png')} 
      style={styles.backgroundImage}
    >
      {/* Lớp phủ làm mờ nền bản đồ */}
      <View style={styles.overlay}>
        
        {/* Modal thông báo trắng */}
        <View style={styles.modal}>
          
          {/* Icon SOS trong vòng tròn hồng nhạt */}
          <View style={styles.sosIconContainer}>
            <Image 
              source={require('../../../../assets/icons/sos-01.png')} 
              style={styles.sosIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>ĐÃ GỬI TÍN HIỆU CẦU CỨU</Text>
          
          <Text style={styles.description}>
            Tín hiệu SOS và vị trí hiện tại của bạn đã được gửi đến các liên hệ khẩn cấp
          </Text>

          <View style={styles.divider} />

          {/* Thông tin vị trí */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vị trí của bạn:</Text>
            <Text style={styles.infoValue}>Chung cư FPT</Text>
          </View>

          <View style={styles.divider} />

          {/* Thông tin đối tượng nhận tin */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Thông báo đến:</Text>
            <Text style={styles.infoValue}>Trung tâm cứu hộ</Text>
          </View>

          {/* Nút Về trang chủ - Dùng replace để chuyển 0s */}
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.replace('/HomeSOS')}
          >
            <Text style={styles.buttonText}>Về trang chủ</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Làm tối bản đồ phía sau để tập trung vào modal
    justifyContent: 'flex-end', // Đẩy modal xuống dưới cùng
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  modal: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    // Hiệu ứng đổ bóng cho Modal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  sosIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F0', // Màu nền hồng nhạt giống Figma
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sosIcon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#7D7D7D',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 18,
  },
  infoLabel: {
    fontSize: 16,
    color: '#000',
    width: 130,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.primary, // Màu đỏ chủ đạo của SOS
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});