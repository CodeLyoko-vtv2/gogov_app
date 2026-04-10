import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

// DỮ LIỆU MẪU (Giống màn Đồ tích trữ)
const INITIAL_DATA = [
  { id: 1, category: 'Thực phẩm và Nước uống', title: 'Nước uống', subtitle: '2-3 lít/người/ngày' },
  { id: 2, category: 'Thực phẩm và Nước uống', title: 'Đồ ăn liền', subtitle: 'Đủ cho 3 ngày' },
  { id: 3, category: 'Y tế và sơ cứu', title: 'Bộ sơ cứu cá nhân', subtitle: null },
  { id: 4, category: 'Y tế và sơ cứu', title: 'Thuốc men cần thiết', subtitle: null },
  { id: 5, category: 'Ánh sáng và năng lượng', title: 'Đèn pin', subtitle: null },
  { id: 6, category: 'Ánh sáng và năng lượng', title: 'Pin dự phòng', subtitle: null },
  { id: 7, category: 'Ánh sáng và năng lượng', title: 'Sạc dự phòng', subtitle: null },
  { id: 8, category: 'Ánh sáng và năng lượng', title: 'Nến', subtitle: null },
];

export default function ThemDanhSachDoTichTruScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [supplies, setSupplies] = useState(INITIAL_DATA);

  // Lấy danh sách các danh mục
  const categories = [...new Set(supplies.map(item => item.category))];

  // Hàm mô phỏng xóa item
  const handleDeleteItem = (id) => {
    // Trong thực tế sẽ gọi setSupplies(supplies.filter(item => item.id !== id))
    console.log("Xóa item có ID:", id);
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <UserHeader title="TÍCH TRỮ" />

      {/* DANH SÁCH CHỈNH SỬA */}
      <ScrollView 
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Chừa khoảng trống cho nút Lưu
      >
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryBlock}>
            {/* Tiêu đề nhóm */}
            <Text style={styles.categoryTitle}>{category}</Text>
            
            {/* Các item trong nhóm */}
            {supplies.filter(item => item.category === category).map((item) => (
              <View key={item.id} style={styles.itemRow}>
                
                {/* Nút Xóa (Dấu trừ xám - Frame 3656.png) */}
                <TouchableOpacity 
                  style={styles.actionIconWrapper}
                  onPress={() => handleDeleteItem(item.id)}
                  activeOpacity={0.6}
                >
                  <Image 
                    source={require('../../../../assets/icons/Frame 3656.png')} 
                    style={styles.minusIcon}
                  />
                </TouchableOpacity>

                {/* Icon Kéo thả (Frame 3657.png) */}
                <View style={styles.dragIconWrapper}>
                  <Image 
                    source={require('../../../../assets/icons/Frame 3657.png')} 
                    style={styles.dragIcon}
                    resizeMode="contain"
                  />
                </View>

                {/* Nội dung Text */}
                <View style={styles.itemTextContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  )}
                </View>

              </View>
            ))}
          </View>
        ))}

        {/* NÚT THÊM MỤC MỚI (Nằm cuối danh sách) */}
        <TouchableOpacity 
          style={styles.addNewButton}
          activeOpacity={0.7}
          onPress={() => console.log("Mở form thêm mục mới")}
        >
          <Image 
            source={require('../../../../assets/icons/Frame 3658.png')} 
            style={styles.plusIcon}
          />
          <Text style={styles.addNewText}>Thêm mục mới</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* NÚT LƯU THAY ĐỔI (Dính ở đáy màn hình) */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity 
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={() => {
            console.log("Đã lưu danh sách");
            router.back();
          }}
        >
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  categoryBlock: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    marginTop: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  // Các icon thao tác
  actionIconWrapper: {
    padding: 5,
    marginRight: 5,
  },
  minusIcon: {
    width: 24,
    height: 24,
  },
  dragIconWrapper: {
    paddingHorizontal: 5,
    marginRight: 15,
  },
  dragIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.gray, // Làm mờ màu xám đi một chút cho thanh lịch
  },
  // Nội dung chữ
  itemTextContent: {
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
  // Nút Thêm mục mới
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginBottom: 20,
  },
  plusIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  addNewText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  // Footer dính đáy
  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
  },
});