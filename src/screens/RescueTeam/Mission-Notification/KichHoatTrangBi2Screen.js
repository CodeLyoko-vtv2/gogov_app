import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


const CHARACTER = require('../../../../assets/images/irman-removebg-preview 2.png');

export default function KichHoatTrangBi2() {
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark-outline" size={28} color="#fff" />
        <Text style={styles.headerText}>TRẠNG THÁI TRANG BỊ</Text>
      </View>

      {/* STATUS */}
      <View style={styles.status}>
        <Ionicons name="lock-open-outline" size={16} color="#33FF85" />
        <Text style={styles.statusText}>ACTIVE</Text>
      </View>

      {/* CHARACTER + HUD */}
      <View style={styles.characterWrapper}>

        {/* CHARACTER */}
        <Image source={CHARACTER} style={styles.character} />

        {/* HUD OVERLAY (Group 483770) */}
        <View style={styles.hudContainer}>

          {/* LEFT */}
          <View style={styles.leftHud}>

            <Text style={styles.hudLabel}>REMAINING ENERGY</Text>

            <View style={styles.energyBar}>
              <View style={styles.energyFill} />
            </View>

            <Text style={styles.hudValue}>85%</Text>

            <View style={styles.section}>
              <Text style={styles.hudSub}>GPS TRACKING</Text>
              <Text style={styles.hudText}>
                LINK ESTABLISHED // SECTOR 7
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.hudSub}>SIGNAL LEVEL</Text>
              <Text style={styles.hudText}>-64 dBm</Text>
            </View>

          </View>

          {/* RIGHT */}
          <View style={styles.rightHud}>

            <View style={styles.sectionRight}>
              <Text style={styles.hudSub}>ENVIRONMENT TEMP</Text>
              <Text style={styles.hudText}>24°C // NOMINAL</Text>
            </View>

            <View style={styles.sectionRight}>
              <Text style={styles.hudSub}>EST. RUNTIME</Text>
              <Text style={styles.runtime}>04:12:00</Text>
            </View>

            <View style={styles.bioBox}>
              <Text style={styles.hudSub}>BIOMETRICS</Text>
              <Text style={styles.bioText}>HEART RATE: 72 BPM</Text>
              <Text style={styles.bioStable}>STABLE</Text>
            </View>

          </View>

        </View>

      </View>

      {/* DESCRIPTION */}
      <Text style={styles.desc}>
        Hãy mặc bộ giáp cứu hộ để kích hoạt toàn bộ chức năng hỗ trợ và bắt đầu nhiệm vụ ngay lập tức
      </Text>

      {/* BUTTON */}
     <TouchableOpacity
  style={styles.button}
  onPress={() => router.replace('/ThongBaoAlert2')} // 👈 chuyển màn
>
  <Text style={styles.buttonText}>BẮT ĐẦU NHIỆM VỤ</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
}const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },

  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 10,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#33FF85',
    backgroundColor: 'rgba(51,255,105,0.1)',
  },

  statusText: {
    color: '#33FF85',
    marginLeft: 8,
    fontWeight: '700',
  },

  characterWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },

  character: {
    width: 260,
    height: 480,
    resizeMode: 'contain',
  },

  /* HUD */
  hudContainer: {
    position: 'absolute',
    top: 80,
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftHud: {
    width: 150,
  },

  rightHud: {
    width: 150,
    alignItems: 'flex-end',
  },

  hudLabel: {
    color: 'rgba(0,229,255,0.6)',
    fontSize: 10,
  },

  hudSub: {
    color: 'rgba(0,229,255,0.4)',
    fontSize: 9,
  },

  hudText: {
    color: 'rgba(0,229,255,0.7)',
    fontSize: 11,
  },

  hudValue: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },

  runtime: {
    color: '#00E5FF',
    fontSize: 18,
    fontWeight: '300',
  },

  energyBar: {
    width: 120,
    height: 6,
    backgroundColor: 'rgba(0,229,255,0.1)',
    borderRadius: 3,
    marginTop: 4,
  },

  energyFill: {
    width: '85%',
    height: '100%',
    backgroundColor: '#00E5FF',
  },

  section: {
    marginTop: 16,
  },

  sectionRight: {
    marginTop: 16,
    alignItems: 'flex-end',
  },

  bioBox: {
    marginTop: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,229,255,0.2)',
    backgroundColor: 'rgba(0,229,255,0.05)',
    borderRadius: 4,
  },

  bioText: {
    color: '#fff',
    fontSize: 10,
  },

  bioStable: {
    color: '#00E5FF',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },

  desc: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  button: {
    marginTop: 20,
    width: 320,
    height: 60,
    backgroundColor: '#16A34A',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

});