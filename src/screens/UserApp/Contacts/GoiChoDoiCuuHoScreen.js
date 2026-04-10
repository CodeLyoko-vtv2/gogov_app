import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import { COLORS } from '../../../constants/colors';

export default function GoiChoDoiCuuHoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      
      {/* KHU VỰC THÔNG TIN CUỘC GỌI (Căn giữa phía trên) */}
      <View style={styles.callerInfoContainer}>
        {/* Mình vẫn dùng tạm icon SOS, nếu bạn muốn đổi sang hình xe cứu hộ thì đổi file ở đây nhé */}
        <Image 
          source={require('../../../../assets/icons/Frame 3575.png')} 
          style={styles.callerAvatar}
          resizeMode="contain"
        />
        
        {/* Tên người gọi đã được thay đổi theo yêu cầu */}
        <Text style={styles.callerName}>Đội cứu hộ GoGo-V</Text>
        <Text style={styles.callStatus}>Đang kết nối...</Text>
      </View>

      {/* KHU VỰC ĐIỀU KHIỂN CUỘC GỌI (Nằm dưới cùng) */}
      <View style={[styles.controlsContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40 }]}>
        
        {/* Hai nút Mic và Loa ngoài */}
        <View style={styles.actionRow}>
          {/* Nút Tắt/Mở Mic */}
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Image 
              source={require('../../../../assets/icons/mic.png')} 
              style={styles.actionIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Nút Tắt/Mở Loa ngoài */}
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Image 
              source={require('../../../../assets/icons/Vector15.png')} 
              style={styles.actionIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Nút Kết thúc cuộc gọi */}
        <TouchableOpacity 
          style={styles.endCallButton} 
          activeOpacity={0.8}
          onPress={() => {
            router.back(); 
          }}
        >
          <Image 
            source={require('../../../../assets/icons/Vector16.png')} 
            style={styles.endCallIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  // THÔNG TIN NGƯỜI GỌI
  callerInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  callerAvatar: {
    width: 220,
    height: 220,
    marginBottom: 30,
  },
  callerName: {
    fontSize: 28, // Chữ hơi dài nên mình giảm nhẹ size từ 32 xuống 28 để không bị rớt dòng
    fontWeight: '800',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  callStatus: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '400',
  },
  // NÚT ĐIỀU KHIỂN
  controlsContainer: {
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 80, 
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FDECEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 26,
    height: 26,
    tintColor: '#111',
  },
  endCallButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  endCallIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.white,
  },
});