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

// Icons cũ
const MapIcon = require('../../assets/icons/Vector25.png');
const AlertIcon = require('../../assets/icons/Vector26.png');

// Icon Lịch sử mới sếp vừa gửi (Vector34)
const HistoryIcon = require('../../assets/icons/Vector34.png');

export default function RescueOptionModal2({ isVisible, onClose, onOptionPress }) {
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
            
            {/* 1. Xem Lịch sử (Tính năng mới) */}
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => { router.push('/LichSuNhiemVu'); onClose(); }}
            >
              <Image source={HistoryIcon} style={styles.iconBase} />
              <Text style={styles.menuText}>Lịch sử nhiệm vụ</Text>
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
    backgroundColor: 'rgba(0,0,0,0.2)', 
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50, 
    paddingRight: 16,
  },
  menuContainer: {
    width: 240, // Ép cân xuống một chút cho gọn
    backgroundColor: '#332D26', // Màu nâu đen đặc trưng
    borderRadius: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 16,
    // Đổ bóng chuẩn Figma
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5, 
  },
  iconBase: {
    width: 22, 
    height: 22,
    tintColor: '#FFF', // Ép icon Vector34 sang trắng cho đồng bộ
    marginRight: 12,
  },
  menuText: {
    fontSize: 16, 
    fontWeight: '600',
    color: '#FFF',
  },
  reportText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E57373', // Màu đỏ hồng của Vector26
  },
  divider: {
    height: 1,
    backgroundColor: '#4D463E', 
    marginVertical: 8,
  },
});