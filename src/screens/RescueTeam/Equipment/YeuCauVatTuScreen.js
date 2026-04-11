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
  Image,
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

  const [medicalSupplies, setMedicalSupplies] = useState([
    { id: 'm1', name: 'Băng gạc vô trùng', quantity: 2, selected: false },
    { id: 'm2', name: 'Thuốc giảm đau', quantity: 3, selected: false },
  ]);

  const [protectiveGear, setProtectiveGear] = useState([
    { id: 'p1', name: 'Mũ bảo hộ', quantity: 0, selected: false },
    { id: 'p2', name: 'Găng tay cách điện', quantity: 0, selected: false },
  ]);

  // Dữ liệu mẫu Tab Lịch sử
  const [historyData] = useState([
    { id: 'YC-113', date: '07:00 - 4/3/2026', status: 'Đã duyệt' },
    { id: 'YC-114', date: '10:30 - 11/04/2026', status: 'Đang xử lý' },
  ]);

  // --- HÀM XỬ LÝ (LOGIC) ---
  const toggleSelect = (category, id) => {
    const updateFn = (list) => list.map(item => {
      if (item.id === id) return { ...item, selected: !item.selected };
      return item;
    });
    if (category === 'medical') setMedicalSupplies(updateFn);
    else setProtectiveGear(updateFn);
  };

  const updateQuantity = (category, id, delta) => {
    const updateFn = (list) => list.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    });
    if (category === 'medical') setMedicalSupplies(updateFn);
    else setProtectiveGear(updateFn);
  };

  // --- GIAO DIỆN CHÍNH ---
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <RescueHeader 
          title="Yêu cầu vật tư" 
          onRightPress={() => console.log("Thêm mới")} 
          rightIcon="add"
        />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* TAB SELECTOR */}
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

          {activeTab === 'new' ? (
            // TAB TẠO MỚI (GIỮ NGUYÊN CỦA BẠN)
            <View>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Tìm kiếm vật tư hoặc trang bị"
                  placeholderTextColor="#999"
                />
              </View>

              <SectionHeader title="Vật tư Y tế" />
              {medicalSupplies.map(item => (
                <SupplyItem key={item.id} item={item} category="medical" onUpdate={updateQuantity} onToggle={toggleSelect} />
              ))}

              <SectionHeader title="Trang bị bảo hộ" style={{ marginTop: 24 }} />
              {protectiveGear.map(item => (
                <SupplyItem key={item.id} item={item} category="protective" onUpdate={updateQuantity} onToggle={toggleSelect} />
              ))}

              <Text style={styles.noteLabel}>Ghi chú / yêu cầu khác</Text>
              <TextInput
                style={styles.noteInput}
                multiline
                numberOfLines={4}
                value={note}
                onChangeText={setNote}
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
                <Text style={styles.submitButtonText}>Gửi yêu cầu</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // TAB LỊCH SỬ (CARD YC-113 THẲNG CỘT & CĂN GIỮA ICON)
            <View style={styles.historyContainer}>
              {historyData.map(item => (
                <TouchableOpacity key={item.id} style={styles.ycCard} activeOpacity={0.9}>
                  
                  {/* BOX ICON CĂN GIỮA VÀ CÓ NỀN */}
                  <View style={styles.iconBoxContainer}>
                     <View style={styles.iconBackground}>
                        <Image 
                            source={require('../../../../assets/icons/Group 5.png')} 
                            style={styles.ycTypeIcon} 
                            resizeMode="contain"
                        />
                     </View>
                  </View>

                  {/* CỘT NỘI DUNG BÊN PHẢI (THẲNG HÀNG DỌC) */}
                  <View style={styles.contentColumn}>
                    <View style={styles.idRow}>
                      <Text style={styles.ycIdText}>{item.id}</Text>
                      <View style={[
                        styles.statusTagPurple, 
                        { backgroundColor: item.status === 'Đã duyệt' ? '#D1B2FA' : '#FEF9C3' }
                      ]}>
                        <Text style={styles.statusTextPurple}>{item.status}</Text>
                      </View>
                    </View>

                    <Text style={styles.ycDateText}>{item.date}</Text>

                    <TouchableOpacity style={styles.detailBtn}>
                      <Text style={styles.detailBtnText}>Chi tiết</Text>
                    </TouchableOpacity>
                  </View>

                </TouchableOpacity>
              ))}
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- HELPER COMPONENTS ---
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

const SupplyItem = ({ item, category, onUpdate, onToggle }) => (
  <View style={styles.itemRow}>
    <TouchableOpacity style={styles.itemLeft} activeOpacity={0.7} onPress={() => onToggle(category, item.id)}>
      <Ionicons
        name={item.selected ? "checkmark-circle" : "ellipse-outline"}
        size={28}
        color={item.selected ? COLORS.RESCUE_ORANGE : "#000"}
      />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
    <View style={styles.quantityControl}>
      <TouchableOpacity onPress={() => onUpdate(category, item.id, -1)} style={styles.qtyBtn}>
        <Text style={styles.qtyBtnText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.qtyText}>{item.quantity}</Text>
      <TouchableOpacity onPress={() => onUpdate(category, item.id, 1)} style={styles.qtyBtn}>
        <Text style={styles.qtyBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ==========================================
// 🎨 STYLE TỔNG HỢP: GIỮ NGUYÊN CỦA BẠN & CARD MỚI
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  flex1: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },

  // Tabs (Của bạn)
  tabContainer: { flexDirection: 'row', backgroundColor: '#F6F7F8', borderRadius: 12, padding: 4, marginTop: 16, marginBottom: 24 },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#F6F7F8', borderColor: '#000000', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 5 },
  tabText: { fontSize: 15, color: '#000000', fontWeight: '700' },
  tabTextActive: { color: '#000' },

  // Search & Item (Của bạn)
  searchContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, height: 48, marginBottom: 24 },
  searchInput: { flex: 1, fontSize: 15, color: '#000' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemName: { fontSize: 15, color: '#000', marginLeft: 12 },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 20, color: '#000' },
  qtyText: { fontSize: 15, fontWeight: '600', marginHorizontal: 8, minWidth: 20, textAlign: 'center' },

  // --- STYLE CARD YC-113 (CĂN LỀ & BOX ICON) ---
  historyContainer: { marginTop: 8 },
  ycCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa tất cả theo chiều dọc
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  iconBoxContainer: { marginRight: 16 },
  iconBackground: {
    backgroundColor: '#FDE68A',
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F59E0B20',
  },
  ycTypeIcon: { width: 25, height: 25 },
  contentColumn: { flex: 1, justifyContent: 'center' },
  idRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  ycIdText: { fontSize: 20, fontWeight: '800', color: '#000' },
  statusTagPurple: { backgroundColor: '#D1B2FA', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  statusTextPurple: { fontSize: 15, fontWeight: '700', color: '#000' },
  ycDateText: { fontSize: 14, color: '#8D8D8D', fontWeight: '500', marginBottom: 6 },
  detailBtn: { backgroundColor: '#D9B18E', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 15, alignSelf: 'flex-start' },
  detailBtnText: { fontSize: 15, fontWeight: '700', color: '#944C16' },

  // Notes & Submit (Của bạn)
  noteLabel: { fontSize: 16, color: '#000', marginTop: 24, marginBottom: 12 },
  noteInput: { borderWidth: 1, borderColor: '#000000', borderRadius: 8, height: 120, padding: 12, fontSize: 15, color: '#000', marginBottom: 24, backgroundColor: '#FFF' },
  submitButton: { backgroundColor: COLORS.RESCUE_ORANGE, borderRadius: 8, height: 50, alignItems: 'center', justifyContent: 'center', width: 200, alignSelf: 'center', marginTop: 10, elevation: 3 },
  submitButtonText: { color: '#000000', fontSize: 16, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
  seeAllText: { fontSize: 14, color: '#666', marginBottom: 2 },
});