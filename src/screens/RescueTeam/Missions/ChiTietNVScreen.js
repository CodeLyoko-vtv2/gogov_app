// src/screens/RescueTeam/Missions/ChiTietNVScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Import Header dùng chung
import RescueHeader from '../../../components/RescueHeader';

// Import dàn "vũ khí" sếp gửi
const MapBackground = require('../../../../assets/images/Rectangle 4906.png');
const VictimIcon = require('../../../../assets/icons/Vector35.png'); // Icon nhóm người
const StatusIcon = require('../../../../assets/icons/Vector36.png'); // Icon vali/túi đồ

export default function ChiTietNVScreen() {
  const router = useRouter();

  return (
    <View style={styles.container} edges={['top']}>
      {/* 1. HEADER CHUẨN FIGMA */}
      <RescueHeader 
        title="MB-11523" 
        onBackPress={() => router.back()} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. KHU VỰC BẢN ĐỒ (Dạng Bo góc) */}
        <View style={styles.mapContainer}>
          <Image source={MapBackground} style={styles.mapImage} resizeMode="cover" />
        </View>

        {/* 3. THÔNG TIN CHÍNH CỦA NHIỆM VỤ */}
        <View style={styles.missionMainCard}>
          <Text style={styles.missionTitle}>Rò rỉ phóng xạ</Text>
          <Text style={styles.priorityText}>Mức độ ưu tiên: Cao</Text>
          <Text style={styles.timeText}>Thời gian nhận tin báo: 9:55 - 4/3/2026</Text>
        </View>

        {/* 4. THÔNG TIN NẠN NHÂN */}
        <Text style={styles.sectionHeader}>Thông tin nạn nhân</Text>
        <View style={styles.infoGroupCard}>
          {/* Dòng 1: Số lượng */}
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Image source={VictimIcon} style={styles.iconInside} resizeMode="contain" />
            </View>
            <Text style={styles.infoLabel}>Số lượng ước tính</Text>
            <Text style={styles.infoValue}>20 người</Text>
          </View>

          <View style={styles.divider} />

          {/* Dòng 2: Tình trạng */}
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Image source={StatusIcon} style={styles.iconInside} resizeMode="contain" />
            </View>
            <Text style={styles.infoLabel}>Tình trạng sơ bộ</Text>
            <Text style={styles.infoValueGrey}>Chưa xác định</Text>
          </View>
        </View>

        {/* 5. MÔ TẢ CHI TIẾT */}
        <Text style={styles.sectionHeader}>Mô tả chi tiết</Text>
        <View style={styles.descriptionCard}>
          <Text style={styles.quoteText}>
            “nổ lò phản ứng số 4 ngày phát tán lượng lớn chất phóng xạ ra môi trường”
          </Text>
          <Text style={styles.reporterInfo}>
            Người báo tin: Nguyễn Văn A - 0123456789
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

// ==========================================
// 🎨 STYLE CHUẨN FIGMA - ĐỔ BÓNG 25%
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  // Map
  mapContainer: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 25,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },

  // Mission Main Card
  missionMainCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    // --- ĐỔ BÓNG X0 Y4 Blur4 25% ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  priorityText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B6B', // Màu đỏ/hồng ưu tiên
    marginBottom: 10,
  },
  timeText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },

  // Section Headers
  sectionHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    marginBottom: 15,
  },

  // Info Group Card (Victims)
  infoGroupCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    // --- ĐỔ BÓNG X0 Y4 Blur4 25% ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#332D26', // Màu nâu đen lì của sếp
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconInside: {
    width: 24,
    height: 24,
    tintColor: '#FFF', // Ép icon Vector35, 36 sang trắng
  },
  infoLabel: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  infoValueGrey: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },

  // Description Card
  descriptionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    // --- ĐỔ BÓNG X0 Y4 Blur4 25% ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  quoteText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  reporterInfo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    textAlign: 'right', // Căn phải như trong mockup
  },
});