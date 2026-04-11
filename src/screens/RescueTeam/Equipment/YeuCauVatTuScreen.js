import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import các hằng số và component dùng chung
import { COLORS } from '../../../constants/colors'; 
import RescueHeader from '../../../components/RescueHeader'; 

export default function YeuCauVatTuScreen() {
  const router = useRouter();

  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [activeTab, setActiveTab] = useState('new'); 
  const [note, setNote] = useState('');

  // Dữ liệu vật tư (Dùng state để có thể tăng giảm số lượng)
  const [medicalSupplies, setMedicalSupplies] = useState([
    { id: 'm1', name: 'Băng gạc vô trùng', quantity: 2, selected: false },
    { id: 'm2', name: 'Thuốc giảm đau', quantity: 3, selected: false },
  ]);

  const [protectiveGear, setProtectiveGear] = useState([
    { id: 'p1', name: 'Mũ bảo hộ', quantity: 0, selected: false },
    { id: 'p2', name: 'Găng tay cách điện', quantity: 0, selected: false },
  ]);

  // --- HÀM XỬ LÝ (LOGIC) ---
  const updateQuantity = (category, id, delta) => {
    const updateFn = (list) => list.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    if (category === 'medical') setMedicalSupplies(updateFn);
    else setProtectiveGear(updateFn);
  };

  // --- COMPONENT CON (RENDER ITEM) ---
  const SupplyItem = ({ item, category }) => (
    <View style={styles.itemRow}>
      <TouchableOpacity style={styles.itemLeft} activeOpacity={0.7}>
        <Ionicons
          name={item.selected ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={item.selected ? COLORS.RESCUE_ORANGE : "#000"}
        />
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>

      {(item.quantity > 0 || category === 'medical') && (
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => updateQuantity(category, item.id, -1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(category, item.id, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // --- GIAO DIỆN CHÍNH ---
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 1. SỬ DỤNG HEADER DÙNG CHUNG */}
        <RescueHeader 
          title="Yêu cầu vật tư" 
          onRightPress={() => console.log("Thêm mới")} 
          rightIcon="add"
        />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 2. TAB SELECTOR */}
          <View style={styles.tabContainer}>
            <TabButton 
              label="Tạo yêu cầu mới" 
              isActive={activeTab === 'new'} 
              onPress={() => setActiveTab('new')} 
            />
            <TabButton 
              label="Lịch sử yêu cầu" 
              isActive={activeTab === 'history'} 
              onPress={() => setActiveTab('history')} 
            />
          </View>

          {/* 3. THANH TÌM KIẾM */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm vật tư hoặc trang bị"
              placeholderTextColor="#999"
            />
          </View>

          {/* 4. VẬT TƯ Y TẾ */}
          <SectionHeader title="Vật tư Y tế" />
          {medicalSupplies.map(item => <SupplyItem key={item.id} item={item} category="medical" />)}

          {/* 5. TRANG BỊ BẢO HỘ */}
          <SectionHeader title="Trang bị bảo hộ" style={{ marginTop: 24 }} />
          {protectiveGear.map(item => <SupplyItem key={item.id} item={item} category="protective" />)}

          {/* 6. GHI CHÚ */}
          <Text style={styles.noteLabel}>Ghi chú / yêu cầu khác</Text>
          <TextInput
            style={styles.noteInput}
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
            textAlignVertical="top"
          />

          {/* 7. NÚT GỬI */}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Gửi yêu cầu</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- CÁC COMPONENT GIAO DIỆN NHỎ (HELPER) ---
const TabButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity style={[styles.tabButton, isActive && styles.tabActive]} onPress={onPress}>
    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const SectionHeader = ({ title, style }) => (
  <View style={[styles.sectionHeader, style]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity><Text style={styles.seeAllText}>Xem tất cả</Text></TouchableOpacity>
  </View>
);

// ==========================================
// 🎨 TẤT CẢ STYLE ĐÃ ĐƯỢC ĐẨY XUỐNG DƯỚI
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Có thể thay bằng COLORS.RESCUE_BACKGROUND
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Chừa chỗ cho thanh Bottom Tab
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6F7F8',
    borderRadius: 12,
    padding: 4,
    marginTop: 16,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#F6F7F8',
    borderColor: '#000000',
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#000',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },

  // List Item
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
    color: '#000',
    marginLeft: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 20,
    color: '#000',
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },

  // Notes
  noteLabel: {
    fontSize: 16,
    color: '#000',
    marginTop: 24,
    marginBottom: 12,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 120,
    padding: 12,
    fontSize: 15,
    color: '#000',
    marginBottom: 24,
    backgroundColor: '#FFF',
  },

  // Button Submit
  submitButton: {
    backgroundColor: COLORS.RESCUE_ORANGE,
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFF', // Hoặc #000 tùy thiết kế của bạn
    fontSize: 16,
    fontWeight: '700',
  },
});