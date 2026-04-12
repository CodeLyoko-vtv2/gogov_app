import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import Header dùng chung
import RescueHeader from '../../../components/RescueHeader';
import { COLORS } from '@/src/constants/colors';

// --- CẤU HÌNH CAROUSEL CHIẾN THUẬT ---
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_WIDTH = 120; 
const CARD_HEIGHT = 160; 
const SPACING_HORIZONTAL = 15; 
const ITEM_WIDTH = CARD_WIDTH + SPACING_HORIZONTAL * 2; 
const EMPTY_ITEM_SIZE = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

// --- ASSETS ---
const TeamLogo = require('../../../../assets/images/Ellipse 15.png');
const AvaCaptain = require('../../../../assets/images/Mask group.png');
const Ava1 = require('../../../../assets/images/Mask group1.png');
const Ava2 = require('../../../../assets/images/Mask group2.png');
const Ava3 = require('../../../../assets/images/Mask group3.png');
const Ava4 = require('../../../../assets/images/Mask group4.png');

const CarImg = require('../../../../assets/images/Rectangle 54.png');
const BoatImg = require('../../../../assets/images/Rectangle 55.png');
const MedImg = require('../../../../assets/images/Rectangle 56.png');
const RadioImg = require('../../../../assets/images/Rectangle 57.png');

