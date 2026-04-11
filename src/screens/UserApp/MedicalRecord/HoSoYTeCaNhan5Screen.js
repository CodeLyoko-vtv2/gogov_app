import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UserHeader from '../../../components/UserHeader';

const COLORS = {
  primary: '#EF4444',
  white: '#FFF',
  black: '#000',
  gray: '#979797',
  lightGray: '#DADADA',
  lightRed: 'rgba(249,211,211,0.30)',
  bgLight: 'rgba(250,232,233,0.20)',
};

export default function ThongTinCaNhanScreen() {
  const [userInfo] = useState({
    name: 'Nguyễn Vũ Huy',
    avatar: require('../../../../assets/icons/Rectangle 4880.png'),
    dob: 'Chưa có',
    gender: 'Chưa có',
    phone: '0373224840',
    role: 'Tình nguyện viên',
    bloodType: 'Nhóm máu O',
    allergy: 'Lông mèo',
    medicalCondition: 'Chưa có',
    medications: 'Chưa có',
    emergencyContacts: [
      {
        id: 1,
        name: 'Mẹ',
        phone: '0373224840',
      },
      {
        id: 2,
        name: 'Ba',
        phone: '0373224840',
      },
    ],
  });

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader 
        title="THÔNG TIN CÁ NHÂN" 
        onBackPress={() => router.push('/CaiDat')}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={userInfo.avatar}
              style={styles.avatar}
            />
            <Text style={styles.nameText}>{userInfo.name}</Text>
          </View>

        </View>

        {/* Personal Info Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
            
              <Image
                source={require('../../../../assets/icons/mdi_edit-circle.png')}
                style={styles.sectionActionIcon}
                resizeMode="contain"
              />
            
          </View>

          <View style={styles.infoBox}>
            <InfoRow 
              label="Họ và tên" 
              value={userInfo.name}
            />
            <Divider />
            <InfoRow 
              label="Ngày sinh" 
              value={userInfo.dob}
            />
            <Divider />
            <InfoRow 
              label="Giới tính" 
              value={userInfo.gender}
              hasBottomDivider
            />
            <Divider />
            <InfoRow 
              label="Số điện thoại" 
              value={userInfo.phone}
              hasBottomDivider
            />
            <Divider />
            <InfoRow 
              label="Vai trò" 
              value={userInfo.role}
            />
          </View>
        </View>

        {/* Medical Info Section */}
        <View style={[styles.sectionContainer, styles.medicalSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin y tế</Text>
            <TouchableOpacity>
              <Image
                source={require('../../../../assets/icons/mdi_edit-circle.png')}
                style={styles.sectionActionIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <InfoRow 
              label="Nhóm máu" 
              value={userInfo.bloodType}
            />
            <Divider />
            <InfoRow 
              label="Dị ứng" 
              value={userInfo.allergy}
              hasBottomDivider
            />
            <Divider />
            <InfoRow 
              label="Tình trạng bệnh lý" 
              value={userInfo.medicalCondition}
              hasBottomDivider
            />
            <Divider />
            <InfoRow 
              label="Thuốc đang dùng" 
              value={userInfo.medications}
            />
          </View>
        </View>

        {/* Emergency Contacts Section */}
        <View style={[styles.sectionContainer, styles.emergencySection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Liên hệ khẩn cấp</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {userInfo.emergencyContacts.map((contact) => (
            <View key={contact.id} style={styles.emergencyCard}>
              <View style={styles.contactInfo}>
                <View style={styles.contactIconContainer}>
                  <Image
                    source={require('../../../../assets/icons/Frame 3580.png')}
                    style={styles.contactIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
              </View>
              <TouchableOpacity style={styles.phoneButton}>
                <Image
                  source={require('../../../../assets/icons/Frame  483625.png')}
                  style={styles.phoneIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.bottomHelper} />
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, value, onPress }) => {
  const content = (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};

const Divider = () => <View style={styles.horizontalDivider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  medicalSection: {
    marginTop: 20,
  },
  emergencySection: {
    marginTop: 20,
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  sectionActionIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  addButtonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  infoBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray,
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    flex: 1,
    textAlign: 'right',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  emergencyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactIcon: {
    width: 24,
    height: 24,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  phoneButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneIcon: {
    width: 40,
    height: 40,
  },
  bottomHelper: {
    height: 80,
  },
});
