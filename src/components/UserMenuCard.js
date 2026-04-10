// src/components/UserMenuCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import UserArrow from './UserArrow'; // Đã đổi tên thành UserArrow

export default function UserMenuCard({ iconSource, title, subtitle, onPress, hasShadow = false }) {
  return (
    <TouchableOpacity 
      style={[styles.cardItem, hasShadow && styles.shadowCard]} 
      activeOpacity={0.7} 
      onPress={onPress}
    >
      <View style={styles.cardLeft}>
        <View style={styles.iconBox}>
          <Image source={iconSource} style={styles.itemIcon} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      {/* Gọi Component mũi tên */}
      <UserArrow />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 16,
  },
  shadowCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderColor: 'transparent', 
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF0F0', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary, 
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666666',
  }
});