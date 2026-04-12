import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS } from '../constants/colors';

const SuccessIcon = require('../../assets/icons/Vector19.png');
const { width } = Dimensions.get('window');

export default function RescueReportSentModal({ isVisible, onClose }) {
  const [step, setStep] = useState(1); // 1: Đang gửi (chỉ có vòng tròn), 2: Đã gửi xong
  
  // Các biến hiệu ứng
  const fadeAnim = useRef(new Animated.Value(0)).current; // Độ mờ
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Độ phóng đại
  const circleJump = useRef(new Animated.Value(0)).current; // Hiệu ứng nhún cho vòng tròn

  useEffect(() => {
    if (isVisible) {
      setStep(1);
      // Reset animation
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      
      // 1. Hiệu ứng vòng tròn cam nhảy nhẹ lúc đầu
      Animated.loop(
        Animated.sequence([
          Animated.timing(circleJump, { toValue: -10, duration: 500, useNativeDriver: true }),
          Animated.timing(circleJump, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]),
        { iterations: 2 }
      ).start();

      // 2. Sau 2 giây chuyển sang Slide 2 "Cực mượt"
      const timer = setTimeout(() => {
        setStep(2);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          {/* --- SLIDE 1: CHỈ CÓ VÒNG TRÒN CAM (ĐANG XỬ LÝ) --- */}
          {step === 1 && (
            <Animated.View style={[styles.loadingCircle, { transform: [{ translateY: circleJump }] }]} />
          )}

          {/* --- SLIDE 2: NỘI DUNG BÁO CÁO THÀNH CÔNG --- */}
          {step === 2 && (
            <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
              <View style={styles.iconWrapper}>
                <Image source={SuccessIcon} style={styles.successIcon} resizeMode="contain" />
              </View>

              <Text style={styles.titleText}>Báo cáo đã được gửi</Text>
              
              <Text style={styles.descriptionText}>
                Yêu cầu của bạn đã được gửi thành công chúng tôi sẽ xử lý sớm nhất
              </Text>

              <TouchableOpacity 
                style={styles.closeBtn} 
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>Đóng</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    backgroundColor: '#332D26', // Màu nâu đen lì chuẩn Figma sếp gửi
    borderRadius: 28,
    paddingVertical: 45,
    paddingHorizontal: 25,
    alignItems: 'center',
    minHeight: 320, // Giữ chiều cao cố định để không bị giật khi chuyển step
    justifyContent: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 20,
  },
  // Style cho vòng tròn ở Step 1
  loadingCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F27A3A',
    // Đổ bóng cho vòng tròn để nó trông nổi bật
    shadowColor: '#F27A3A',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: 'rgba(242, 122, 58, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    width: 55,
    height: 55,
    tintColor: '#F27A3A',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BBB',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 35,
  },
  closeBtn: {
    backgroundColor: '#F27A3A',
    width: '100%',
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
  },
});