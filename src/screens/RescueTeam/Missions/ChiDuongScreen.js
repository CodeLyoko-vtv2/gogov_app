//src/screens/RescueTeam/Missions/ChiDuongScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/src/constants/colors';

// --- ASSETS SẾP GỬI ---
const MapViewIcon = require('../../../../assets/icons/Vector41.png'); // Biểu tượng bản đồ phẳng
const TargetIcon = require('../../../../assets/icons/Vector40.png'); // Tâm ngắm định vị
const TurnLeftIcon = require('../../../../assets/icons/Up Left.png'); // Mũi tên rẽ trái

const { width, height } = Dimensions.get('window');

export default function ChiDuongScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 1. KHỐI CHỈ HƯỚNG TRÊN CÙNG (INSTRUCTION) */}
      <View style={styles.topInstruction}>
        <Image source={TurnLeftIcon} style={styles.turnIcon} resizeMode="contain" />
        <View style={styles.instructionTextContainer}>
          <Text style={styles.distanceText}>150m</Text>
          <Text style={styles.streetText}>Rẽ trái vào đường Trần Đại Nghĩa</Text>
        </View>
      </View>

      {/* 2. KHU VỰC BẢN ĐỒ (MAP VIEW PLACEHOLDER) */}
      <View style={styles.mapPlaceholder}>
        <Image source={MapViewIcon} style={[styles.mapCenterIcon]} resizeMode="contain" />
        <Text style={styles.mapViewLabel}>Map View</Text>
      </View>

      {/* 3. CÁC NÚT ĐIỀU KHIỂN BẢN ĐỒ (BÊN PHẢI) */}
      <View style={styles.mapControls}>
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.controlDivider} />
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="remove" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={[styles.controlBtn, styles.targetBtn]}>
          <Image source={TargetIcon} style={styles.targetIconImg} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* 4. NÚT TRẠNG THÁI "ĐÃ TỚI" */}
      <TouchableOpacity style={styles.arrivedBtn} activeOpacity={0.8} onPress={() => router.push('/HienTruong')}>
        <Text style={styles.arrivedText}>Đã tới</Text>
      </TouchableOpacity>

      {/* 5. BẢNG THÔNG TIN LỘ TRÌNH (BOTTOM SHEET STYLE) */}
      <View style={styles.bottomSheet}>
        <View style={styles.infoRow}>
          <Text style={styles.timeRemaining}>5 phút</Text>
          <Text style={styles.totalDistance}>(2km)</Text>
        </View>
        <Text style={styles.etaText}>Đến nơi lúc 20:55 - Giao thông thông thoáng</Text>
        
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.finishBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.finishBtnText}>Kết thúc</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.openMapsBtn}>
            <Text style={styles.openMapsText}>Mở trong MAPS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RESCUE_BACKGROUND,
  },
  // Top Instruction Box
  topInstruction: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#8E9DA5',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  turnIcon: {
    width: 45,
    height: 45,
    tintColor: '#FFF',
  },
  instructionTextContainer: {
    marginLeft: 20,
    rowGap: 5,
  },
  distanceText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
  },
  streetText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },

  // Map Area
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCenterIcon: {
    width: 60,
    height: 60,
    opacity: 0.8,
    tintColor: '#000000',
  },
  mapViewLabel: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  // Map Controls (Right side)
  mapControls: {
    position: 'absolute',
    right: 20,
    top: height * 0.5,
    alignItems: 'center',
  },
  zoomControls: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  controlBtn: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  controlDivider: {
    height: 1,
    backgroundColor: '#EEE',
    width: '80%',
    alignSelf: 'center',
  },
  targetBtn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  targetIconImg: {
    width: 24,
    height: 24,
  },

  // Arrived Button
  arrivedBtn: {
    position: 'absolute',
    bottom: 220,
    alignSelf: 'center',
    backgroundColor: '#27AE60',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 15,
  },
  arrivedText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },

  // Bottom Info Sheet
  bottomSheet: {
    backgroundColor: '#2C3E50',
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeRemaining: {
    fontSize: 32,
    fontWeight: '800',
    color: '#E67E22',
  },
  totalDistance: {
    fontSize: 18,
    color: '#BDC3C7',
    marginLeft: 10,
  },
  etaText: {
    color: '#FFF',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 25,
    fontWeight: '300',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finishBtn: {
    backgroundColor: '#E67E22',
    flex: 0.48,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  finishBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  openMapsBtn: {
    backgroundColor: '#34495E',
    flex: 0.48,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  openMapsText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
});