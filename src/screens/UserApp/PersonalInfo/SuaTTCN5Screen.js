import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import UserHeader from '../../../components/UserHeader';

const COLORS = {
  primary: '#EF4444',
  white: '#FFF',
  black: '#000',
  gray: '#8A8888',
  lightGray: '#DADADA',
  bgInput: '#F9FAFB',
};

const userData = {
  name: 'Nguyễn Vũ Huy',
  dob: '01/04/2004',
  gender: 'Nam',
  phone: '0373224840',
};

export default function SuaTTCN5Screen() {
  const [formData, setFormData] = useState({
    name: userData.name,
    dob: userData.dob,
    gender: userData.gender,
    phone: userData.phone,
    volunteerStatus: 'Tình nguyện viên',
  });

  const handleSave = () => {
    console.log('Saved:', formData);
    router.push('/ThongTinCaNhan');
  };

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
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../../../assets/icons/Rectangle 4880.png')}
            style={styles.avatar}
          />
          <Text style={styles.nameText}>{formData.name}</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Full Name - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData.name}</Text>
            </View>
          </View>

          {/* Date of Birth - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày sinh</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData.dob}</Text>
            </View>
          </View>

          {/* Gender - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData.gender}</Text>
            </View>
          </View>

          {/* Phone Number - Read Only */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData.phone}</Text>
            </View>
          </View>

          {/* Role - Expanded Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Vai trò</Text>
            <View style={styles.dropdownField}>
              <View style={styles.dropdownSelectedBox}>
                <Text style={styles.dropdownSelectedText}>Người dân</Text>
                <Text style={styles.dropdownChevron}>⌄</Text>
              </View>
              <View style={styles.dropdownOptionsBox}>
                <TouchableOpacity onPress={() => router.push('/SuaTTCN6')}>
                  <Text style={styles.dropdownOptionText}>{formData.volunteerStatus}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgInput,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 21,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
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
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    minHeight: 46,
  },
  readOnlyText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  volunteersStatusText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  dropdownField: {
    gap: 10,
  },
  dropdownSelectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    minHeight: 58,
    paddingHorizontal: 24,
  },
  dropdownSelectedText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  dropdownChevron: {
    fontSize: 20,
    color: COLORS.black,
  },
  dropdownOptionsBox: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  dropdownOptionText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  button: {
    height: 49,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
});
