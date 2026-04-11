import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
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

export default function SuaTTCN6Screen() {
  const [formData, setFormData] = useState({
    name: userData.name,
    dob: userData.dob,
    gender: userData.gender,
    phone: userData.phone,
    role: 'Tình nguyện viên',
  });

  const [loadingVisible, setLoadingVisible] = useState(false);

  const handleSave = () => {
    console.log('Saved:', formData);
    setLoadingVisible(true);
  };

  const handleLoadingPress = () => {
    setLoadingVisible(false);
    router.replace('/SuaTTCN9');
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

          {/* Role - Blocked */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Vai trò</Text>
            <View style={[styles.inputContainer, styles.disabledInputContainer]}>
              <Text style={styles.input}>{formData.role}</Text>
              <View style={styles.dropdownIcon}>
                <Text style={{ fontSize: 16 }}>▼</Text>
              </View>
            </View>
          </View>

          <Modal
            visible={loadingVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleLoadingPress}
          >
            <Pressable style={styles.loadingOverlay} onPress={handleLoadingPress}>
              <View style={styles.loadingFrameWrapper}>
                <Image
                  source={require('../../../../assets/icons/Frame 483700.png')}
                  style={styles.loadingFrameImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.loadingCloseHitbox}
                  onPress={handleLoadingPress}
                />
              </View>
            </Pressable>
          </Modal>

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
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  disabledInputContainer: {
    opacity: 0.6,
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
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingFrameWrapper: {
    width: 320,
    height: 350,
  },
  loadingFrameImage: {
    width: '100%',
    height: '100%',
  },
  loadingCloseHitbox: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 40,
    height: 40,
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
