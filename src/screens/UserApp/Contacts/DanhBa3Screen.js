// src/screens/UserApp/Contacts/DanhBa3Screen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function DanhBa3Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // STATE: Quản lý trạng thái bật/tắt của Loa và Camera
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  // Hàm xử lý khi dập máy
  const handleEndCall = () => {
    console.log("Đã kết thúc cuộc gọi với Mẹ");
    router.push('/DanhBa4');
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER TỪ COMPONENT CHUNG */}
      <UserHeader title="GỌI ĐIỆN"  onBackPress={() => router.replace('/DanhBa1')}/>

      {/* KHU VỰC HIỂN THỊ THÔNG TIN NGƯỜI GỌI */}
      <View style={styles.infoContainer}>
        <Text style={styles.callerName}>Mẹ</Text>
        <Text style={styles.callStatus}>Đang đổ chuông...</Text>
      </View>

      {/* KHU VỰC CÁC NÚT ĐIỀU KHIỂN DƯỚI ĐÁY */}
      <View style={[styles.controlsContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40 }]}>
        
        {/* Nút Bật/Tắt Loa */}
        <TouchableOpacity 
          style={[styles.controlButton, isSpeakerOn ? styles.buttonActive : styles.buttonInactive]}
          activeOpacity={0.8}
          onPress={() => setIsSpeakerOn(!isSpeakerOn)}
        >
          <Image 
            source={require('../../../../assets/icons/mingcute_volume-fill.png')} 
            style={[styles.controlIcon, { tintColor: COLORS.white }]} 
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Nút Dập Máy (Kết thúc cuộc gọi) */}
        <TouchableOpacity 
          style={styles.endCallButton}
          activeOpacity={0.8}
          onPress={handleEndCall}
        >
          <Image 
            source={require('../../../../assets/icons/solar_end-call-bold.png')} 
            style={styles.endCallIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Nút Bật/Tắt Camera */}
        <TouchableOpacity 
          style={[styles.controlButton, isVideoOn ? styles.buttonActive : styles.buttonInactive]}
          activeOpacity={0.8}
          onPress={() => setIsVideoOn(!isVideoOn)}
        >
          <Image 
            source={require('../../../../assets/icons/solar_videocamera-record-bold.png')} 
            style={[styles.controlIcon, { tintColor: COLORS.white }]} 
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
  },
  // --- Thông tin người gọi ---
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80, // Đẩy text xuống một khoảng cho cân đối
  },
  callerName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  callStatus: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  // --- Các nút điều khiển ---
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30, // Khoảng cách giữa 3 nút
  },
  // Style chung cho nút Loa và Camera
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32, // Hình tròn hoàn hảo
    justifyContent: 'center',
    alignItems: 'center',
    // Hiệu ứng đổ bóng (Shadow)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5, // Đổ bóng cho Android
  },
  buttonInactive: {
    backgroundColor: '#BDBDBD', // Nền xám như thiết kế
  },
  buttonActive: {
    backgroundColor: '#888888', // Nền xám đậm hơn khi bật tính năng
  },
  controlIcon: {
    width: 28,
    height: 28,
  },
  // Style riêng cho nút Dập Máy (Nổi bật hơn)
  endCallButton: {
    width: 76,  // To hơn nút thường một chút
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primary, // Đỏ chót
    justifyContent: 'center',
    alignItems: 'center',
    // Hiệu ứng đổ bóng mạnh hơn một chút
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  endCallIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.white, // Nhuộm trắng cái điện thoại
  },
});