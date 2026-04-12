// src/screens/RescueTeam/Dashboard/ThongBaoScreen.js
import React, { useState } from 'react';
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

// Import các hằng số và icon đã cài đặt
import { COLORS } from '../../../constants/colors';

const Vector19 = require('../../../../assets/icons/Vector19.png'); // Icon nhiệm vụ
const Vector20 = require('../../../../assets/icons/Vector20.png'); // Icon khiên duyệt

export default function ThongBaoScreen() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread'
  const router = useRouter();

  // Dữ liệu mẫu khớp với ảnh mockup
  const notifications = [
    {
      id: 1,
      type: 'mission',
      icon: Vector19,
      // Thiết lập màu nền tròn cực nhạt (Green Pale) cho icon
      iconBackgroundColor: '#0BDB431A', // ~10% độ đậm
      title: 'Nhiệm vụ mới: Sơ tán khẩn cấp',
      time: '2 phút trước',
      content: 'Yêu cầu sơ tán người dân ven khu vực bờ sông có nguy cơ sạt lở',
      level: 'Khẩn cấp',
      route: '/ChiTietThongBao', 
    },
    {
      id: 2,
      type: 'request',
      icon: Vector20,
      // Thiết lập màu nền tròn cực nhạt (Blue Pale) cho icon khiên
      iconBackgroundColor: '#1C7EFB15', // ~8% độ đậm
      title: 'Yêu cầu hỗ trợ đã được duyệt',
      time: '15 phút trước',
      content: 'Yêu cầu thêm 2 thuyền cao su đã được phê duyệt. Xin vui lòng nhận tại kho trung tâm',
    },
  ];

  return (
    <View style={styles.container} edges={['top']}>
      {/* 1. HEADER CHUẨN */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>

      {/* 2. TAB SELECTOR */}
      <View style={styles.tabWrapper}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'all' && styles.tabItemActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>Tất cả</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'unread' && styles.tabItemActive]}
          onPress={() => setActiveTab('unread')}
        >
          <Text style={[styles.tabText, activeTab === 'unread' && styles.tabTextActive]}>Chưa đọc</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <TouchableOpacity key={item.id} style={styles.notiItem} onPress={() => router.push(item.route)}>
            
            {/* 3. BOX ICON CĂN GIỮA VÀ CÓ NỀN NHẠT (HÀNG ĐÃ SỬA) */}
            <View style={styles.iconBoxContainer}>
               {/* Cái nền tròn màu nhạt */}
               <View style={[styles.iconBackground, { backgroundColor: item.iconBackgroundColor }]}>
                    <Image source={item.icon} style={styles.statusIcon} resizeMode="contain" />
               </View>
            </View>

            {/* Nội dung bên phải (Giữ nguyên tăm tắp) */}
            <View style={styles.contentContainer}>
              <View style={styles.contentHeader}>
                <Text style={styles.notiTitle}>{item.title}</Text>
                <Text style={styles.notiTime}>{item.time}</Text>
              </View>

              <Text style={styles.notiDesc}>{item.content}</Text>

              <View style={styles.footerRow}>
                {item.level ? (
                  <Text style={styles.levelLabel}>
                    Mức độ: <Text style={styles.levelValue}>{item.level}</Text>
                  </Text>
                ) : <View />}
                
                <TouchableOpacity style={styles.detailBtn}>
                  <Text style={styles.detailBtnText}>Chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ==========================================
// 🎨 STYLE: ICON CĂN GIỮA & NỀN BOX
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingTop: 40, 
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },

  // Tabs
  tabWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 16,
  },
  tabItemActive: {
    backgroundColor: '#F27A3A',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  tabTextActive: {
    color: '#000',
  },

  // Notification Item
  notiItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'flex-start', // Đảm bảo icon nằm trên cùng của nội dung
  },
  
  // --- STYLE MỚI CHO ICON CÓ NỀN NHẠT ---
  iconBoxContainer: {
    marginRight: 16,
    paddingTop: 4, // Căn icon xuống một chút cho cân với ID yêu cầu
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24, // Bo góc cực nhẹ như hình
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8', // Viền cực mảnh cho cái nền thêm tinh tế
  },
  statusIcon: {
    width: 28, // Icon nhỏ hơn so với nền
    height: 28,
  },

  contentContainer: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  notiTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    flex: 1,
    paddingRight: 8,
  },
  notiTime: {
    fontSize: 13,
    color: '#666',
  },
  notiDesc: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 14,
    color: '#333',
  },
  levelValue: {
    color: '#FF0000',
    fontWeight: '700',
  },
  detailBtn: {
    backgroundColor: '#F7B57D',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detailBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F27A3A',
  },
});