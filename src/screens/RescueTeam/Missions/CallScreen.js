import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- ASSETS SẾP GỬI ---
const AvatarImg = require('../../../../assets/images/Union1.png'); // Cậu bé hoodie vàng
const CallingIcon = require('../../../../assets/icons/Vecto43.png'); // Icon sóng gọi
const MuteIcon = require('../../../../assets/icons/Vecto44.png');    // Icon tắt mic
const KeypadIcon = require('../../../../assets/icons/Vecto45.png');  // Icon bàn phím
const SpeakerIcon = require('../../../../assets/icons/Vector46.png'); // Icon loa ngoài
const AddCallIcon = require('../../../../assets/icons/Vector47.png'); // Icon thêm cuộc gọi

const { width } = Dimensions.get('window');

export default function CallScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. KHU VỰC THÔNG TIN NGƯỜI GỌI (TRUNG TÂM) */}
      <View style={styles.topSection}>
        <View style={styles.avatarWrapper}>
          <Image source={AvatarImg} style={styles.avatar} resizeMode="cover" />
        </View>
        
        <Text style={styles.nameText}>Nguyễn Văn A</Text>
        
        <View style={styles.statusRow}>
          <Image source={CallingIcon} style={styles.callingIcon} resizeMode="contain" />
          <Text style={styles.statusText}>Calling</Text>
        </View>
      </View>

      {/* 2. NHÓM NÚT CHỨC NĂNG (DÀN HÀNG NGANG) */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionCircle}>
          <Image source={MuteIcon} style={styles.iconSmall} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCircle}>
          <Image source={KeypadIcon} style={styles.iconSmall} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCircle}>
          <Image source={SpeakerIcon} style={styles.iconSmall} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCircle}>
          <Image source={AddCallIcon} style={styles.iconSmall} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* 3. NÚT KẾT THÚC CUỘC GỌI (BIG RED BUTTON) */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.endCallBtn}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="call" size={35} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  avatarWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden',
    marginBottom: 25,
    // Đổ bóng nhẹ cho avatar thêm nổi bật
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  callingIcon: {
    width: 32,
    height: 32,
    tintColor: '#000',
  },
  statusText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },

  // Action Buttons Row
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 60,
  },
  actionCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#EDF1F4', // Màu xám nhạt chuẩn iPhone
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSmall: {
    width: 28,
    height: 28,
    tintColor: '#2C3E50',
  },

  // End Call Section
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  endCallBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E14343', // Màu đỏ khẩn cấp
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E14343',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});