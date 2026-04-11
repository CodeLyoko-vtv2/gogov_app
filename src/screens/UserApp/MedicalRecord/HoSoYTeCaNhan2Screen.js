import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import UserHeader from '../../../components/UserHeader';

const COLORS = {
  primary: '#EF4444',
  white: '#FFF',
  black: '#000',
  gray: '#8A8888',
  lightGray: '#DADADA',
  bgInput: '#F9FAFB',
};

export default function HoSoYTeScreen() {
  const [formData, setFormData] = useState({
    blood: '',
    allergy: '',
    health: '',
    medicine: '',
  });

  const handleSave = () => {
    console.log('Medical Data:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader 
        title="HỒ SƠ Y TẾ"
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView}>
        
        <Text style={styles.desc}>
          Thông tin này có thể cứu sống bạn trong trường hợp khẩn cấp
        </Text>

      
        <View style={styles.formGroup}>
  <Text style={styles.label}>Nhóm máu</Text>

  {/* Input */}
  <View style={[styles.inputBox, styles.bloodBox]}>
    <Text style={styles.placeholder}>Chọn nhóm máu</Text>
    <Feather name="chevron-down" size={18} color="#222" style={styles.dropdownIcon} />
  </View>

  {/* RECTANGLE HIỂN THỊ SẴN - nhấn vào sẽ chuyển sang màn hình tiếp theo */}
  <TouchableOpacity
    style={styles.staticBox}
    activeOpacity={0.8}
    onPress={() => router.push('/HoSoYTeCaNhan3')}
  >
    <Text style={styles.item}>Nhóm máu A</Text>
    <Text style={styles.item}>Nhóm máu B</Text>
    <Text style={styles.item}>Nhóm máu O</Text>
    <Text style={styles.item}>Nhóm máu AB</Text>
  </TouchableOpacity>
</View>

        {/* Dị ứng */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Dị ứng</Text>
          <View style={[styles.inputBox, styles.textArea, { backgroundColor: '#F3F3F3', opacity: 0.5 }]}> 
            <Text style={styles.placeholder}>Ví dụ: Dị ứng hải sản, đậu phộng,....</Text>
          </View>
        </View>

        {/* Tình trạng sức khỏe */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tình trạng sức khỏe</Text>
          <View style={[styles.inputBox, styles.textArea, { backgroundColor: '#F3F3F3', opacity: 0.5 }]}> 
            <Text style={styles.placeholder}>Ví dụ: Bệnh tim, tiểu đường loại 2,...</Text>
          </View>
        </View>

        {/* Thuốc */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Thuốc đang dùng</Text>
          <View style={[styles.inputBox, styles.textArea, { backgroundColor: '#F3F3F3', opacity: 0.5 }]}> 
            <Text style={styles.placeholder}>Ví dụ: Insulin, Aspirin hằng ngày,...</Text>
          </View>
        </View>

        

        {/* Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Lưu thông tin</Text>
        </TouchableOpacity>

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
    paddingHorizontal: 20,
  },
  desc: {
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 8,
  },
  staticBox: {
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.1)',
  borderRadius: 10,
  backgroundColor: COLORS.white,
  marginTop: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
},

item: {
  fontSize: 16,
  color: COLORS.black,
  marginBottom: 6,
},
  inputBox: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  bloodBox: {
    paddingRight: 40, // space for icon
  },
  dropdownIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -9, // half icon size for vertical center
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  placeholder: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});