// src/screens/UserApp/Supplies/DoTichTruScreen.js
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import CustomCheckbox from '../../../components/CustomCheckbox';
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

// DỮ LIỆU MẪU BAN ĐẦU
const INITIAL_DATA = [
  { id: 1, category: 'Thực phẩm và Nước uống', title: 'Nước uống', subtitle: '2-3 lít/người/ngày', checked: true },
  { id: 2, category: 'Thực phẩm và Nước uống', title: 'Đồ ăn liền', subtitle: 'Đủ cho 3 ngày', checked: true },
  { id: 3, category: 'Y tế và sơ cứu', title: 'Bộ sơ cứu cá nhân', subtitle: null, checked: false },
  { id: 4, category: 'Y tế và sơ cứu', title: 'Thuốc men cần thiết', subtitle: null, checked: true },
  { id: 5, category: 'Ánh sáng và năng lượng', title: 'Đèn pin', subtitle: null, checked: true },
  { id: 6, category: 'Ánh sáng và năng lượng', title: 'Pin dự phòng', subtitle: null, checked: true },
  { id: 7, category: 'Ánh sáng và năng lượng', title: 'Sạc dự phòng', subtitle: null, checked: false },
  { id: 8, category: 'Ánh sáng và năng lượng', title: 'Nến', subtitle: null, checked: false },
];

export default function DoTichTruScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State quản lý danh sách đồ dùng
  const [supplies, setSupplies] = useState(INITIAL_DATA);

  // Tính toán phần trăm hoàn thành
  const completedCount = supplies.filter(item => item.checked).length;
  const totalCount = supplies.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Hàm xử lý khi bấm vào từng mục
  const toggleItem = (id) => {
    setSupplies(prevSupplies => 
      prevSupplies.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Trích xuất danh sách các danh mục duy nhất
  const categories = [...new Set(supplies.map(item => item.category))];

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="TÍCH TRỮ" />

      {/* THANH TIẾN ĐỘ (PROGRESS BAR) */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Đã hoàn thành</Text>
          <Text style={styles.progressPercent}>{progressPercentage}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${progressPercentage}%` } // Tự động co giãn theo %
            ]} 
          />
        </View>
      </View>

      {/* DANH SÁCH ĐỒ DÙNG */}
      <ScrollView 
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Chừa chỗ cho nút FAB
      >
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryBlock}>
            {/* Tiêu đề nhóm */}
            <Text style={styles.categoryTitle}>{category}</Text>
            
            {/* Các item trong nhóm */}
            {supplies.filter(item => item.category === category).map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.itemRow}
                activeOpacity={0.7}
                onPress={() => toggleItem(item.id)}
              >
                {/* Gọi Component CustomRadioButton */}
                <CustomCheckbox 
                  selected={item.checked} 
                  onPress={() => toggleItem(item.id)}
                  size={24}
                />
                
                <View style={styles.itemTextContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* NÚT THÊM MỚI (FAB - Floating Action Button) */}
      <TouchableOpacity 
        style={[styles.fabButton, { bottom: insets.bottom > 0 ? insets.bottom + 20 : 40 }]}
        activeOpacity={0.8}
        onPress={() => router.push('/ThemDanhSachDoTichTru')}
      >
        {/* Dùng Vector11.png (dấu cộng) đã gửi trước đó và đổi màu thành trắng */}
        <Image 
          source={require('../../../../assets/icons/Vector11.png')} 
          style={styles.fabIcon} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Style Thanh Tiến Độ
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#FAFAFA', // Tạo đường phân cách mờ dưới thanh tiến độ
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E7EB', // Màu xám nhạt
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  // Style Danh Sách
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryBlock: {
    marginTop: 25,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemTextContent: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  itemSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  // Style Nút FAB
  fabButton: {
    position: 'absolute',
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary, // Đỏ
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  fabIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white, // Đổi dấu + thành màu trắng
  },
});