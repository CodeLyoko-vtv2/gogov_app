// src/screens/UserApp/NewsDonate/DanhSachQuyenGopScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng icon có sẵn của Expo

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

// DỮ LIỆU MẪU BAN ĐẦU
const DONATORS_DATA = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    amount: '5.000.000 VND',
    date: '22/7/2025',
    message: '"Chung tay vì cộng đồng"',
  },
  {
    id: '2',
    name: 'Công ty TNHH ABC',
    amount: '15.000.000 VND',
    date: '21/7/2025',
    message: '"Cố lên Miền Trung ơi"',
  },
  {
    id: '3',
    name: 'Trần Thị B',
    amount: '20 bộ Quần áo',
    date: '20/7/2025',
    message: null,
  },
  {
    id: '4',
    name: 'Lê Văn C',
    amount: '30 kg gạo',
    date: '19/7/2025',
    message: null,
  },
];

export default function DanhSachQuyenGopScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Logic lọc danh sách theo tên (không phân biệt hoa thường)
  const filteredDonators = DONATORS_DATA.filter(donator => 
    donator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="DANH SÁCH" />

      <View style={styles.contentPadding}>
        {/* THANH TÌM KIẾM */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm theo tên nhà tài trợ"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* DANH SÁCH MẠNH THƯỜNG QUÂN */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          {filteredDonators.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              
              {/* Dòng 1: Tên và Ngày tháng */}
              <View style={styles.rowHeader}>
                <Text style={styles.donatorName}>{item.name}</Text>
                <Text style={styles.donatorDate}>{item.date}</Text>
              </View>

              {/* Dòng 2: Số tiền / Hiện vật */}
              <Text style={styles.donatorAmount}>{item.amount}</Text>

              {/* Dòng 3: Lời nhắn (Nếu có) */}
              {item.message && (
                <Text style={styles.donatorMessage}>{item.message}</Text>
              )}
              
            </View>
          ))}

          {/* Hiển thị khi không tìm thấy kết quả */}
          {filteredDonators.length === 0 && (
            <Text style={styles.emptyText}>Không tìm thấy nhà tài trợ phù hợp.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentPadding: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  // --- Thanh tìm kiếm ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    height: '100%',
  },
  // --- Item Danh sách ---
  itemContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  donatorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  donatorDate: {
    fontSize: 15,
    color: '#888',
  },
  donatorAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669', // Màu xanh lá cây chuẩn thiết kế
    marginBottom: 4,
  },
  donatorMessage: {
    fontSize: 15,
    color: '#888',
    fontStyle: 'italic', // Chữ in nghiêng theo thiết kế
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 15,
  }
});