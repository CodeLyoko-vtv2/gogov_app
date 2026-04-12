import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Navbar from '../../../components/NavBar';
const AVATAR = require('../../../../assets/images/Ellipse 9.png');
const MAP = require('../../../../assets/images/map-alert.png');

export default function Home1Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={AVATAR} style={styles.avatar} />
          <Text style={styles.title}>Chiến đội cứu hộ</Text>
        </View>

        <Ionicons name="settings-outline" size={24} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        {/* STATUS */}
        <View style={styles.statusRow}>
          <TouchableOpacity style={styles.activeStatus}>
            <Text style={styles.activeText}>Sẵn sàng</Text>
          </TouchableOpacity>

          <Text style={styles.inactiveText}>Đang làm nhiệm vụ</Text>
          <Text style={styles.inactiveText}>Tạm nghỉ</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nhiệm vụ chờ xử lý</Text>
            <Text style={styles.cardNumber}>3</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nhiệm vụ đang diễn ra</Text>
            <Text style={styles.cardNumber}>1</Text>
          </View>
        </View>

        {/* SUPPORT BUTTON */}
        <TouchableOpacity
          style={styles.supportBar}
          onPress={() => router.push('/ThongBaoAlert')}
        >
          <Text style={styles.supportText}>Yêu cầu hỗ trợ</Text>
        </TouchableOpacity>

        {/* MAP */}
        <Image source={MAP} style={styles.map} />

        {/* TITLE */}
        <Text style={styles.sectionTitle}>Thông báo khẩn cấp</Text>

        {/* ALERT */}
        <View style={styles.alertCard}>
          <Ionicons name="warning-outline" size={22} color="#EC6D13" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.alertTitle}>
              Rò rỉ phóng xạ tại 470 Trần Đại Nghĩa
            </Text>
            <Text style={styles.alertSub}>
              Yêu cầu đội số 1 hỗ trợ
            </Text>
          </View>
        </View>

        <View style={styles.alertCard}>
          <Ionicons name="people-outline" size={22} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.alertTitle}>
              Đội Beta cần hỗ trợ
            </Text>
            <Text style={styles.alertSub}>
              Cần thêm nhân lực tại hiện trường cháy
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* NAVBAR */}
      <Navbar />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
  },
supportBar: {
  width: '90%',
  height: 40,
  alignSelf: 'center',
  marginTop: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#000',
  backgroundColor: '#fff',

  justifyContent: 'center',
  alignItems: 'center',

  // shadow giống figma
  shadowColor: '#000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 4,
},

supportText: {
  fontSize: 14,
  fontWeight: '700',
},
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },

  activeStatus: {
    backgroundColor: '#F97316',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
  },

  activeText: {
    color: '#fff',
    fontWeight: '600',
  },

  inactiveText: {
    fontSize: 14,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },

  cardNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },

  map: {
    width: '90%',
    height: 160,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },

  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 15,
  },

  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },

  alertTitle: {
    fontWeight: '600',
  },

  alertSub: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },

  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
  },
});