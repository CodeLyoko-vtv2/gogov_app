// src/constants/DanhBa1Screen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import UserTabs from '../../../components/UserTabs';
import { COLORS } from '../../../constants/colors';

// DỮ LIỆU DANH BẠ (MOCK DATA)
const CONTACTS_DATA = [
  { id: '1', index: '1', name: 'Công An', phone: '113', color: COLORS.primary, canMessage: false, route: '' },
  { id: '2', index: '2', name: 'Cứu Hỏa', phone: '114', color: '#F77F00', canMessage: false, route: '' }, 
  { id: '3', index: '3', name: 'Cứu Thương', phone: '115', color: '#0077B6', canMessage: false, route: '' }, 
  { id: '4', index: '4', name: 'Mẹ', phone: '0922222222', color: '#2A9D8F', canMessage: true, route: '/DanhBa3' }, 
  { id: '5', index: '5', name: 'Ba', phone: '0933333333', color: '#111', canMessage: true, route: '' }, 
];

export default function DanhBaScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      {/* HEADER TỪ COMPONENT CHUNG */}
      <UserHeader title="DANH BẠ" onBackPress={() => router.replace('/HomeSOS') }/>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
        <View style={styles.contentPadding}>
          
          {/* TIÊU ĐỀ SECTION & NÚT THÊM */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Danh bạ đã lưu</Text>
            {/* ĐÃ CẬP NHẬT: Nút cộng được căn giữa cột nút gọi */}
            <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => router.push('/DanhBa2')}>
              <Image 
                source={require('../../../../assets/icons/octicon_feed-plus-16.png')} 
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>

          {/* DANH SÁCH LIÊN HỆ */}
          <View style={styles.listContainer}>
            {CONTACTS_DATA.map((contact) => (
              <View key={contact.id} style={styles.contactRow}>
                
                {/* 1. Số thứ tự (Màu động) */}
                <Text style={[styles.contactIndex, { color: contact.color }]}>
                  {contact.index}
                </Text>

                {/* 2. Thông tin Tên & Số điện thoại */}
                <View style={styles.infoContainer}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>

                {/* 3. Cụm nút Hành động */}
                <View style={styles.actionsContainer}>
                  
                  {/* Nút Nhắn tin (ĐÃ CẬP NHẬT: Hình tròn) */}
                  {contact.canMessage && (
                    <TouchableOpacity style={styles.messageButton} activeOpacity={0.7}>
                      <Image 
                        source={require('../../../../assets/icons/iconoir_message.png')} 
                        style={styles.messageIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}

                  {/* Nút Gọi (ĐÃ CẬP NHẬT: To hơn) */}
                  <TouchableOpacity 
                    style={styles.callButton} 
                    activeOpacity={0.8}
                    onPress={() => router.push(contact.route)}
                  >
                    <Image 
                      source={require('../../../../assets/icons/Call.png')} 
                      style={styles.callIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.callButtonText}>Gọi</Text>
                  </TouchableOpacity>

                </View>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* THANH ĐIỀU HƯỚNG BOTTOM TABS */}
      <UserTabs activeRoute="/Contacts" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  // --- Tiêu đề & Nút thêm ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  addButton: {
    padding: 5,
    marginRight: 25, // ĐÃ SỬA: Đẩy cách lề phải một chút để nằm thẳng trục với cột nút Gọi
  },
  addIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary, 
  },
  // --- Danh sách liên hệ ---
  listContainer: {
    flex: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  contactIndex: {
    fontSize: 28,
    fontWeight: '700',
    width: 40, 
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 16,
    color: '#000',
  },
  // --- Nút hành động ---
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Tăng nhẹ khoảng cách giữa 2 nút cho thoáng
  },
  messageButton: {
    width: 42,   // Tăng width/height một chút để cân bằng với nút gọi
    height: 42,
    backgroundColor: '#F3F4F6', 
    borderRadius: 21, // ĐÃ SỬA: Đổi thành hình tròn (bằng 1/2 kích thước)
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageIcon: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary, 
    paddingVertical: 10,   // ĐÃ SỬA: Tăng padding dọc (cũ là 8)
    paddingHorizontal: 22, // ĐÃ SỬA: Tăng padding ngang (cũ là 16)
    borderRadius: 25,      // ĐÃ SỬA: Tăng độ bo tròn cho mượt
  },
  callIcon: {
    width: 18, // Tăng size icon nhẹ theo kích thước nút
    height: 18,
    tintColor: COLORS.white, 
    marginRight: 6,
  },
  callButtonText: {
    color: COLORS.white,
    fontSize: 16, // Tăng size chữ nhẹ
    fontWeight: '600',
  },
});