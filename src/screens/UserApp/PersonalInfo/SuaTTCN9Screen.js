import { router } from 'expo-router';
import React, { useEffect } from 'react';
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
  gray: '#8A8888',
  lightGray: '#DADADA',
  bgInput: '#F9FAFB',
  disabled: '#DADADA',
};

const userData = {
  name: 'Nguyễn Vũ Huy',
  dob: '01/04/2004',
  gender: 'Nam',
  phone: '0373224840',
  role: 'Tình nguyện viên',
};

export default function SuaTTCN9Screen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/SuaTTCN10');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleCancel = () => {
    router.push('/ThongTinCaNhan');
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader 
        title="SỬA THÔNG TIN" 
        onBackPress={() => router.push('/ThongTinCaNhan')}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar Only */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../../../assets/icons/Rectangle 4880.png')}
            style={styles.avatar}
          />
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Full Name - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{userData.name}</Text>
            </View>
          </View>

          {/* Date of Birth - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày sinh</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{userData.dob}</Text>
            </View>
          </View>

          {/* Gender - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{userData.gender}</Text>
            </View>
          </View>

          {/* Phone Number - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{userData.phone}</Text>
            </View>
          </View>

          {/* Role - Disabled */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Vai trò</Text>
            <View style={[styles.readOnlyContainer, styles.disabledContainer]}>
              <Text style={[styles.readOnlyText, styles.disabledText]}>
                {userData.role}
              </Text>
              <View style={styles.dropdownIcon}>
                <Text style={styles.disabledIconText}>▼</Text>
              </View>
            </View>
          </View>

          {/* Pending Status Message */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>*Đang chờ xử lý...</Text>
          </View>

          {/* Action Buttons - Disabled */}
          <TouchableOpacity
            style={[styles.button, styles.saveButtonDisabled]}
            disabled={true}
          >
            <Text style={styles.saveButtonDisabledText}>Lưu thay đổi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButtonDisabled]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonDisabledText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 21,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  formContainer: {
    paddingBottom: 120,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 8,
  },
  readOnlyContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.bgInput,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  readOnlyText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    flex: 1,
  },
  disabledContainer: {
    backgroundColor: COLORS.disabled,
  },
  disabledText: {
    color: COLORS.gray,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  disabledIconText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  button: {
    height: 49,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  saveButtonDisabled: {
    backgroundColor: 'rgba(224, 35, 35, 0.7)',
  },
  saveButtonDisabledText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cancelButtonDisabled: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  cancelButtonDisabledText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.7)',
  },
});
