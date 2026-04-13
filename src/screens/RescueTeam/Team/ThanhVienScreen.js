import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal, // ✅ Thêm Modal theo yêu cầu
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import các thành phần "vốn liếng" đã có
import RescueHeader from '../../../components/RescueHeader';
import { COLORS } from '@/src/constants/colors';

// --- ASSETS NHÂN SỰ ---
const AvaCaptain = require('../../../../assets/images/Mask group.png');
const Ava1 = require('../../../../assets/images/Mask group1.png');
const Ava2 = require('../../../../assets/images/Mask group2.png');
const Ava3 = require('../../../../assets/images/Mask group3.png');
const Ava4 = require('../../../../assets/images/Mask group4.png');

export default function ThanhVienScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // ✅ STATE QUẢN LÝ MODAL (Mới thêm)
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Danh sách quân số đầy đủ
  const fullMembers = [
    { id: '1', name: 'Đoàn Quốc Huy', img: AvaCaptain, role: 'ĐỘI TRƯỞNG', status: 'Sẵn sàng' },
    { id: '2', name: 'Gia Bảo', img: Ava1, role: 'Hậu cần', status: 'Đang làm nhiệm vụ' },
    { id: '3', name: 'Hữu Lộc', img: Ava2, role: 'Kỹ thuật', status: 'Sẵn sàng' },
    { id: '4', name: 'Đình Tùng', img: Ava4, role: 'Cứu nạn', status: 'Nghỉ phép' },
    { id: '5', name: 'Anh Huy', img: Ava3, role: 'Y tế', status: 'Sẵn sàng' },
  ];

  const renderMemberItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.memberCard} 
      activeOpacity={0.8}
      onPress={() => console.log("Xem hồ sơ chiến sĩ:", item.name)}
    >
      {/* Avatar tròn xịn */}
      <Image source={item.img} style={styles.avatar} />
      
      {/* Thông tin chi tiết */}
      <View style={styles.infoContainer}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
        
        {/* Badge trạng thái tác chiến */}
        <View style={styles.statusRow}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: item.status === 'Sẵn sàng' ? '#4CAF50' : item.status === 'Nghỉ phép' ? '#999' : '#F27A3A' }
          ]} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* Nút thao tác nhanh */}
      <Ionicons name="ellipsis-vertical" size={20} color="#000000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 1. HEADER CHUẨN FIGMA */}
      <RescueHeader title="Quản Lý Đội" onBackPress={() => router.back()} borderBottomWidth={1} borderBottomColor={'#030303'} />

      {/* 2. THANH TÌM KIẾM CHIẾN SĨ */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Tìm kiếm thành viên..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* 3. DANH SÁCH QUÂN SỐ */}
      <FlatList
        data={fullMembers}
        keyExtractor={(item) => item.id}
        renderItem={renderMemberItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* 4. NÚT THÊM THÀNH VIÊN MỚI (FLOAT) - Đã gắn mở Modal */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.9}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="person-add" size={24} color="#000" />
      </TouchableOpacity>

      {/* 🔥 MODAL HƯỚNG DẪN THÊM THÀNH VIÊN (Mới ghép) */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>Hướng dẫn thêm quân</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={styles.stepList}>
              <StepItem 
                icon="qrcode-scan" 
                text="Quét mã định danh của chiến sĩ mới" 
              />
              <StepItem 
                icon="account-check" 
                text="Xác nhận thông tin và chứng chỉ cứu hộ" 
              />
              <StepItem 
                icon="shield-star" 
                text="Phân quyền (Đội phó, Y tế, Hậu cần...)" 
              />
            </View>

            <TouchableOpacity 
              style={styles.confirmBtn}
              onPress={() => {
                setIsModalVisible(false);
                console.log("Tiến hành quét QR...");
              }}
            >
              <Text style={styles.confirmBtnText}>TÔI ĐÃ HIỂU</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Sub-component cho từng bước hướng dẫn
const StepItem = ({ icon, text }) => (
  <View style={styles.stepContainer}>
    <View style={styles.stepIconBox}>
      <MaterialCommunityIcons name={icon} size={24} color="#F27A3A" />
    </View>
    <Text style={styles.stepText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.RESCUE_BACKGROUND },
  
  // Search (GIỮ NGUYÊN GỐC)
  searchSection: { paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000000',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: '500' },

  // List (GIỮ NGUYÊN GỐC)
  listContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15, resizeMode: 'cover' },
  infoContainer: { flex: 1, justifyContent: 'center', rowGap: 4 },
  memberName: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 2 },
  memberRole: { fontSize: 14, color: '#888', fontWeight: '600', marginBottom: 5 },
  
  // Status (GIỮ NGUYÊN GỐC)
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 12, fontWeight: '700', color: '#666' },

  // Floating Action Button (GIỮ NGUYÊN GỐC - Hình vuông bo góc 10)
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#F27A3A',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  // ✅ CÁC STYLE MỚI CHO MODAL (NỐI TIẾP VÀO ĐUÔI)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideCard: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  guideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  guideTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
  },
  stepList: {
    gap: 20,
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  stepIconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
  },
  confirmBtn: {
    backgroundColor: '#16A34A',
    height: 55,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 4,
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  }
});