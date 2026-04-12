import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/src/constants/colors';

// Assets
const AVATAR = require('../../../../assets/images/Ellipse 9.png');
const MAP = require('../../../../assets/images/map-alert.png');

export default function Home1Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* 1. HEADER (Avatar + Title + Settings) */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.push('/ThongTinDoi')}>
              <Image source={AVATAR} style={styles.avatar} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chiến đội cứu hộ</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/CaiDat')}>
            <Ionicons name="settings-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 2. TRẠNG THÁI TÁC CHIẾN */}
          <View style={styles.statusRow}>
            <TouchableOpacity style={styles.activeStatus}>
              <Text style={styles.activeText}>Sẵn sàng</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.inactiveText}>Đang làm nhiệm vụ</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.inactiveText}>Tạm nghỉ</Text>
            </TouchableOpacity>
          </View>

          {/* 3. CARD THỐNG KÊ (Đổ bóng 25% chuẩn Figma) */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/NVXuLy')}
            >
              <Text style={styles.cardTitle}>Nhiệm vụ chờ xử lý</Text>
              <Text style={styles.cardNumber}>3</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/ChiTietNV')}
            >
              <Text style={styles.cardTitle}>Nhiệm vụ đang diễn ra</Text>
              <Text style={styles.cardNumber}>1</Text>
            </TouchableOpacity>
          </View>

          {/* 4. THANH HỖ TRỢ (SUPPORT BAR) */}
          <TouchableOpacity
            style={styles.supportBar}
            onPress={() => router.push('/YeuCauVatTu')}
          >
            <View style={styles.supportContent}>
              <MaterialCommunityIcons name="headset" size={22} color="#000" />
              <Text style={styles.supportText}>Yêu cầu hỗ trợ</Text>
            </View>
          </TouchableOpacity>

          {/* 5. BẢN ĐỒ KHU VỰC */}
          <View style={styles.mapWrapper}>
            <Image source={MAP} style={styles.mapImage} resizeMode="cover" />
          </View>

          {/* 6. THÔNG BÁO KHẨN CẤP */}
          <Text style={styles.sectionTitle}>Thông báo khẩn cấp</Text>

          {/* DANH SÁCH CẢNH BÁO */}
          <TouchableOpacity style={styles.alertCard}>
            <View style={styles.alertIconBox}>
              <Ionicons name="warning-outline" size={26} color={COLORS.RESCUE_ORANGE} />
            </View>
            <View style={styles.alertInfo}>
              <Text style={styles.alertTitle}>Rò rỉ phóng xạ tại 470 Trần Đại Nghĩa</Text>
              <Text style={styles.alertSub}>Yêu cầu đội số 1 hỗ trợ</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.alertCard}>
            <View style={styles.alertIconBox}>
              <Ionicons name="headset-outline" size={26} color="#000" />
            </View>
            <View style={styles.alertInfo}>
              <Text style={styles.alertTitle}>Đội Beta cần hỗ trợ</Text>
              <Text style={styles.alertSub}>Cần thêm nhân lực tại hiện trường cháy</Text>
            </View>
          </TouchableOpacity>

          {/* Khoảng trống để không bị che bởi NavBar của sếp */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RESCUE_BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 120,
    paddingTop: 60,
    paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#000',
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    gap: 15,
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  activeStatus: {
    backgroundColor: COLORS.RESCUE_ORANGE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: COLORS.RESCUE_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  activeText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
  inactiveText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    minHeight: 115,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    lineHeight: 22,
  },
  cardNumber: {
    fontSize: 34,
    fontWeight: '900',
    color: '#000',
    marginTop: 12,
  },
  supportBar: {
    width: '90%',
    height: 52,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  supportText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },
  mapWrapper: {
    width: '90%',
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    color: '#000',
    marginTop: 30,
    marginBottom: 5,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 18,
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertIconBox: {
    marginRight: 15,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000',
    lineHeight: 20,
  },
  alertSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginTop: 4,
  },
});