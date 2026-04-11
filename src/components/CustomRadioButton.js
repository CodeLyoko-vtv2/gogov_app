import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CustomRadioButton({ 
  selected, 
  onPress, 
  size = 24, // Kích thước mặc định là 24x24
  containerStyle 
}) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress} 
      style={[
        styles.container, 
        { width: size, height: size }, 
        containerStyle
      ]}
    >
      <Image
        source={
          selected 
            ? require('../../assets/icons/Frame 3645.png') // Nền xanh, có tick
            : require('../../assets/icons/Frame 3646.png') // Viền xám, rỗng
        }
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});