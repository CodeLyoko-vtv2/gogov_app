import { useEmergencySystem } from '@/hooks/useEmergencySystem';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/src/constants/colors';

// Assets
const MAP_ALERT = require('../../../../assets/images/map-alert.png');

export default function BaoDongScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(1);

  // ✅ TRIỆU HỒI CÔNG TẮC BÁO ĐỘNG
  const { activateEmergencyClock } = useEmergencySystem();

  // --- LOGIC TIMER (Đã dọn dẹp gọn gàng) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= 59 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (num) => (num < 10 ? `0${num}` : num);

  return (
    <SafeAreaView style={styles.container}>
      {/* KHỐI TRÊN: HEADER & MAP */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Ionicons name="warning" size={32} color="#E04140" />
          <Text style={styles.headerText}>CẢNH BÁO TAI NẠN{"\n"}KHẨN CẤP</Text>
        </View>

        <View style={styles.mapWrapper}>
          <Image source={MAP_ALERT} style={styles.mapImage} resizeMode="cover" />
        </View>
      </View>

      {/* KHỐI GIỮA: INFO & TIMER */}
      <View style={styles.middleSection}>
        <View style={styles.infoBox}>
          <View style={styles.titleRow}>
            <Ionicons name="airplane" size={28} color="#2C3E50" />
            <Text style={styles.missionTitle}>Tai nạn máy bay</Text>
          </View>
          <Text style={styles.descText}>Cách 2.5 km - 5 phút di chuyển</Text>
          <Text style={styles.descText}>Ước tính 300 nạn nhân.</Text>
          <Text style={styles.descText}>Địa chỉ: 470 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng</Text>
        </View>

        <View style={styles.timerSection}>
          <Text style={styles.timerHeader}>Thời gian phản hồi</Text>
          <View style={styles.timerGrid}>
            <View style={styles.timerUnit}>
              <View style={styles.timerBox}><Text style={styles.timerNum}>00</Text></View>
              <Text style={styles.timerLabel}>Giờ</Text>
            </View>
            <View style={styles.timerUnit}>
              <View style={styles.timerBox}><Text style={styles.timerNum}>00</Text></View>
              <Text style={styles.timerLabel}>Phút</Text>
            </View>
            <View style={styles.timerUnit}>
              <View style={styles.timerBox}><Text style={styles.timerNum}>{format(seconds)}</Text></View>
              <Text style={styles.timerLabel}>Giây</Text>
            </View>
          </View>
        </View>
      </View>

      {/* KHỐI DƯỚI: ACTIONS (Nút bấm) */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.btnPrimary} 
          activeOpacity={0.8}
          onPress={() => router.replace('/KichHoatTrangBi')}
        >
          <View style={styles.btnContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={18} color="#FFF" />
            </View>
            <Text style={styles.btnText}>Nhận nhiệm vụ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnCancel} 
          activeOpacity={0.8} 
          onPress={() => {
            router.back();
            activateEmergencyClock();
          }}
        >
          <View style={styles.btnContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="close" size={16} color="#FFF" />
            </View>
            <Text style={styles.btnText}>Huỷ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RESCUE_BACKGROUND,
  },
  topSection: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    color: '#000',
  },
  mapWrapper: {
    width: '90%',
    height: '65%',
    borderRadius: 20,
    overflow: 'hidden',
    // ✅ ĐỔ BÓNG 25% CHUẨN SẾP
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mapImage: { width: '100%', height: '100%' },

  middleSection: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  missionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  descText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  timerSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  timerHeader: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 15,
  },
  timerGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  timerUnit: { alignItems: 'center' },
  timerBox: {
    width: 85,
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // ✅ ĐỔ BÓNG 25%
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  timerNum: { fontSize: 24, fontWeight: '800', color: '#E04140' },
  timerLabel: { marginTop: 8, fontSize: 14, fontWeight: '700', color: '#666' },

  bottomSection: {
    flex: 2.5,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnPrimary: {
    height: 60,
    backgroundColor: '#16A34A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancel: {
    height: 55,
    backgroundColor: '#374151',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});