import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Image 
} from 'react-native';

import { useRouter } from 'expo-router';

const RefreshIcon = require('../../assets/icons/Vector23.png');
const FilterIcon = require('../../assets/icons/Vector24.png');
const MapIcon = require('../../assets/icons/Vector25.png');
const AlertIcon = require('../../assets/icons/Vector26.png');

export default function RescueOptionModal({ isVisible, onClose, onOptionPress }) {
  const router = useRouter();

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.menuContainer}>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => onOptionPress('refresh')}>
              <Image source={RefreshIcon} style={styles.iconBase} />
              <Text style={styles.menuText}>Làm mới danh sách</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onOptionPress('filter')}>
              <Image source={FilterIcon} style={styles.iconBase} />
              <Text style={styles.menuText}>Cài đặt bộ lọc</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { router.push('/BanDoNhiemVu'); onClose(); }}>
              <Image source={MapIcon} style={styles.iconBase} />
              <Text style={styles.menuText}>Chế độ xem bản đồ</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => onOptionPress('report')}>
              <Image source={AlertIcon} style={styles.iconBase} />
              <Text style={styles.reportText}>Báo cáo sự cố</Text>
            </TouchableOpacity>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', // Giảm độ mờ nền một chút
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50, // Căn chỉnh gần Header 56px
    paddingRight: 16,
  },
  menuContainer: {
    width: 250, // Giảm từ 320 xuống 250
    backgroundColor: '#332D26',
    borderRadius: 16, // Bo góc nhỏ lại cho cân đối
    paddingVertical: 12, // Thu nhỏ padding
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10, // Giảm từ 14 xuống 10
  },
  iconBase: {
    width: 22, // Giảm size icon xuống 22px cho tinh tế
    height: 22,
    tintColor: '#FFF',
    marginRight: 12,
  },
  menuText: {
    fontSize: 16, // Font size 16 là chuẩn menu mobile
    fontWeight: '600',
    color: '#FFF',
  },
  reportText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E57373',
  },
  divider: {
    height: 1,
    backgroundColor: '#4D463E', // Màu divider mờ hơn cho sang
    marginVertical: 8,
  },
});