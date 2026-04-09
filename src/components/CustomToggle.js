// src/components/CustomToggle.js
import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Image
} from 'react-native';

// Kích thước chuẩn theo thiết kế Figma của bạn
const TOGGLE_WIDTH = 48; 
const TOGGLE_HEIGHT = 24;
const KNOB_SIZE = 24;

// Khoảng cách di chuyển của núm tròn = Chiều rộng khung - Chiều rộng núm
const SLIDE_DISTANCE = TOGGLE_WIDTH - KNOB_SIZE; 

export default function CustomToggle({ 
  isOn, 
  onToggle 
}) {
  // Animated value từ 0 (Off) đến 1 (On)
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  // Chạy animation mỗi khi prop isOn thay đổi
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 250, // Tốc độ trượt mượt mà (0.25 giây)
      useNativeDriver: false, // Bắt buộc false để animate màu sắc
    }).start();
  }, [isOn, animatedValue]);

  // --- HIỆU ỨNG (Interpolations) ---

  // 1. Chuyển động trượt ngang của núm tròn
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SLIDE_DISTANCE], // Từ sát lề trái đến sát lề phải
  });

  // 2. Màu của núm tròn: Off -> D9D9D9 | On -> 325EEC
  const knobBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D9D9D9', '#325EEC'],
  });

  // 3. Hiệu ứng mờ dần của dấu tích: 0 (ẩn khi Off) -> 1 (hiện khi On)
  const checkmarkOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.9}>
      {/* Khung ngoài luôn giữ màu #D9D9D9 */}
      <View style={styles.capsule}>
        
        {/* Núm tròn di chuyển và đổi màu */}
        <Animated.View style={[
          styles.knob, 
          { 
            transform: [{ translateX }],
            backgroundColor: knobBackgroundColor 
          }
        ]}>
          {/* Dấu tích trắng nằm giữa núm tròn */}
          <Animated.Image 
            // Lưu ý: Sửa lại đường dẫn này nếu bạn đặt ảnh Primary.png ở thư mục khác
            source={require('../../assets/icons/Primary.png')} 
            style={[styles.checkIcon, { opacity: checkmarkOpacity }]} 
            resizeMode="contain"
          />
        </Animated.View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  capsule: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: TOGGLE_HEIGHT / 2, 
    backgroundColor: '#D9D9D9', // Khung ngoài cố định màu này
    justifyContent: 'center',
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // Thêm bóng đổ nhẹ để núm không bị chìm khi cùng màu D9D9D9 với nền
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3, // Bóng đổ cho Android
  },
  checkIcon: {
    width: 12, // Thu nhỏ ảnh dấu tích cho vừa vặn với núm 24px
    height: 12,
    tintColor: '#FFFFFF', // Đảm bảo dấu tích luôn có màu trắng
  }
});