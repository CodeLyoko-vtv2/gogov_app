// src/screens/UserApp/NewsDonate/UngHoGaoScreen.js
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

export default function UngHoGaoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // QUẢN LÝ TRẠNG THÁI (STATE)
  const [amount, setAmount] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('hen_lay'); // 'giao_tan_noi' hoặc 'hen_lay'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Xử lý text tóm tắt dựa vào state
  const displayAmount = amount ? amount : '0';
  const deliverySummaryText = deliveryMethod === 'hen_lay' 
    ? 'Chúng tôi sẽ hẹn lấy tại nhà bạn'
    : 'Bạn sẽ giao gạo đến điểm tập kết';

  return (
    <KeyboardAvoidingView 
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <UserHeader title="QUYÊN GÓP GẠO" />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentPadding}>
          
          {/* --- 1. SỐ LƯỢNG ỦNG HỘ --- */}
          <Text style={styles.sectionTitle}>Bạn muốn ủng hộ bao nhiêu?</Text>
          <Text style={styles.subLabel}>Nhập số lượng gạo muốn quyên góp</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="0 kg"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* --- 2. PHƯƠNG THỨC NHẬN GẠO --- */}
          <Text style={styles.sectionTitle}>Chúng tôi có thể nhận gạo bằng cách nào?</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity 
              style={[
                styles.segmentButton, 
                deliveryMethod === 'giao_tan_noi' && styles.segmentButtonActive
              ]}
              activeOpacity={0.8}
              onPress={() => setDeliveryMethod('giao_tan_noi')}
            >
              <Text style={[
                styles.segmentText,
                deliveryMethod === 'giao_tan_noi' && styles.segmentTextActive
              ]}>Giao tận nơi</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.segmentButton, 
                deliveryMethod === 'hen_lay' && styles.segmentButtonActive
              ]}
              activeOpacity={0.8}
              onPress={() => setDeliveryMethod('hen_lay')}
            >
              <Text style={[
                styles.segmentText,
                deliveryMethod === 'hen_lay' && styles.segmentTextActive
              ]}>Hẹn lấy tại nhà</Text>
            </TouchableOpacity>
          </View>

          {/* --- 3. THÔNG TIN CỦA BẠN --- */}
          <Text style={styles.sectionTitle}>Thông tin của bạn</Text>
          <Text style={styles.subLabel}>Chúng tôi cần thông tin này để liên hệ bạn</Text>
          
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

          <Text style={styles.inputLabel}>Địa chỉ</Text>
          <View style={[styles.inputWrapper, { marginBottom: 10 }]}>
            <TextInput
              style={styles.textInput}
              placeholder="Số nhà, đường, phường/xã..."
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* --- 4. TÓM TẮT --- */}
          <Text style={styles.sectionTitle}>Tóm tắt</Text>
          
          <View style={styles.summaryRow}>
            <Image 
              source={require('../../../../assets/icons/material-symbols_shopping-bag.png')} 
              style={styles.summaryIcon}
              resizeMode="contain"
            />
            <Text style={styles.summaryText}>Bạn sẽ ủng hộ {displayAmount}kg gạo</Text>
          </View>

          <View style={styles.summaryRow}>
            <Image 
              source={require('../../../../assets/icons/ri_truck-fill.png')} 
              style={styles.summaryIcon}
              resizeMode="contain"
            />
            <Text style={styles.summaryText}>{deliverySummaryText}</Text>
          </View>

        </View>
      </ScrollView>

      {/* --- NÚT XÁC NHẬN --- */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity 
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={() => {
            console.log("Quyên góp gạo:", { amount, deliveryMethod, fullName, phone, address });
            // Xử lý logic gửi form
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
    marginTop: 25,
    marginBottom: 6,
  },
  subLabel: {
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
  },
  // Inputs
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
  // Segmented Control (Thanh chọn Giao hàng / Hẹn lấy)
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#FFF0F0', // Nền đỏ hồng cực nhạt
    borderRadius: 12,
    padding: 4,
    marginTop: 5,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
  segmentTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  // Tóm tắt
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  summaryIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  // Footer
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