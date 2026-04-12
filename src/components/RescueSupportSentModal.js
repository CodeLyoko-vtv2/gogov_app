//src/components/RescueSupportSentModal.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { COLORS } from '../constants/colors';

// Sử dụng icon Vector19 sếp vừa gửi
const SuccessIcon = require('../../assets/icons/Vector19.png');

const { width } = Dimensions.get('window');

export default function RescueSupportSentModal({ isVisible, onClose }) {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          {/* 1. ICON THÀNH CÔNG (Dấu tích xanh) */}
          <View style={styles.iconWrapper}>
            <Image source={SuccessIcon} style={styles.successIcon} resizeMode="contain" />
          </View>

          {/* 2. NỘI DUNG THÔNG BÁO */}
          <Text style={styles.titleText}>Yêu cầu hỗ trợ đã được gửi</Text>
          
          <Text style={styles.descriptionText}>
            Yêu cầu của bạn đã được gửi thành công chúng tôi sẽ xử lý sớm nhất
          </Text>

          {/* 3. NÚT ĐÓNG (Màu cam Rescue) */}
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Đóng</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Nền tối mờ bao trùm toàn màn hình
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  container: {
    width: width * 0.85, // Rộng 85% màn hình
    backgroundColor: '#332D26', // Màu nâu đen lì của sếp
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
    // Đổ bóng cho modal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(242, 122, 58, 0.1)', // Màu cam mờ bao quanh icon
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  successIcon: {
    width: 60,
    height: 60,
    tintColor: COLORS.RESCUE_ORANGE, // Màu cam đặc trưng của Rescue
  },
  titleText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#CCC', // Màu xám nhạt cho text mô tả
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 35,
  },
  closeBtn: {
    backgroundColor: COLORS.RESCUE_ORANGE, // Màu cam Rescue đặc trưng
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF', // Theo hình là chữ trắng (hoặc đen tùy sếp, nhưng hình là trắng)
    fontSize: 20,
    fontWeight: '800',
  },
});