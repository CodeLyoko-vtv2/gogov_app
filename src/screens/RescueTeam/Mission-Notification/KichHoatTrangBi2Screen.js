import React from 'react';
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

const { width } = Dimensions.get('window');

// Assets
const CHARACTER = require('../../../../assets/images/irman-removebg-preview 2.png');
const HUD_OVERLAY = require('../../../../assets/images/Group 483770.png');

export default function KichHoatTrangBi2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 1. HEADER (Đồng bộ với màn hình trước) */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="robot-happy" size={32} color="#FFF" />
        <Text style={styles.headerText}>TRẠNG THÁI TRANG BỊ</Text>
      </View>

      {/* 2. STATUS ACTIVE (Glow Xanh rực rỡ) */}
      <View style={styles.activeBadge}>
        <Ionicons name="lock-open" size={16} color="#33FF85" />
        <Text style={styles.activeText}>ACTIVE</Text>
      </View>

      {/* 3. KHU VỰC HERO (Bộ giáp + HUD) */}
      <View style={styles.heroContainer}>
        {/* Bộ giáp Wireframe */}
        <Image source={CHARACTER} style={styles.characterImage} resizeMode="contain" />
        
        {/* Lớp HUD Overlay (Đè lên bộ giáp) */}
        <Image source={HUD_OVERLAY} style={styles.hudOverlay} resizeMode="contain" />
      </View>

      {/* 4. MÔ TẢ & NÚT TÁC CHIẾN */}
      <View style={styles.footer}>
        <Text style={styles.descText}>
          Hãy mặc bộ giáp cứu hộ để kích hoạt toàn bộ chức năng hỗ trợ và bắt đầu nhiệm vụ ngay lập tức
        </Text>

        <TouchableOpacity
          style={styles.btnAction}
          activeOpacity={0.8}
          onPress={() => router.replace('/BaoDong')} // Đẩy stack ra ngoài như sếp dặn
        >
          <Text style={styles.btnText}>BẮT ĐẦU NHIỆM VỤ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Nền đen sâu thẳm
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    gap: 12,
  },
  headerText: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#33FF85',
    backgroundColor: 'rgba(51, 255, 133, 0.1)',
    marginTop: 25,
    // Hiệu ứng tỏa sáng cho trạng thái Active
    shadowColor: '#33FF85',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  activeText: {
    color: '#33FF85',
    fontWeight: '900',
    marginLeft: 10,
    fontSize: 16,
    letterSpacing: 1.5,
  },
  heroContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  characterImage: {
    width: width * 0.8,
    height: '80%',
  },
  hudOverlay: {
    position: 'absolute',
    width: width * 0.95, // Cho HUD rộng hơn bộ giáp tí cho nó bao quát
    height: '90%',
    top: '5%',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  descText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  btnAction: {
    width: '100%',
    height: 65,
    backgroundColor: '#16A34A',
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    // ✅ ĐỔ BÓNG 25% CHUẨN QUÂN NHU
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  btnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});