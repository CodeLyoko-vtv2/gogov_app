import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    PanResponder,
    StyleSheet,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SlideToRespond({
  onSlideComplete = () => {},
  text = 'Trượt để phản hồi',
}) {
  const trackWidth = width - 48;
  const thumbSize = 60;
  const padding = 7;

  const maxTranslate = trackWidth - thumbSize - padding * 2;

  const translate = useRef(new Animated.Value(0)).current;

  // fade text theo drag
  const textOpacity = translate.interpolate({
    inputRange: [0, maxTranslate * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        const x = Math.max(0, Math.min(maxTranslate, gesture.dx));
        translate.setValue(x);
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > maxTranslate * 0.7) {
          // auto chạy tới cuối
          Animated.timing(translate, {
            toValue: maxTranslate,
            duration: 180,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }).start(() => {
            onSlideComplete(); // 👉 chuyển screen
            translate.setValue(0); // reset
          });
        } else {
          Animated.spring(translate, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.track}>
      {/* TEXT */}
      <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
        {text}
      </Animated.Text>

      {/* THUMB */}
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX: translate }],
          },
        ]}
        {...panResponder.panHandlers}
      >
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 70,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
  },
  thumb: {
    position: 'absolute',
    left: 7,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 20,
    fontWeight: '800',
  },
});