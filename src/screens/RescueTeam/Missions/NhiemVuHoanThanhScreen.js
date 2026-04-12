import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// --- ASSETS ---
const ShieldIcon = require('../../../../assets/icons/Vector20.png'); 

const { width, height } = Dimensions.get('window');

export default function NhiemVuHoanThanhScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        
        {/* 1. KHU VỰC TRUNG TÂM - CHIẾN THẮNG */}
        <View style={styles.successSection}>
          <View style={styles.circleBlue}>
            <Image source={ShieldIcon} style={styles.shieldImg} resizeMode="contain" />
          </View>
          
          <Text style={styles.mainTitle}>Cảm Ơn Đội Cứu Hộ!</Text>
          <Text style={styles.subTitle}>Nhiệm vụ đã hoàn thành xuất sắc</Text>
        </View>

        {/* 2. CARD THỐNG KÊ (LAYOUT FIGMA) */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Thời gian hoàn thành</Text>
            <Text style={styles.statValue}>2 giờ 30 phút</Text>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Số người giải cứu</Text>
            <Text style={styles.statValue}>2 người</Text>
          </View>
        </View>

      </View>

      {/* 3. NÚT ĐIỀU HƯỚNG DUY NHẤT - VỀ TRANG CHỦ */}
      <TouchableOpacity 
        style={styles.homeLink} 
        activeOpacity={0.7}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.homeLinkText}>Về trang chủ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Đưa toàn bộ nội dung vào chính giữa màn hình
    paddingHorizontal: 20,
  },
  successSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  circleBlue: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E3F2FD', // Xanh nhạt dịu mắt
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  shieldImg: {
    width: 80,
    height: 80,
    tintColor: '#4A90E2', // Nhuộm khiên màu xanh đậm uy tín
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
    marginTop: 10,
  },
  // Card thống kê
  statsCard: {
    width: width * 0.9,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 30,
    // Shadow cho cảm giác nổi khối chuyên nghiệp
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#EEE',
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  // Footer Link
  homeLink: {
    paddingBottom: 50, // Cách đáy một khoảng an toàn
    alignItems: 'center',
  },
  homeLinkText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A90E2',
    textDecorationLine: 'underline', // Nhìn giống link để chiến sĩ biết là bấm được
  },
});