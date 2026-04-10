// src/screens/UserApp/Profile/VeUngDung1Screen.js
import React from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView 
} from 'react-native';

// Gọi các Component dùng chung
import UserHeader from '../../../components/UserHeader';
import UserMenuCard from '../../../components/UserMenuCard'; 
import { COLORS } from '../../../constants/colors';

export default function VeUngDung1Screen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="THÔNG TIN ỨNG DỤNG" />

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        
        {/* PHẦN LOGO & VERSION */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../../../../assets/icons/Logo-Gogo-V.png')} 
            style={styles.mainLogo} 
            resizeMode="contain" 
          />
          <Text style={styles.appName}>GoGoV Rescue App</Text>
          <Text style={styles.versionText}>Phiên bản 1.0.2</Text>
        </View>

        {/* DANH SÁCH CÁC MỤC BẰNG COMPONENT CHUNG */}
        <View style={styles.listSection}>
          <UserMenuCard 
            iconSource={require('../../../../assets/icons/Vector6.png')} 
            title="Hướng dẫn sử dụng" 
            onPress={() => router.push('/VeUngDung2')}
          />
          <UserMenuCard 
            iconSource={require('../../../../assets/icons/Vector7.png')} 
            title="Điều khoản dịch vụ" 
          />
          <UserMenuCard 
            iconSource={require('../../../../assets/icons/Vector8.png')} 
            title="Chính sách bảo mật" 
          />
        </View>

      </ScrollView>
    </View>
  );
}

// Xóa sạch các style của item cũ, file nhẹ đi một nửa!
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white, 
  },
  contentScroll: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  mainLogo: {
    width: 140,
    height: 140,
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  versionText: {
    fontSize: 16,
    color: '#8D8D8D',
    marginTop: 5,
  },
  listSection: {
    width: '100%',
    paddingHorizontal: 20,
  }
});