// src/screens/RescueApp/Missions/NVXuLyScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RescueOptionModal from '../../../components/RescueOptionModal'; 

// Import hằng số và Header
import { COLORS } from '../../../constants/colors';
import RescueHeader from '../../../components/RescueHeader';

// Icons sếp gửi
const ClockIcon = require('../../../../assets/icons/Vector21.png');
const LocationIcon = require('../../../../assets/icons/Vector22.png');

export default function NVXuLyScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // --- 1. CHUYỂN DỮ LIỆU VÀO STATE ĐỂ CÓ THỂ THAY ĐỔI ---
  const [missionList, setMissionList] = useState([
    {
      id: '1',
      level: 'Khẩn cấp',
      levelColor: '#FF5252',
      levelBg: '#FFE5E5',
      title: 'Hoả hoạn chung cư',
      location: 'Số 123, đường XYZ, Ngũ Hành Sơn, Đà Nẵng',
      time: '15 phút trước',
      route: '/BanDoNhiemVu', // Thêm đường dẫn để điều hướng khi chấp nhận
    },
    {
      id: '2',
      level: 'Cao',
      levelColor: '#FB8C00',
      levelBg: '#FFF3E0',
      title: 'Tai nạn giao thông',
      location: 'Ngã tư Nam Kỳ Khởi Nghĩa, Ngũ Hành Sơn, Đà Nẵng',
      time: '5 phút trước',
    },
    {
      id: '3',
      level: 'Trung bình',
      levelColor: '#4CAF50',
      levelBg: '#E8F5E9',
      title: 'Tai nạn giao thông',
      location: 'Cầu Rồng, Hải Châu, Đà Nẵng',
      time: '15 phút trước',
    },
  ]);

  const filters = ['Tất cả', 'Khẩn cấp', 'TNGT', 'Cháy nổ'];

  // --- 2. HÀM XỬ LÝ TỪ CHỐI (XÓA KHỎI DANH SÁCH) ---
  const handleReject = (id) => {
    // Hiển thị thông báo xác nhận nếu muốn (Option)
    Alert.alert(
      "Xác nhận",
      "Bạn muốn từ chối nhiệm vụ này?",
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Từ chối", 
          style: "destructive",
          onPress: () => {
            // Lọc bỏ nhiệm vụ có id được chọn
            const newList = missionList.filter(item => item.id !== id);
            setMissionList(newList);
          }
        }
      ]
    );
  };

  const renderMissionCard = ({ item }) => (
    <View style={[styles.card, { borderLeftColor: item.levelColor }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.levelBadge, { backgroundColor: item.levelBg }]}>
          <Text style={[styles.levelText, { color: item.levelColor }]}>{item.level}</Text>
        </View>
        <View style={styles.timeRow}>
          <Image source={ClockIcon} style={styles.iconSmall} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <Text style={styles.missionTitle}>{item.title}</Text>

      <View style={styles.locationRow}>
        <Image source={LocationIcon} style={styles.iconLocation} />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      <View style={styles.actionRow}>
        {/* --- 3. GẮN HÀM XÓA VÀO NÚT TỪ CHỐI --- */}
        <TouchableOpacity 
          style={styles.rejectBtn} 
          onPress={() => handleReject(item.id)}
        >
          <Text style={styles.rejectBtnText}>Từ chối</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.acceptBtn} onPress={() => router.push(item.route)}>
          <Text style={styles.acceptBtnText}>Chấp nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <RescueHeader
        title="Nhiệm vụ chờ xử lý"
        rightIcon="ellipsis-vertical"
        onRightPress={() => setIsMenuVisible(true)}
        borderBottomWidth={1}
      />
      
      <RescueOptionModal 
        isVisible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)}
        onOptionPress={(type) => {
          if(type === 'refresh') {
            // Logic reset danh sách nếu cần
          }
          setIsMenuVisible(false);
        }}
      />

      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            placeholder="Tìm kiếm theo địa điểm, loại TN,..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive
              ]}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive
              ]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={missionList} // Sử dụng missionList từ state
        renderItem={renderMissionCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // Thêm thông báo khi danh sách trống
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: '#999', fontSize: 16 }}>Hiện không có nhiệm vụ nào.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ... Styles giữ nguyên như bản trước của bạn ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  searchWrapper: { padding: 16, paddingBottom: 0 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  filterWrapper: {
    paddingLeft: 16,
    paddingVertical: 0,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#434343',
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 10,
    marginVertical: 20,
    backgroundColor: '#F5F5F5',
  },
  filterChipActive: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  filterText: { fontSize: 16, fontWeight: '700', color: COLORS.RESCUE_ORANGE },
  filterTextActive: { color: COLORS.RESCUE_ORANGE },
  listContent: { padding: 16, paddingBottom: 100 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    paddingBottom: 7,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderLeftWidth: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  levelText: { fontWeight: '800', fontSize: 15 },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  iconSmall: { width: 18, height: 18, marginRight: 6 },
  timeText: { fontSize: 14, color: '#000', fontWeight: '500' },
  missionTitle: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 10 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconLocation: { width: 20, height: 25, marginRight: 8, marginTop: 2 },
  locationText: { flex: 1, fontSize: 15, color: '#000', lineHeight: 20, fontWeight: '500' },
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  rejectBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rejectBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  acceptBtn: {
    flex: 1.5,
    height: 44,
    backgroundColor: COLORS.RESCUE_ORANGE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
});