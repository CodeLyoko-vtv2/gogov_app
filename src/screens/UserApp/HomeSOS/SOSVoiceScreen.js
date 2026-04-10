// src/screens/UserApp/HomeSOS/SOSVoiceScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

import UserHeader from '../../../components/UserHeader';
import UserTabs from '../../../components/UserTabs';
import { COLORS } from '../../../constants/colors';

export default function SOSVoiceScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <UserHeader 
        title="GHI ÂM" 
        onBackPress={() => router.replace('/HomeSOS')} // Về Home trong 0 giây
      />

      <View style={styles.content}>
        <Text style={styles.listeningText}>Đang lắng nghe ...</Text>
        <View style={styles.micContainer}>
          <Image 
            source={require('../../../../assets/icons/Group 174.png')}
            style={styles.bigMicImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <UserTabs isRecording={true} activeRoute="/SOSVoice" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60, 
  },
  listeningText: {
    fontSize: 30, 
    fontWeight: '700', // Đã thêm dấu nháy đơn cho '700' để tránh Warning của React Native
    color: '#000000',
    marginBottom: 60, 
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigMicImage: {
    width: 320, 
    height: 320,
  }
});