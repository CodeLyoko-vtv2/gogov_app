import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 1. IMPORT MODAL VỪA TẠO
import RescueOptionModal2 from '../../../components/RescueOptionModal2'; 
import RescueHeader from '../../../components/RescueHeader';
import { COLORS } from '../../../constants/colors';

const ClockIcon = require('../../../../assets/icons/Vector21.png');
const LocationIcon = require('../../../../assets/icons/Vector22.png');

export default function NhiemVuCuaDoiScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Đang thực hiện');
  
  // 2. TẠO STATE ĐỂ QUẢN LÝ ĐÓNG/MỞ MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);

  const tabs = ['Đang thực hiện', 'Sắp tới', 'Đã hoàn thành'];

  const missions = [
    {
      id: 'SH11523',
      category: 'Sinh hóa',
      categoryColor: '#D1E4FF',
      categoryTextColor: '#4D8FFF',
      status: 'Đang diễn ra',
      title: 'Rò rỉ hóa chất',
      location: 'Ngã tư Nam Kỳ Khởi Nghĩa, Ngũ Hành Sơn, Đà Nẵng',
      time: '9:50 - 4/3/2026',
      route: '/ChiTietNV',
    },
    {
      id: 'HH11524',
      category: 'Hoả hoạn',
      categoryColor: '#FFE5E5',
      categoryTextColor: '#FF5252',
      status: 'Đang diễn ra',
      title: 'Cháy chung cư',
      location: 'Cầu rồng, Hải Châu, Đà Nẵng',
      time: '10:06 - 4/3/2026',
      route: '/ChiTietNV',
    },
    {
      id: 'DB11525',
      category: 'Dịch bệnh',
      categoryColor: '#E2F2E9',
      categoryTextColor: '#4CAF50',
      status: 'Đội đã xuất phát',
      title: 'Hỗ trợ vùng dịch',
      location: 'Nhà văn hoá, Ngũ Hành Sơn, Đà Nẵng',
      time: '11:00 - 4/3/2026',
      route: '/ChiTietNV',
    },
  ];

  const renderMissionCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(item.route)}>
      <View style={styles.cardHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: item.categoryColor }]}>
          <Text style={[styles.categoryText, { color: item.categoryTextColor }]}>{item.category}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.missionTitle}>{item.id} - {item.title}</Text>
      
      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Image source={LocationIcon} style={styles.iconSmall} resizeMode="contain" />
        <Text style={styles.infoText}>{item.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Image source={ClockIcon} style={styles.iconSmall} resizeMode="contain" />
        <Text style={styles.infoText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} edges={['top']}>
      {/* 3. GẮN SỰ KIỆN MỞ MODAL VÀO NÚT "ADD" (+) */}
      <RescueHeader 
        title="Nhiệm vụ" 
        rightIcon="add" 
        onRightPress={() => setIsModalVisible(true)} 
      />

      {/* 4. GỌI MODAL COMPONENT */}
      <RescueOptionModal2 
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onOptionPress={(type) => {
          console.log("Giám đốc đã chọn:", type);
          // Xử lý thêm logic tại đây nếu cần
        }}
      />

      {/* THANH TÌM KIẾM */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={22} color="#999" />
          <TextInput 
            placeholder="Tìm kiếm nhiệm vụ" 
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* TABS ĐIỀU HƯỚNG */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={styles.tabItem}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* DANH SÁCH NHIỆM VỤ */}
      <FlatList
        data={missions}
        renderItem={renderMissionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ... Styles giữ nguyên như cũ của sếp ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabItem: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  tabTextActive: {
    color: '#F27A3A',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    width: '100%',
    height: 3,
    backgroundColor: '#F27A3A',
    borderRadius: 2,
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#F6F7F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '800',
  },
  statusBadge: {
    backgroundColor: '#F7B57D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F27A3A',
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconSmall: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});