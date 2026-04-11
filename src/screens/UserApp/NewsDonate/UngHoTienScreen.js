// src/screens/UserApp/NewsDonate/UngHoTienScreen.js
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
import CustomRadioButton from '../../../components/CustomRadioButton';
import CustomToggle from '../../../components/CustomToggle';
import { COLORS } from '../../../constants/colors';

// DỮ LIỆU MẪU
const QUICK_AMOUNTS = [50000, 100000, 200000, 500000];
const PAYMENT_METHODS = [
  { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: require('../../../../assets/icons/mdi_bank.png') },
  { id: 'momo', name: 'Ví momo', icon: require('../../../../assets/icons/momo.png') },
];

export default function UngHoTienScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // QUẢN LÝ TRẠNG THÁI (STATE)
  const [selectedAmount, setSelectedAmount] = useState(50000); // Mặc định chọn 50k
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank'); // Mặc định chọn ngân hàng
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Hàm định dạng tiền tệ (thêm dấu chấm)
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Tính tổng tiền cần thanh toán
  const totalAmount = customAmount ? customAmount : selectedAmount;

  return (
    <KeyboardAvoidingView 
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <UserHeader title="QUYÊN GÓP TIỀN" />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentPadding}>
          
          {/* --- 1. CHỌN SỐ TIỀN --- */}
          <Text style={styles.sectionTitle}>Chọn số tiền</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickAmountContainer}>
            {QUICK_AMOUNTS.map((amount) => {
              const isSelected = selectedAmount === amount;
              return (
                <TouchableOpacity
                  key={amount}
                  style={[styles.amountPill, isSelected && styles.amountPillActive]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedAmount(amount);
                    setCustomAmount(''); // Xóa số tiền tự nhập nếu chọn mức có sẵn
                  }}
                >
                  <Text style={[styles.amountPillText, isSelected && styles.amountPillTextActive]}>
                    {formatCurrency(amount)}đ
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* --- 2. SỐ TIỀN KHÁC --- */}
          <Text style={[styles.sectionTitle, { fontSize: 16, fontWeight: '500' }]}>Số tiền khác</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="0 VND"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={customAmount ? formatCurrency(customAmount) : ''}
              onChangeText={(text) => {
                // Xóa các ký tự không phải số
                const numericValue = text.replace(/[^0-9]/g, '');
                setCustomAmount(numericValue);
                if (numericValue) setSelectedAmount(null); // Bỏ chọn các mức có sẵn
              }}
            />
          </View>

          {/* --- 3. PHƯƠNG THỨC THANH TOÁN --- */}
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = paymentMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                style={[styles.paymentCard, isSelected && styles.paymentCardActive]}
                activeOpacity={0.8}
                onPress={() => setPaymentMethod(method.id)}
              >
                <Image source={method.icon} style={styles.paymentIcon} resizeMode="contain" />
                <Text style={styles.paymentName}>{method.name}</Text>
                
                {/* Gọi Component CustomRadioButton bạn vừa tạo */}
                <CustomRadioButton 
                  selected={isSelected}
                  onPress={() => setPaymentMethod(method.id)}
                  size={24}
                />
              </TouchableOpacity>
            );
          })}

          {/* --- 4. THÔNG TIN THÊM --- */}
          <Text style={styles.sectionTitle}>Thông tin thêm</Text>
          <Text style={styles.subLabel}>Lời nhắn</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Gửi lời nhắn của bạn..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

          {/* --- 5. QUYÊN GÓP ẨN DANH --- */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Quyên góp ẩn danh</Text>
            {/* Gọi Component CustomToggle bạn vừa đưa */}
            <CustomToggle 
              isOn={isAnonymous} 
              onToggle={() => setIsAnonymous(!isAnonymous)} 
            />
          </View>

        </View>
      </ScrollView>

      {/* --- PHẦN FOOTER (TỔNG TIỀN VÀ NÚT XÁC NHẬN) --- */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>{totalAmount ? formatCurrency(totalAmount) : '0'} VND</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={() => {
            console.log("Quyên góp:", { totalAmount, paymentMethod, message, isAnonymous });
            // Chuyển sang màn hình xác nhận / ngân hàng
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
    paddingBottom: 30, // Tạo khoảng cách với phần footer dính đáy
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: 15,
    marginBottom: 12,
  },
  // Chọn số tiền (Pills)
  quickAmountContainer: {
    flexDirection: 'row',
  },
  amountPill: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  amountPillActive: {
    backgroundColor: '#FDECEE', // Nền hồng nhạt
  },
  amountPillText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  amountPillTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  // Text Input
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
  // Phương thức thanh toán
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  paymentCardActive: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FDECEE',
  },
  paymentIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  paymentName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  // Lời nhắn
  subLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
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
  // Toggle
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  // Footer
  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
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