import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
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

const GENDERS = ['Nam', 'Nữ', 'Khác'];
export default function SuaThongTinCaNhanScreen() {
  const [formData, setFormData] = useState({
    name: 'Nguyễn Vũ Huy',
    dob: 'mm/dd/yyyy',
    gender: 'Chưa có',
    phone: '0373224840',
    role: 'Người dân',
  });

  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const handleSave = () => {
    console.log('Saved:', formData);
    router.push('/ThongTinCaNhan');
  };

  const handleCancel = () => {
    router.push('/ThongTinCaNhan');
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
    setGenderModalVisible(false);
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
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => router.push('/SuaTTCN2')}
            >
              <Text style={styles.dropdownText}>{formData.dob}</Text>
              <Text style={styles.dropdownArrow}>⋎</Text>
            </TouchableOpacity>
          </View>

          {/* Gender */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <TouchableOpacity
  style={styles.inputContainer}
  disabled={true} // ✅ block click
>
              <Text style={styles.dropdownText}>{formData.gender}</Text>
              <Text style={styles.dropdownArrow}>⋎</Text>
            </TouchableOpacity>
          </View>

          {/* Gender Picker Modal */}
          <Modal
            visible={genderModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setGenderModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Chọn giới tính</Text>
                {GENDERS.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={styles.modalOption}
                    onPress={() => handleGenderSelect(gender)}
                  >
                    <Text style={styles.modalOptionText}>{gender}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          {/* Phone */}
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
              <Text style={styles.dropdownText}>{formData.role}</Text>
              <Text style={styles.dropdownArrow}>⋎</Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomHelper} />
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
    paddingHorizontal: 20,
  },
  profileSection: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
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
    marginBottom: 40,
  },
  formGroup: {
    marginBottom: 25,
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
  dropdownText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  dropdownArrow: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  bottomHelper: {
    height: 80,
  },
});
