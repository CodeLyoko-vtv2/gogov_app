// src/screens/UserApp/Profile/LichSuSOSScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { COLORS } from '../../../constants/colors';

export default function LichSuSOSScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Image 
              source={require('../../../../assets/icons/Frame 2.png')} 
              style={styles.headerIcon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>LỊCH SỬ SOS</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.dateTitle}>9/4/2026, 17:28</Text>
          <View style={styles.divider} />

          <View style={styles.timelineContainer}>
            
            <View style={styles.timelineRow}>
              <Text style={styles.timeText}>17:28</Text>
              <View style={styles.iconColumn}>
                <Image 
                  source={require('../../../../assets/icons/Vector5.png')} 
                  style={styles.dotIcon} 
                  resizeMode="contain"
                />
                <View style={styles.verticalLine} />
              </View>
              <Text style={styles.eventText}>22 Mai Đăng Chơn, cháy</Text>
            </View>

            <View style={{ height: 35 }} />

            <View style={styles.timelineRow}>
              <Text style={styles.timeText}>17:40</Text>
              <View style={styles.iconColumn}>
                <Image 
                  source={require('../../../../assets/icons/Vector4.png')} 
                  style={styles.arrowIcon} 
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.eventText}>Đã cứu hộ hoàn thành</Text>
            </View>

          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    width: '100%', 
    backgroundColor: '#FEFAFB',
    paddingTop: 40, 
    paddingBottom: 25,
    shadowColor: '#CECECE',
    shadowOffset: { width: 0, height: 4.56 },
    shadowOpacity: 0.35,
    shadowRadius: 5.7,
    elevation: 5, 
    zIndex: 1, 
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
  },
  backButton: {
    padding: 5,
  },
  headerIcon: {
    width: 20, 
    height: 20,
    tintColor: COLORS.primary, 
  },
  headerTitle: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginTop: 15,
    marginBottom: 25,
  },
  timelineContainer: {
    paddingLeft: 5,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
  },
  timeText: {
    width: 45,
    fontSize: 14,
    color: '#999999',
    fontWeight: '500',
    marginTop: 1,
  },
  iconColumn: {
    width: 25,
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'relative',
  },
  dotIcon: {
    width: 10,
    height: 10,
    marginTop: 4,
  },
  verticalLine: {
    position: 'absolute',
    top: 18,
    bottom: -45,
    width: 1,
    backgroundColor: '#000000',
  },
  arrowIcon: {
    width: 8,
    height: 6,
    marginTop: 6,
    tintColor: '#000000',
  },
  eventText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  }
});