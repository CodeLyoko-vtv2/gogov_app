// src/screens/UserApp/Profile/VeUngDung1Screen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants/colors';

export default function VeUngDung1Screen() {
  const router = useRouter();

  // Component Item con cho danh sách (Hướn dẫn, Điều khoản...)
  const InfoItem = ({ iconSource, title }) => (
    <TouchableOpacity style={styles.cardItem} activeOpacity={0.7}>
      <View style={styles.cardLeft}>
        <View style={styles.iconBox}>
          <Image source={iconSource} style={styles.itemIcon} resizeMode="contain" />
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <Text style={styles.arrowIcon}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      {/* HEADER: Áp dụng ghi nhớ Height 154, PaddingTop 77 */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image 
              source={require('../../../../assets/icons/Frame 2.png')} 
              style={styles.backIcon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>THÔNG TIN ỨNG DỤNG</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

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

        {/* DANH SÁCH CÁC MỤC */}
        <View style={styles.listSection}>
          <InfoItem 
            iconSource={require('../../../../assets/icons/Vector6.png')} 
            title="Hướng dẫn sử dụng" 
          />
          <InfoItem 
            iconSource={require('../../../../assets/icons/Vector7.png')} 
            title="Điều khoản dịch vụ" 
          />
          <InfoItem 
            iconSource={require('../../../../assets/icons/Vector8.png')} 
            title="Chính sách bảo mật" 
          />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white, // Ghi nhớ: Nền trắng
  },
  header: {
    height: 154, // Ghi nhớ
    paddingTop: 77, // Ghi nhớ
    backgroundColor: '#FEFAFB', // Ghi nhớ
    paddingBottom: 25,
    // Đổ bóng chuẩn Figma
    shadowColor: '#CECECE',
    shadowOffset: { width: 0, height: 4.56 },
    shadowOpacity: 0.35,
    shadowRadius: 5.7,
    elevation: 5,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 24, // Giảm nhẹ so với 30 để không bị tràn dòng
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
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
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 15,
    // Đổ bóng nhẹ cho item
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  arrowIcon: {
    fontSize: 22,
    color: '#CCC',
  }
});