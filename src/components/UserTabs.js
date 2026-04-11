// src/components/UserTabs.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { COLORS } from '../constants/colors';

export default function UserTabs({ activeRoute, isRecording = false }) {
  const router = useRouter();
  const currentPath = usePathname();

  const isActive = (route) => activeRoute === route || currentPath === route;

  const handleNavigation = (route) => {
    if (!isActive(route)) {
      router.replace(route); // Chuyển trang tức thì 0s vì đã chỉnh trong layout
    }
  };

  return (
    <View style={styles.tabContainer}>
      <View style={styles.micButtonContainer}>
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => {
            // Nếu đang recording thì chuyển sang màn hình Đã gửi tín hiệu, 
            // ngược lại thì mới vào màn hình SOSVoice để bắt đầu ghi âm.
            const targetRoute = isRecording ? '/DaGuiTinHieu3' : '/SOSVoice';
            handleNavigation(targetRoute);
          }}
        >
          <Image
            source={isRecording ? require('../../assets/icons/Group 2.png') : require('../../assets/icons/Group 1.png')}
            style={styles.micIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ImageBackground source={require('../../assets/icons/Subtract.png')} style={styles.tabBackground} resizeMode="stretch">
        <View style={styles.tabsContent}>
          <TouchableOpacity style={styles.tabItem} onPress={() => handleNavigation('/HomeSOS')}>
            <Image source={require('../../assets/icons/Home.png')} style={[styles.tabIcon, isActive('/HomeSOS') && styles.activeIcon]} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => handleNavigation('/TinTucTheGioi')}>
            <Image source={require('../../assets/icons/Website.png')} style={[styles.tabIcon, isActive('/TinTucTheGioi') && styles.activeIcon]} resizeMode="contain" />
          </TouchableOpacity>
          <View style={styles.centerSpace} />
          <TouchableOpacity style={styles.tabItem} onPress={() => handleNavigation('/Call')}>
            <Image source={require('../../assets/icons/Call.png')} style={[styles.tabIcon, isActive('/Call') && styles.activeIcon]} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => handleNavigation('/CaiDat')}>
            <Image source={require('../../assets/icons/Setting.png')} style={[styles.tabIcon, isActive('/CaiDat') && styles.activeIcon]} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

// ... StyleSheet giữ nguyên như cũ ...
const styles = StyleSheet.create({
  tabContainer: { position: 'absolute', bottom: 0, width: '100%', height: 110, justifyContent: 'flex-end', backgroundColor: 'transparent' },
  tabBackground: { width: '100%', height: 85 },
  tabsContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%', paddingHorizontal: 25 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  tabIcon: { width: 32, height: 32, tintColor: '#000000' },
  activeIcon: { tintColor: COLORS.primary },
  centerSpace: { width: 90 },
  micButtonContainer: { position: 'absolute', top: 8, alignSelf: 'center', zIndex: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  micButton: { width: 76, height: 76, borderRadius: 38, justifyContent: 'center', alignItems: 'center' },
  micIcon: { width: 76, height: 76 }
});