// src/screens/UserApp/Profile/CaiDatScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { COLORS } from '../../../constants/colors';

// IMPORT COMPONENT CUSTOM TOGGLE MỚI
import CustomToggle from '../../../components/CustomToggle';

export default function CaiDatScreen() {
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const MenuItem = ({ iconSource, title, rightText, hideBorder, tintIcon=true }) => (
    <TouchableOpacity style={[styles.itemContainer, hideBorder ? styles.noBorder : null]}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWrapper}>
          <Image 
            source={iconSource} 
            style={[styles.icon, tintIcon ? styles.tintedIcon : null]} 
            resizeMode="contain" 
          />
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );

  // --- SỬA COMPONENT SWITCH ITEM ---
  // Đổi tên để phân biệt, sử dụng CustomToggle mới
  const CustomSwitchItem = ({ iconSource, title, value, onValueChange, hideBorder }) => (
    <View style={[styles.itemContainer, hideBorder ? styles.noBorder : null]}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWrapper}>
          <Image source={iconSource} style={[styles.icon, styles.tintedIcon]} resizeMode="contain" />
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      
      {/* GỌI CUSTOM TOGGLE Ở ĐÂY */}
      <CustomToggle 
        isOn={value} 
        onToggle={() => onValueChange(!value)} 
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/* THANH HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Image 
              source={require('../../../../assets/icons/Frame 2.png')} 
              style={styles.headerIcon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CÀI ĐẶT</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <SectionHeader title="TÀI KHOẢN" />
        <View style={styles.card}>
          <MenuItem 
            iconSource={require('../../../../assets/icons/FAQ Circle.png')}
            title="Thông tin cá nhân" 
          />
          <MenuItem 
            iconSource={require('../../../../assets/icons/hugeicons_transaction-history.png')} 
            title="Lịch sử SOS" 
            hideBorder={true} 
          />
        </View>

        <SectionHeader title="CÀI ĐẶT CHUNG" />
        <View style={styles.card}>
          {/* ĐỔI THÀNH CUSTOMSWITCHITEM */}
          <CustomSwitchItem 
            iconSource={require('../../../../assets/icons/Vector.png')}
            title="Quản lý thông báo" 
            value={isNotifEnabled}
            onValueChange={setIsNotifEnabled}
          />
          <CustomSwitchItem 
            iconSource={require('../../../../assets/icons/Vector1.png')}
            title="Chia sẻ vị trí" 
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
          />
          <MenuItem 
            iconSource={require('../../../../assets/icons/Vector2.png')}
            title="Ngôn ngữ" 
            rightText="Tiếng Việt"
            hideBorder={true} 
          />
        </View>

        <SectionHeader title="THÔNG TIN VÀ HỖ TRỢ" />
        <View style={styles.card}>
          <MenuItem 
            iconSource={require('../../../../assets/icons/FAQ Circle 1.png')}
            title="Trợ giúp và phản hồi" 
          />
          <MenuItem 
            iconSource={require('../../../../assets/icons/iphone-01.png')} 
            title="Về ứng dụng" 
            hideBorder={true} 
            tintIcon={false} 
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Image source={require('../../../../assets/icons/Vector3.png')} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white, 
  },
  header: {
    width: '100%', 
    backgroundColor: '#FEFAFB',
    paddingTop: 40, 
    paddingBottom: 25,
    
    // Đổ bóng (Drop shadow) chuẩn theo Figma cho iOS
    shadowColor: '#CECECE',
    shadowOffset: {
      width: 0,
      height: 4.56,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.7,
    
    // Đổ bóng cho Android (Android không nhận shadow color tuỳ chỉnh mượt như iOS, dùng elevation là chuẩn nhất)
    elevation: 5, 

    // Đảm bảo header luôn nằm trên ScrollView để bóng đổ xuống không bị che mất
    zIndex: 1, 
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
  },
  backButton: {
    padding: 5,
  },
  headerIcon: {
    width: 20, 
    height: 20,
    tintColor: COLORS.primary, 
  },
  headerTitle: {
    fontSize: 30, // Cỡ chữ đã tăng lên 30 như yêu cầu trước
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10, 
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 25,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: '#FFF0F0', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icon: {
    width: 18,
    height: 18,
  },
  tintedIcon: {
    tintColor: COLORS.primary, 
  },
  itemTitle: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 16,
    color: COLORS.gray,
    marginRight: 10,
  },
  arrowIcon: {
    fontSize: 22,
    color: '#CCC',
    marginBottom: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 35,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: COLORS.primary,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  }
});