export default function ThongTinDoiScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeRole, setActiveRole] = useState('ĐỘI TRƯỞNG');

  const membersData = [
    { id: 'spacer-left' },
    { id: '1', name: 'Đình Tùng', img: Ava4, role: 'Cứu nạn' },
    { id: '2', name: 'Gia Bảo', img: Ava1, role: 'Hậu cần' },
    { id: '3', name: 'Đội trưởng', img: AvaCaptain, role: 'Đội trưởng' },
    { id: '4', name: 'Hữu lộc', img: Ava2, role: 'Kỹ thuật' },
    { id: '5', name: 'Huy', img: Ava3, role: 'Y tế' },
    { id: 'spacer-right' },
  ];

  const equipment = [
    { id: '1', name: 'Xe cứu thương', qty: 'Số lượng: 2', img: CarImg },
    { id: '2', name: 'Thuyền', qty: 'Số lượng: 1', img: BoatImg },
    { id: '3', name: 'Dụng cụ y tế', qty: 'Số lượng: 1', img: MedImg },
    { id: '4', name: 'Bộ đàm', qty: 'Số lượng: 1', img: RadioImg },
  ];

  const renderMember = ({ item, index }) => {
    if (!item.img) return <View style={{ width: EMPTY_ITEM_SIZE }} />;

    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1.1, 0.85],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ width: ITEM_WIDTH, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={[styles.memberCard, { transform: [{ scale }], opacity }]}>
          <Image source={item.img} style={styles.memberImg} />
          <Text style={styles.memberSubName} numberOfLines={1}>{item.name}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. HEADER - VIEW THUẦN TÚY */}
      <RescueHeader title="Thông Tin Đội" onBackPress={() => router.back()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. PROFILE SECTION */}
        <View style={styles.profileSection}>
          <View style={styles.logoContainer}>
            <Image source={TeamLogo} style={styles.teamLogo} />
          </View>
          <Text style={styles.teamName}>Chiến đội cứu hộ</Text>
          <Text style={styles.memberCount}>10 thành viên</Text>
        </View>

        {/* 3. CONTACT INFO CARD */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          <Text style={styles.subTitle}>Thông tin để liên lạc khẩn cấp và điều phối</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={22} color="#F27A3A" />
              <Text style={styles.contactText}>0123 456 789</Text>
              <Text style={styles.callLabel}>Gọi</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="mail-outline" size={22} color="#F27A3A" />
              <Text style={styles.contactText}>abc@gmail.com</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="location-outline" size={22} color="#F27A3A" />
              <Text style={styles.contactText}>123 Trần Hưng Đạo, Ngũ Hành Sơn, Đà Nẵng</Text>
            </View>
          </View>
        </View>

        {/* 4. MEMBERS CAROUSEL */}
        <View style={styles.memberSectionCustom}>
          <View style={styles.rowHeader}>
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Thành viên</Text>
            <TouchableOpacity onPress={() => router.push('/ThanhVien')}><Text style={styles.viewAll}>Xem tất cả</Text></TouchableOpacity>
          </View>

          <View style={styles.carouselWrapper}>
            <Animated.FlatList
              data={membersData}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderMember}
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { 
                  useNativeDriver: true,
                  listener: (event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
                    if (membersData[index + 1]?.role) {
                      setActiveRole(membersData[index + 1].role);
                    }
                  }
                }
              )}
              scrollEventThrottle={16}
            />
          </View>
        </View>

        {/* 5. EQUIPMENT SECTION */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Trang thiết bị & Phương tiện</Text>
          <View style={styles.equipmentGrid}>
            {equipment.map((e) => (
              <View key={e.id} style={styles.equipmentItem}>
                <View style={styles.imageBox}>
                  <Image source={e.img} style={styles.equipImage} resizeMode="cover" />
                </View>
                <Text style={styles.equipName}>{e.name}</Text>
                <Text style={styles.equipQty}>{e.qty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 6. STATS SECTION */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Lịch sử nhiệm vụ</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>Nhiệm vụ hoàn thành</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>256</Text>
              <Text style={styles.statLabel}>Người đã cứu hộ</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.historyBtn} activeOpacity={0.8}>
            <Text style={styles.historyBtnText}>Xem chi tiết lịch sử</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.RESCUE_BACKGROUND },
  scrollContent: { paddingBottom: 100 },
  
  profileSection: { alignItems: 'center', marginTop: 50, marginBottom: 30 },
  logoContainer: { 
    width: 180, height: 180, borderRadius: 100, 
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10,
    backgroundColor: '#000', overflow: 'hidden', borderWidth: 3, borderColor: '#FFF'
  },
  teamLogo: { width: '100%', height: '100%' },
  teamName: { fontSize: 24, fontWeight: '800', marginTop: 15, color: '#000' },
  memberCount: { fontSize: 16, color: '#666', fontWeight: '500' },

  sectionWrapper: { paddingHorizontal: 20, marginBottom: 25 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#000', marginBottom: 12 },
  subTitle: { fontSize: 13, color: '#888', marginBottom: 15 },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 20 },
  viewAll: { color: '#F27A3A', fontWeight: '600', fontSize: 13 },

  memberSectionCustom: { marginBottom: 30, paddingHorizontal: 0 },
  carouselWrapper: { height: 200, alignItems: 'center', justifyContent: 'center' },
  memberCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#ffffff00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  memberImg: { width: '100%', height: '88%', resizeMode: 'cover' },
  memberSubName: { fontSize: 11, color: '#333', marginTop: 4, fontWeight: '700', paddingHorizontal: 4 },

  contactCard: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5
  },
  contactRow: { flexDirection: 'row', alignItems: 'center' },
  contactText: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '500' },
  callLabel: { color: '#F27A3A', fontWeight: '700', fontSize: 14 },

  equipmentGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  equipmentItem: { width: '48%', marginBottom: 15 },
  imageBox: { width: '100%', height: 85, borderRadius: 12, overflow: 'hidden', backgroundColor: '#E0E0E0' },
  equipImage: { width: '100%', height: '100%' },
  equipName: { fontSize: 14, fontWeight: '800', marginTop: 8 },
  equipQty: { fontSize: 11, color: '#666', fontWeight: '500' },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statBox: { width: '48%', backgroundColor: '#332D26', borderRadius: 12, padding: 15, alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: '800', color: '#F27A3A' },
  statLabel: { fontSize: 12, color: '#FFF', textAlign: 'center', marginTop: 5, fontWeight: '600' },
  historyBtn: { backgroundColor: '#F27A3A', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  historyBtnText: { fontSize: 17, fontWeight: '800', color: '#000' },
});