// src/screens/UserApp/NewsDonate/UngHoVatPhamScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

// DỮ LIỆU MẪU BAN ĐẦU
const INITIAL_ITEMS = [
  { 
    id: '1', 
    name: 'Mỳ gói', 
    quantity: 30, 
    icon: require('../../../../assets/icons/mdi_noodles.png') 
  },
  { 
    id: '2', 
    name: 'Sách giáo khoa', 
    quantity: 12, 
    icon: require('../../../../assets/icons/material-symbols_menu-book.png') 
  },
];

export default function UngHoVatPhamScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // QUẢN LÝ TRẠNG THÁI (STATE)
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('tu_van_chuyen'); // 'tu_van_chuyen' hoặc 'yeu_cau_den_lay'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Hàm tăng số lượng
  const increaseQuantity = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.quantity > 0 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <UserHeader title="ỦNG HỘ VẬT PHẨM" />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentPadding}>
          
          {/* --- 1. VẬT PHẨM QUYÊN GÓP --- */}
          <Text style={styles.sectionTitle}>Vật phẩm quyên góp</Text>
          
          {/* Danh sách các vật phẩm */}
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <View style={styles.iconBackground}>
                  <Image source={item.icon} style={styles.itemIcon} resizeMode="contain" />
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              
              {/* Cụm nút Tăng/Giảm */}
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} activeOpacity={0.6}>
                  <Image 
                    source={require('../../../../assets/icons/lsicon_minus-outline.png')} 
                    style={styles.controlIcon} 
                  />
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{item.quantity}</Text>
                
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} activeOpacity={0.6}>
                  <Image 
                    source={require('../../../../assets/icons/circum_circle-plus.png')} 
                    style={styles.controlIcon} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Nút Thêm vật phẩm */}
          <TouchableOpacity style={styles.addItemButton} activeOpacity={0.7}>
            <Image 
              source={require('../../../../assets/icons/octicon_feed-plus-16.png')} 
              style={styles.addIcon} 
            />
            <Text style={styles.addItemText}>Thêm vật phẩm</Text>
          </TouchableOpacity>


          {/* --- 2. MÔ TẢ TÌNH TRẠNG --- */}
          <Text style={[styles.sectionTitle, { fontSize: 16 }, { fontWeight: '600' }]}>Mô tả tình trạng (không bắt buộc)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Ví dụ: sách còn mới, quần áo hơi cũ..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />


          {/* --- 3. PHƯƠNG THỨC GIAO NHẬN --- */}
          <Text style={styles.sectionTitle}>Phương thức giao nhận</Text>
          <View style={styles.deliveryContainer}>
            
            {/* Box 1: Tự vận chuyển */}
            <TouchableOpacity 
              style={[
                styles.deliveryBox, 
                deliveryMethod === 'tu_van_chuyen' ? styles.deliveryBoxActive : styles.deliveryBoxInactive
              ]}
              activeOpacity={0.8}
              onPress={() => setDeliveryMethod('tu_van_chuyen')}
            >
              <Image 
                source={require('../../../../assets/icons/ri_truck-fill.png')} 
                style={[
                  styles.deliveryIcon, 
                  { tintColor: deliveryMethod === 'tu_van_chuyen' ? COLORS.primary : '#333' }
                ]} 
              />
              <Text style={[
                styles.deliveryText, 
                { color: deliveryMethod === 'tu_van_chuyen' ? COLORS.primary : '#333' }
              ]}>Tự vận chuyển</Text>
            </TouchableOpacity>

            {/* Box 2: Yêu cầu đến lấy */}
            <TouchableOpacity 
              style={[
                styles.deliveryBox, 
                deliveryMethod === 'yeu_cau_den_lay' ? styles.deliveryBoxActive : styles.deliveryBoxInactive
              ]}
              activeOpacity={0.8}
              onPress={() => setDeliveryMethod('yeu_cau_den_lay')}
            >
              <Image 
                source={require('../../../../assets/icons/material-symbols_move-location.png')} 
                style={[
                  styles.deliveryIcon, 
                  { tintColor: deliveryMethod === 'yeu_cau_den_lay' ? COLORS.primary : '#333' }
                ]} 
              />
              <Text style={[
                styles.deliveryText, 
                { color: deliveryMethod === 'yeu_cau_den_lay' ? COLORS.primary : '#333' }
              ]}>Yêu cầu đến lấy</Text>
            </TouchableOpacity>

          </View>


          {/* --- 4. THÔNG TIN CỦA BẠN --- */}
          <Text style={styles.sectionTitle}>Thông tin của bạn</Text>
          
          <Text style={styles.inputLabel}>Họ và tên</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Nguyễn Văn A"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <Text style={styles.inputLabel}>Số điện thoại</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="09xxxxxxxxx"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

        </View>
      </ScrollView>

      {/* --- NÚT XÁC NHẬN --- */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity 
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={() => {
            console.log("Dữ liệu quyên góp:", { items, description, deliveryMethod, fullName, phone });
          }}
        >
          <Text style={styles.confirmButtonText}>Xác nhận quyên góp</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
    marginBottom: 15,
  },
  // --- Danh sách vật phẩm ---
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 44,
    height: 44,
    backgroundColor: '#FDECEE', // Nền hồng nhạt
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary, // Áp màu đỏ cho icon tô mì/quyển sách
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlIcon: {
    width: 26,
    height: 26,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  // Nút thêm vật phẩm
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  addIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  addItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // --- Text Area ---
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#FAFAFA',
    height: 100,
    fontSize: 15,
    color: '#000',
  },
  // --- Phương thức giao nhận (Khối vuông) ---
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryBox: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  deliveryBoxActive: {
    backgroundColor: '#FDECEE', // Nền hồng
    borderColor: '#FCA5A5',     // Viền đỏ/hồng
    marginRight: 10, // Giãn cách 2 box
  },
  deliveryBoxInactive: {
    backgroundColor: '#FFF',
    borderColor: '#E5E7EB',
    marginLeft: 10, // Giãn cách 2 box
  },
  deliveryIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 15,
    fontWeight: '600',
  },
  // --- Thông tin của bạn ---
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
  },
  textInput: {
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  // --- Footer ---
  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
});