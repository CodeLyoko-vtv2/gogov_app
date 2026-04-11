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

// Import Header và hằng số
import RescueHeader from '../../../components/RescueHeader';
import { COLORS } from '../../../constants/colors';

// Import dàn icon "vũ khí"
const Vector25 = require('../../../../assets/icons/Vector25.png'); // Map view
const Vector27 = require('../../../../assets/icons/Vector27.png'); // Pin cam
const Vector28 = require('../../../../assets/icons/Vector28.png'); // Mũi tên hướng
const Vector29 = require('../../../../assets/icons/Vector29.png'); // Biển rẽ phải
const Vector22 = require('../../../../assets/icons/Vector22.png'); // Pin đen nhỏ
const Group6 = require('../../../../assets/icons/Group 6.png');    // Tâm ngắm
const UserPulse = require('../../../../assets/icons/Group 483774.png'); // Điểm "Bạn"

export default function BanDoNhiemVuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* 1. HEADER CHUẨN */}
      <RescueHeader title="Bản đồ nhiệm vụ" borderBottomWidth={1} />

      {/* 2. KHU VỰC BẢN ĐỒ (LỚP NỀN) */}
      <View style={styles.mapProvider}>
        
        {/* Nút Phóng to/Thu nhỏ (Làm nhỏ lại cho tinh tế) */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBtn, { marginTop: 2 }]}>
            <Ionicons name="remove" size={20} color="#FFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.controlBtn, { marginTop: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000' }]}>
            <Image source={Group6} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>

        {/* Biểu tượng Map View ở trung tâm (Làm nhỏ và mờ đi một chút) */}
        <View style={styles.centerIndicator}>
          <Image source={Vector25} style={styles.mapFoldIcon} />
          <Text style={styles.mapViewText}>Map View</Text>
        </View>

        {/* CÁC ĐIỂM ĐỊNH VỊ (ĐÃ LÀM NHỎ VÀ DỊCH LÊN TRÊN) */}
        {/* Điểm sự cố 1 - Đẩy cao lên 20% */}
        <Image source={Vector27} style={[styles.markerPin, { top: '20%', left: '25%' }]} />
        
        {/* Điểm sự cố 2 - Đẩy lên 40% */}
        <Image source={Vector27} style={[styles.markerPin, { top: '40%', left: '65%' }]} />

        {/* Vị trí của BẠN - Đẩy lên 50% để tránh Card che */}
        <View style={[styles.userMarker, { top: '50%', left: '40%' }]}>
          <Image source={UserPulse} style={styles.pulseIcon} />
          <Text style={styles.userLabel}>Bạn</Text>
        </View>

        {/* 3. THẺ THÔNG TIN NHIỆM VỤ (GIỮ NGUYÊN ĐỂ DỄ THAO TÁC) */}
        <View style={styles.infoOverlay}>
          <View style={styles.missionCard}>
            
            <View style={styles.cardHeader}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Cao</Text>
              </View>
              <View style={styles.distanceRow}>
                <Image source={Vector28} style={styles.arrowIcon} />
                <Text style={styles.distanceText}>2.5 km</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>Tai nạn giao thông</Text>

            <View style={styles.locationRow}>
              <Image source={Vector22} style={styles.pinSmall} />
              <Text style={styles.locationDetail}>
                Ngã tư Nam Kỳ Khởi Nghĩa, Ngũ Hành Sơn, Đà Nẵng
              </Text>
            </View>

            <View style={styles.cardDivider} />

            <TouchableOpacity style={styles.navButton} activeOpacity={0.8}>
              <Image source={Vector29} style={styles.turnIcon} />
              <Text style={styles.navButtonText}>Chỉ đường</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  mapProvider: { flex: 1, backgroundColor: '#F9F9F9', position: 'relative' },

  // Map Controls (FABs)
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
  },
  controlBtn: {
    width: 36, // Giảm từ 44 xuống 36
    height: 36,
    backgroundColor: '#000',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Center Placeholder
  centerIndicator: {
    position: 'absolute',
    top: '30%', // Đẩy lên từ 40%
    left: '50%',
    marginLeft: -40,
    alignItems: 'center',
  },
  mapFoldIcon: { width: 35, height: 35, tintColor: '#D1D1D1' },
  mapViewText: { fontSize: 16, fontWeight: '800', marginTop: 8, color: '#D1D1D1' },

  // --- TINH CHỈNH MARKERS NHỎ GỌN ---
  markerPin: { 
    position: 'absolute', 
    width: 24, // Giảm từ 32 xuống 24
    height: 30 
  },
  userMarker: { 
    position: 'absolute', 
    alignItems: 'center' 
  },
  pulseIcon: { 
    width: 32, // Giảm từ 44 xuống 32
    height: 32 
  },
  userLabel: { 
    fontSize: 12, // Giảm từ 14 xuống 12
    fontWeight: '800', 
    marginTop: 2,
    color: '#000'
  },

  // Info Card Overlay
  infoOverlay: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  missionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderLeftWidth: 8,
    borderLeftColor: '#F27A3A',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#FFE5D4',
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 15,
  },
  levelText: { color: '#F27A3A', fontWeight: '800', fontSize: 15 },
  distanceRow: { flexDirection: 'row', alignItems: 'center' },
  arrowIcon: { width: 20, height: 20, marginRight: 6 },
  distanceText: { fontSize: 16, fontWeight: '700' },
  
  cardTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  pinSmall: { width: 18, height: 23, marginRight: 8, marginTop: 2 },
  locationDetail: { flex: 1, fontSize: 14, color: '#000', fontWeight: '500', lineHeight: 20 },
  
  cardDivider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 12 },
  
  navButton: {
    backgroundColor: '#F27A3A',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  turnIcon: { width: 24, height: 24, marginRight: 8 },
  navButtonText: { fontSize: 18, fontWeight: '800', color: '#000' },
});