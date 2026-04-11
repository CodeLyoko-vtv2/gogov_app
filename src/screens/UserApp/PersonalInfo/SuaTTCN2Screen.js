import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
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
};

export default function SuaTTCN2Screen() {
  const [formData, setFormData] = useState({
    name: 'Nguyễn Vũ Huy',
    dob: '01/04/2004',
    gender: 'Chưa có',
    phone: '0373224840',
    role: 'Người dân',
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
          {/* Full Name */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData.name}</Text>
            </View>
          </View>

          {/* Date of Birth */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày sinh</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData.dob}</Text>
            </View>
          </View>

          {/* Gender */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => router.push('/SuaTTCN3')}
            >
              <Text style={styles.input}>{formData.gender}</Text>
              <View style={styles.dropdownIcon}>
                <Text style={{ fontSize: 16 }}>▼</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Phone Number */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData.phone}</Text>
            </View>
          </View>

          {/* Role */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Vai trò</Text>
            <View style={[styles.inputContainer, styles.disabledInputContainer]}>
              <Text style={styles.input}>{formData.role}</Text>
              <View style={styles.dropdownIcon}>
                <Text style={{ fontSize: 16 }}>▼</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.bgInput,
    paddingHorizontal: 16,
    height: 46,
  },
  disabledInputContainer: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
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
  },
  readOnlyText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  dropdownIcon: {
    marginLeft: 10,
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
