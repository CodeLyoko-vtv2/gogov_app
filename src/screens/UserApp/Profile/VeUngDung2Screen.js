// src/screens/UserApp/Profile/VeUngDung2Screen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView 
} from 'react-native';

import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function VeUngDung2Screen() {

  // Component thẻ hướng dẫn nội bộ (Vì không có nút bấm hay mũi tên nên không dùng UserMenuCard)
  const InstructionCard = ({ iconSource, title, description }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="HƯỚNG DẪN SỬ DỤNG" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <InstructionCard 
          iconSource={require('../../../../assets/icons/SOS.png')}
          title="1. Kích hoạt SOS"
          description="Nhấn và giữ nút SOS để kích hoạt cảnh báo khẩn cấp"
        />
        
        <InstructionCard 
          iconSource={require('../../../../assets/icons/duo-icons_location.png')}
          title="2. Chia sẻ vị trí"
          description="Ứng dụng sẽ tự động chia sẻ vị trí GPS của bạn với trung tâm cứu hộ và các liên hệ khẩn cấp đã thiết lập"
        />

        <InstructionCard 
          iconSource={require('../../../../assets/icons/streamline-freehand_help-headphones-customer-support-human.png')}
          title="3. Kết nối với trung tâm hỗ trợ"
          description="Ứng dụng sẽ kết nối bạn với cả Trợ lý ảo và Quản trị viên"
        />

        <InstructionCard 
          iconSource={require('../../../../assets/icons/uil_setting.png')}
          title="4. Cài đặt thông tin"
          description="Vui lòng vào mục Cài đặt để thêm các thông tin cần thiết"
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16, 
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 16,
    marginBottom: 16, 
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#FFF0F0', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary, 
  },
  textContainer: {
    flex: 1, 
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#333333', 
    lineHeight: 20, 
  }
});