import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Dùng để làm icon "Chưa đọc" cho nổi bật
import { COLORS } from '../../../constants/colors';

const Vector19 = require('../../../../assets/icons/Vector19.png'); // Icon nhiệm vụ
const Vector20 = require('../../../../assets/icons/Vector20.png'); // Icon khiên duyệt

export default function ThongBaoScreen() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread'
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      type: 'mission',
      icon: Vector19,
      iconBackgroundColor: '#0BDB431A',
      title: 'Nhiệm vụ mới: Sơ tán khẩn cấp',
      time: '2 phút trước',
      content: 'Yêu cầu sơ tán người dân ven khu vực bờ sông có nguy cơ sạt lở',
      level: 'Khẩn cấp',
      route: '/ChiTietThongBao',
      isRead: false,
    },
    {
      id: 2,
      type: 'request',
      icon: Vector20,
      iconBackgroundColor: '#1C7EFB15',
      title: 'Yêu cầu hỗ trợ đã được duyệt',
      time: '15 phút trước',
      content: 'Yêu cầu thêm 2 thuyền cao su đã được phê duyệt. Xin vui lòng nhận tại kho trung tâm',
      isRead: true,
    },
    {
      id: 3,
      type: 'mission',
      icon: Vector19,
      iconBackgroundColor: '#0BDB431A',
      title: 'Cứu hộ: Sập công trình tại Hải Châu',
      time: '45 phút trước',
      content: 'Phát hiện có nạn nhân kẹt trong đống đổ nát tại số 12 đường X.',
      level: 'Cao',
      route: '/ChiTietThongBao',
      isRead: false,
    },
    {
      id: 4,
      type: 'request',
      icon: Vector20,
      iconBackgroundColor: '#1C7EFB15',
      title: 'Cấp phát quân nhu định kỳ',
      time: '2 giờ trước',
      content: 'Lô hàng bộ đàm và đèn pin chuyên dụng mới đã về kho.',
      isRead: true,
    },
    {
      id: 5,
      type: 'mission',
      icon: Vector19,
      iconBackgroundColor: '#0BDB431A',
      title: 'Cảnh báo: Rò rỉ hóa chất',
      time: '3 giờ trước',
      content: 'Phát hiện nồng độ khí lạ tại khu công nghiệp Hòa Khánh.',
      level: 'Khẩn cấp',
      route: '/ChiTietThongBao',
      isRead: false,
    },
  ];

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(item => !item.isRead) 
    : notifications;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>

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

      {/* ✅ Thêm contentContainerStyle để chừa chỗ cho NavBar */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredNotifications.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
                styles.notiItem, 
                item.isRead && styles.readItem // ✅ Làm nhạt màu nếu đã đọc
            ]} 
            onPress={() => item.route && router.push(item.route)}
          >
            
            <View style={styles.iconBoxContainer}>
               <View style={[
                   styles.iconBackground, 
                   { backgroundColor: item.isRead ? item.iconBackgroundColor : '#FFE5E5' } // ✅ Đổi màu nền icon nếu chưa đọc
               ]}>
                    {item.isRead ? (
                        <Image source={item.icon} style={styles.statusIcon} resizeMode="contain" />
                    ) : (
                        <Ionicons name="notifications" size={26} color="#E14343" /> // ✅ Đổi icon nổi bật cho tin chưa đọc
                    )}
               </View>
            </View>

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
  // ✅ Padding dưới cùng để NavBar không che (Point 3)
  scrollContent: {
    paddingBottom: 130, 
  },
  notiItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'flex-start',
  },
  // ✅ Style làm nhạt màu cho tin đã đọc (Point 1)
  readItem: {
    opacity: 0.5,
  },
  iconBoxContainer: {
    marginRight: 16,
    paddingTop: 4,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  statusIcon: {
    width: 28,
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