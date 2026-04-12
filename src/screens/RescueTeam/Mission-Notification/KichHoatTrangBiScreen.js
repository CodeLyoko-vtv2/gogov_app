import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ArmorUnlock from '../../../components/ArmorUnlock';
import { COLORS } from '@/src/constants/colors';

const { width } = Dimensions.get('window');
const CHARACTER = require('../../../../assets/images/irman-removebg-preview 1.png');

export default function TrangBiScreen() {
  const router = useRouter();
  const [showUnlock, setShowUnlock] = useState(false);

  return (
    <View style={styles.container}>
      {/* 1. HEADER (Thêm icon chuẩn Figma) */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="robot-industrial" size={32} color="#000" /> 
        <Text style={styles.title}>TRẠNG THÁI TRANG BỊ</Text>
      </View>

      {/* 2. LOCKED BADGE (Glow & Border) */}
      <View style={styles.lockBadge}>
        <Ionicons name="lock-closed" size={16} color="#FF3366" />
        <Text style={styles.lockText}>LOCKED</Text>
      </View>

      {/* 3. CHARACTER AREA (Tối ưu tỷ lệ hiển thị) */}
      <View style={styles.imageContainer}>
        <Image source={CHARACTER} style={styles.character} resizeMode="contain" />
      </View>

      {/* 4. DESCRIPTION */}
      <View style={styles.descWrapper}>
        <Text style={styles.desc}>
          Để đảm bảo an toàn và hiệu quả trong tình huống khẩn cấp, 
          vui lòng kích hoạt bộ giáp cứu hộ ngay bây giờ
        </Text>
      </View>

      {/* 5. ACTION BUTTON (Đổ bóng chuẩn 25%) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => setShowUnlock(true)}
        >
          <Text style={styles.buttonText}>MỞ KHÓA TRANG BỊ</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL XỬ LÝ */}
      <ArmorUnlock
        visible={showUnlock}
        onClose={() => {
          setShowUnlock(false);
          // ✅ Thay thế stack để không Back lại màn hình Locked này được
          router.replace('/KichHoatTrangBi2'); 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70, // Bù đắp khoảng trống Notch
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#FF3366',
    backgroundColor: 'rgba(255, 51, 102, 0.05)',
    marginTop: 20,
    // Glow nhẹ cho trạng thái Locked
    shadowColor: '#FF3366',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  lockText: {
    color: '#FF3366',
    fontWeight: '800',
    marginLeft: 8,
    fontSize: 16,
    letterSpacing: 1.2,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  character: {
    width: width * 0.75,
    height: '90%',
  },
  descWrapper: {
    width: '85%',
    marginBottom: 25,
  },
  desc: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontWeight: '600',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  button: {
    width: '100%',
    height: 65,
    backgroundColor: '#16A34A',
    borderRadius: 33, // Capsule style chuẩn Figma
    justifyContent: 'center',
    alignItems: 'center',
    // ✅ ĐỔ BÓNG CHUẨN X0 Y4 Blur4 25%
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});