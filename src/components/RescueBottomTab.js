// src/components/RescueBottomTab.js
import { Colors } from '@/constants/theme';
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { COLORS } from '../constants/colors';

const BG_COLOR = '#121212';
const BG_COLOR_LIGHT = '#1E1E1E';
const ICON_INACTIVE = '#888888';
const ICON_ACTIVE = '#FFFFFF';

export default function RescueBottomTab({ state, descriptors, navigation }) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [tabBarWidth, setTabBarWidth] = useState(0); 
  const tabWidth = tabBarWidth > 0 ? tabBarWidth / state.routes.length : 0;

  useEffect(() => {
    if (tabWidth > 0) {
      Animated.spring(slideAnim, {
        toValue: state.index * tabWidth,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [state.index, tabWidth]);

  return (
    <View 
      onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width)}
      style={styles.container} 
      pointerEvents="box-none"
    >
      {/* LAYER 1: NỀN ĐEN */}
      <View style={styles.tabBarBackground} />

      {/* LAYER 2: SUBTRACT1 (Rãnh trượt) */}
      {tabWidth > 0 && (
        <Animated.View 
          style={[
            styles.cutoutWrapper, 
            { width: tabWidth, transform: [{ translateX: slideAnim }] }
          ]}
        >
          <Image 
            source={require('../../assets/icons/Subtract1.png')} 
            style={styles.cutoutImage}
            tintColor={BG_COLOR_LIGHT} 
            resizeMode="stretch"
          />
        </Animated.View>
      )}

      {/* LAYER 3: ICONS */}
      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconSource;
          if (index === 0) iconSource = require('../../assets/icons/fi-rr-home.png');
          else if (index === 1) iconSource = require('../../assets/icons/fi-rr-chart-pie-alt.png');
          else if (index === 2) iconSource = require('../../assets/icons/Vector18.png'); 
          else if (index === 3) iconSource = require('../../assets/icons/Vector17.png'); 

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={1} 
            >
              <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
                <Image
                  source={iconSource}
                  style={[styles.icon, { tintColor: isFocused ? ICON_ACTIVE : ICON_INACTIVE }]}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 70, // Cố định luôn cho khỏe
    
  },
  tabBarBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80, // Cố định
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 5, 
    borderTopRightRadius: 5,
  },
  cutoutWrapper: {
    position: 'absolute',
    left: 0,
    top: -10, 
    height: 80,
    alignItems: 'center', 
    justifyContent: 'flex-start',
    zIndex: 1, 
  },
  cutoutImage: {
    width: 95, 
    height: 50,
  },
  tabsRow: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    width: '100%', // Giữ nguyên con số 121% của bạn
    height: 70, 
    zIndex: 2, 
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    transform: [{ translateY: 5 }], 
    backgroundColor: 'transparent',
    
  },
  iconContainerActive: {
    backgroundColor: '#F27A3A',
    transform: [{ translateY: -15 }], 
  },
  icon: {
    width: 24,
    height: 24,
  },
});