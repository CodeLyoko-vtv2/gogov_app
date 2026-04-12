import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ArmorUnlock from './../../../components/ArmorUnlock';

const CHARACTER = require('../../../../assets/images/irman-removebg-preview 1.png');

export default function TrangBiScreen() {
  const router = useRouter();

  // 👇 THÊM STATE
  const [showUnlock, setShowUnlock] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>TRẠNG THÁI TRANG BỊ</Text>
      </View>

      {/* LOCK BADGE */}
      <View style={styles.lockBadge}>
        <Ionicons name="lock-closed" size={16} color="#FF3366" />
        <Text style={styles.lockText}>LOCKED</Text>
      </View>

      {/* CHARACTER */}
      <Image source={CHARACTER} style={styles.character} />

      {/* DESCRIPTION */}
      <Text style={styles.desc}>
        Để đảm bảo an toàn và hiệu quả trong tình huống khẩn cấp,
        vui lòng kích hoạt bộ giáp cứu hộ ngay bây giờ
      </Text>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowUnlock(true)}
      >
        <Text style={styles.buttonText}>MỞ KHÓA TRANG BỊ</Text>
      </TouchableOpacity>

      {/* 🔥 MODAL */}
      <ArmorUnlock
        visible={showUnlock}
        onClose={() => {
          setShowUnlock(false);
          router.push('KichHoatTrangBi2'); // 👈 chuyển sang screen ACTIVE
        }}
      />

    </SafeAreaView>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', // 🔥 fix lệch trái
  },

  header: {
    marginTop: 60,
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
  },

  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#FF3366',
    backgroundColor: 'rgba(255,51,102,0.1)',
    marginTop: 15,

    // 🔥 glow giống figma
    shadowColor: '#FF3366',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },

  lockText: {
    color: '#FF3366',
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 1,
  },

  character: {
    width: 260,
    height: 480,
    resizeMode: 'contain',
    marginTop: 20,
  },

  desc: {
    width: '85%',
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 10,
  },

  button: {
    width: '85%',
    height: 60,
    backgroundColor: '#16A34A',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});