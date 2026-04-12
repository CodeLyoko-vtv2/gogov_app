import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import SlideToRespond from '../../../components/SlideToRespond';

const { width } = Dimensions.get('window');

// Assets
const GO_PINK = require('../../../../assets/icons/go-pink.png');
const GO_YELLOW = require('../../../../assets/icons/go-yellow.png');
const GO_BLUE = require('../../../../assets/icons/go-blue.png');
const GO_GREEN = require('../../../../assets/icons/go-green.png');

export default function BaoDongNhiemVuScreen() {
  const router = useRouter();

  // Hàm xử lý phản hồi nhiệm vụ
  const handleResponse = () => {
    // ✅ "Đẩy chính nó ra khỏi stack": Dùng replace để không thể Back lại màn này
    router.replace('/ThongBaoAlert'); 
  };

  return (
    <View style={styles.container}>
      {/* 1. HIỆU ỨNG NỀN TỎA SÁNG */}
      <View style={styles.backgroundGlowContainer}>
        <LinearGradient
          colors={['rgba(255, 138, 101, 0.4)', 'rgba(255, 255, 255, 0)']}
          style={styles.radialGlow}
        />
      </View>

      <View style={styles.contentWrapper}>
        
        {/* TIÊU ĐỀ & MÔ TẢ */}
        <View style={styles.headerArea}>
          <Text style={styles.alertTitle}>BÁO ĐỘNG KHẨN CẤP!</Text>
          <Text style={styles.alertDescription}>
            Tất cả lính cứu hộ lập tức tập hợp tại điểm chỉ định, kiểm tra đầy đủ
            trang thiết bị và sẵn sàng nhận lệnh triển khai ngay lập tức.
          </Text>
        </View>

        {/* KHU VỰC RADAR */}
        <View style={styles.radarWrapper}>
          <View style={[styles.ring, { width: width * 0.8, height: width * 0.8 }]} />
          <View style={[styles.ring, { width: width * 0.6, height: width * 0.6 }]} />
          <View style={[styles.ring, { width: width * 0.4, height: width * 0.4 }]} />

          {/* Chiến đội Badges */}
          <View style={[styles.teamBadge, styles.goBlue]}>
            <Image source={GO_BLUE} style={styles.teamAvatar} />
            <Text style={styles.teamName}>GoBlue</Text>
          </View>
          <View style={[styles.teamBadge, styles.goYellow]}>
            <Image source={GO_YELLOW} style={styles.teamAvatar} />
            <Text style={styles.teamName}>GoYellow</Text>
          </View>
          <View style={[styles.teamBadge, styles.goPink]}>
            <Image source={GO_PINK} style={styles.teamAvatar} />
            <Text style={styles.teamName}>GoPink</Text>
          </View>
          <View style={[styles.teamBadge, styles.goGreen]}>
            <Image source={GO_GREEN} style={styles.teamAvatar} />
            <Text style={styles.teamName}>GoGreen</Text>
          </View>

          {/* NÚT TRUNG TÂM */}
          <View style={styles.centralButtonWrapper}>
            <LinearGradient
              colors={['#FF8A65', '#FF5252']}
              style={styles.centralButton}
            >
              <Text style={styles.heroText}>Nhiệm vụ mới</Text>
            </LinearGradient>
            <View style={styles.whiteGlowRing} />
          </View>
        </View>

        {/* 3. NÚT TRƯỢT PHẢN HỒI (Nổi bật hơn) */}
        <View style={styles.footerArea}>
          <SlideToRespond 
            onSlideComplete={handleResponse}
            // Gợi ý truyền thêm props để chữ to và rực hơn
            title="TRƯỢT ĐỂ PHẢN HỒI"
            titleStyle={styles.sliderTextOverride} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundGlowContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radialGlow: {
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: (width * 1.5) / 2,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 40, // Tăng padding bottom để tạo không gian cho thanh trượt
  },
  headerArea: {
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 34, // Tăng nhẹ size
    fontWeight: '900',
    color: '#2F3A4A',
    textAlign: 'center',
    marginBottom: 10,
  },
  alertDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#2F3A4A',
    fontWeight: '700', // Đậm hơn để dễ đọc lệnh
  },
  radarWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5, // Nét rõ hơn
    borderColor: 'rgba(0,0,0,0.12)',
    borderStyle: 'dashed',
  },
  centralButtonWrapper: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteGlowRing: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 15,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  centralButton: {
    width: 175,
    height: 175,
    borderRadius: 87.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35, // Tăng độ rực shadow
    shadowRadius: 20,
    elevation: 12,
  },
  heroText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase', // Chữ hoa cho quyền lực
  },
  teamBadge: {
    position: 'absolute',
    alignItems: 'center',
  },
  teamAvatar: {
    width: 52, // Avatar to hơn tí
    height: 52,
    borderRadius: 26,
    borderWidth: 2.5,
    borderColor: '#FFF',
  },
  teamName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '900',
    color: '#2F3A4A',
  },
  // Tọa độ tác chiến giữ nguyên
  goBlue: { top: '22%', left: '5%' },
  goYellow: { top: '22%', right: '5%' },
  goPink: { bottom: '28%', right: '10%' },
  goGreen: { bottom: '22%', left: '15%' },
  
  footerArea: {
    width: '100%',
    paddingVertical: 10,
    // Đổ bóng cho cả vùng trượt để nó nổi bật khỏi nền
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sliderTextOverride: {
    fontSize: 48, // Chữ to hơn
    fontWeight: '800', // Đậm hơn
    letterSpacing: 1.5, // Khoảng cách chữ thưa cho sang
  }
});