// src/screens/RescueTeam/Dashboard/ChiTietThongBaoScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Import các hằng số và icon
import { COLORS } from '../../../constants/colors'; 
import RescueHeader from '../../../components/RescueHeader'; 

const Vector19 = require('../../../../assets/icons/Vector19.png');

export default function ChiTietThongBaoScreen() {
  const router = useRouter();

  // Dữ liệu nội dung khớp 100% với ảnh mockup
  const notificationContent = {
    title: "Nhiệm vụ mới: Sơ tán khẩn cấp",
    receivedTime: "Nhận lúc: 10:30 - 19/11/2025",
    mainText: "Yêu cầu sơ tán khẩn cấp toàn bộ người dân tại khu vực ven sông X, phường Y do có nguy cơ sạt lở đất nghiêm trọng sau trận mưa lớn kéo dài.",
    details: [
      { label: "Mức độ", value: "Khẩn cấp" },
      { label: "Số lượng người dự kiến", value: "50 hộ dân" },
      { label: "Khu vực tập kết an toàn", value: "Nhà văn hóa trung tâm" },
      { label: "Thời hạn hoàn thành", value: "Trước 15:00 hôm nay" },
    ],
    footerText: "Tất cả các đội cứu hộ trong khu vực được huy động tối đa. Đội trưởng vui lòng xác nhận và phân công nhiệm vụ ngay lập tức."
  };

  return (
    <View style={styles.container} edges={['top']}>
      {/* 1. HEADER CÓ NÚT BACK */}
      <RescueHeader 
        title="Chi tiết thông báo" 
        borderBottomWidth={1}
        borderBottomColor="#F0F0F0"
        onBackPress={() => router.back()} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. TIÊU ĐỀ VÀ ICON */}
        <View style={styles.headerSection}>
          <View style={styles.iconBackground}>
            <Image source={Vector19} style={styles.statusIcon} resizeMode="contain" />
          </View>
          <Text style={styles.titleText}>{notificationContent.title}</Text>
        </View>

        <Text style={styles.timeText}>{notificationContent.receivedTime}</Text>
        
        <View style={styles.divider} />

        {/* 3. NỘI DUNG CHI TIẾT */}
        <View style={styles.bodySection}>
          <Text style={styles.mainDescription}>{notificationContent.mainText}</Text>
          
          <View style={styles.detailsList}>
            {notificationContent.details.map((item, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>• </Text>
                <Text style={styles.detailItem}>
                  <Text style={styles.boldLabel}>{item.label}: </Text>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.footerDescription}>{notificationContent.footerText}</Text>
        </View>

        {/* 4. HỆ THỐNG NÚT BẤM DƯỚI CÙNG */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Xem nhiệm vụ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Đánh dấu đã đọc</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

// ==========================================
// 🎨 STYLE CHUẨN MOCKUP - FONT MẶC ĐỊNH
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  
  // Header Section
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0BDB431A', // Xanh lá cực nhạt
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statusIcon: {
    width: 35,
    height: 35,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    lineHeight: 28,
  },
  timeText: {
    fontSize: 14,
    color: '#6b6b6b', // Màu mờ mờ như trong ảnh
    marginLeft: 76, // Căn thẳng hàng với title (60 icon + 16 margin)
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#000', // Đường kẻ ngang đen mảnh
    marginBottom: 24,
  },

  // Body Content
  bodySection: {
    marginBottom: 40,
  },
  mainDescription: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
    marginBottom: 16,
  },
  detailsList: {
    marginBottom: 16,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  detailItem: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  boldLabel: {
    fontWeight: '800',
  },
  footerDescription: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },

  // Buttons
  buttonGroup: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#F27A3A', // Cam đặc trưng của sếp
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#262626', // Đen/Xám đậm
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});