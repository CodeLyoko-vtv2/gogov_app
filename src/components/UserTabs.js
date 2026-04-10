// src/components/UserTabs.js
import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ImageBackground 
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { COLORS } from '../constants/colors';

export default function UserTabs({ activeRoute }) {
  const router = useRouter();
  const currentPath = usePathname();

  const isActive = (route) => activeRoute === route || currentPath === route;

  return (
    <View style={styles.tabContainer}>
      
      {/* NÚT MICRO NỔI LÊN - ĐƯỢC LÀM TO RA VÀ LÚN SÂU VÀO TRONG */}
      <View style={styles.micButtonContainer}>
        <TouchableOpacity style={styles.micButton} activeOpacity={0.8}>
          <Image 
            source={require('../../assets/icons/Group 1.png')} 
            style={styles.micIcon} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      </View>

      {/* ẢNH NỀN THANH TAB */}
      <ImageBackground 
        source={require('../../assets/icons/Subtract.png')} 
        style={styles.tabBackground}
        resizeMode="stretch" 
      >
        <View style={styles.tabsContent}>
          
          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/HomeSOS')}>
            <Image 
              source={require('../../assets/icons/Home.png')} 
              style={[styles.tabIcon, isActive('/HomeSOS') && styles.activeIcon]} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/Network')}>
            <Image 
              source={require('../../assets/icons/Website.png')} 
              style={[styles.tabIcon, isActive('/Network') && styles.activeIcon]} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          {/* Khoảng trống nhường chỗ cho cụm Micro to hơn */}
          <View style={styles.centerSpace} />

          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/Call')}>
            <Image 
              source={require('../../assets/icons/Call.png')} 
              style={[styles.tabIcon, isActive('/Call') && styles.activeIcon]} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/CaiDat')}>
            <Image 
              source={require('../../assets/icons/Setting.png')} 
              style={[styles.tabIcon, isActive('/CaiDat') && styles.activeIcon]} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 110, // Thu gọn tổng chiều cao một chút để ôm sát hơn
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  tabBackground: {
    width: '100%',
    height: 85, // Giữ tỷ lệ chiều cao ảnh nền
  },
  tabsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 25, // Tăng lề 2 bên để giãn các icon ra, giúp chúng cân giữa phần phẳng của ảnh
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabIcon: {
    width: 32, // Icon to hơn (cũ là 28)
    height: 32,
    tintColor: '#000000',
  },
  activeIcon: {
    tintColor: COLORS.primary,
  },
  centerSpace: {
    width: 90, // Tăng khoảng trống để không đè vào mic to
  },
  micButtonContainer: {
    position: 'absolute',
    top: 8, // Hạ tọa độ Y xuống để lọt thỏm vào phần lõm của Subtract
    alignSelf: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  micButton: {
    width: 76, // Tăng đáng kể size mic (cũ là 65)
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    width: 76, 
    height: 76,
  }
});