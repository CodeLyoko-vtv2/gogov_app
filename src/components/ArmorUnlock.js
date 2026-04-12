import { Ionicons } from '@expo/vector-icons';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ArmorUnlock({ visible, onClose }) {
  return (
    <Modal transparent visible={visible} animationType="fade">

      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* ICON */}
          <View style={styles.iconWrap}>
            <View style={styles.iconBg} />
            <Ionicons name="checkmark" size={26} color="#16A34A" />
          </View>

          {/* TEXT */}
          <Text style={styles.title}>Trang bị đã mở khóa</Text>

          <Text style={styles.desc}>
            Hãy mặc bộ giáp cứu hộ để và bắt đầu nhiệm vụ ngay lập tức
          </Text>

          {/* BUTTON */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Đóng</Text>
          </TouchableOpacity>

        </View>
      </View>

    </Modal>
  );
}const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: 270,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
  },

  iconWrap: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  iconBg: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(236,109,19,0.5)',
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },

  desc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },

  button: {
    width: 200,
    height: 40,
    backgroundColor: '#16A34A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

});