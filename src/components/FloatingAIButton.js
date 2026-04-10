import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
    Animated,
    Image,
    PanResponder,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";

const STORAGE_KEY = "floating_ai_button_position_v1";
const BUTTON_SIZE = 56;
const EDGE_MARGIN = 24;
const INACTIVITY_MS = 3000;

const AnimatedView = Animated.View;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function parseStoredPosition(raw) {
  if (typeof raw !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.x === "number" &&
      Number.isFinite(parsed.x) &&
      typeof parsed.y === "number" &&
      Number.isFinite(parsed.y)
    ) {
      return { x: parsed.x, y: parsed.y };
    }

    return null;
  } catch {
    return null;
  }
}

function getDefaultPosition(width, height) {
  return {
    x: Math.max(EDGE_MARGIN, width - BUTTON_SIZE - EDGE_MARGIN),
    y: Math.max(EDGE_MARGIN, height - BUTTON_SIZE - EDGE_MARGIN),
  };
}

/**
 * @param {{
 * onPress?: () => void,
 * isListening?: boolean,
 * hasNotification?: boolean,
 * position?: { x: number, y: number } | null,
 * }} props
 */
export default function FloatingAIButton({
  onPress,
  isListening = false,
  hasNotification = false,
  position = null,
} = {}) {
  const { width, height } = useWindowDimensions();
  const defaultPosition = useMemo(
    () => getDefaultPosition(width, height),
    [width, height],
  );

  const pan = useRef(
    new Animated.ValueXY(
      position &&
        typeof position.x === "number" &&
        typeof position.y === "number"
        ? position
        : defaultPosition,
    ),
  ).current;

  const opacity = useRef(new Animated.Value(1)).current;
  const entryScale = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;

  const inactivityTimerRef = useRef(null);
  const startPositionRef = useRef(defaultPosition);

  const maxX = Math.max(EDGE_MARGIN, width - BUTTON_SIZE - EDGE_MARGIN);
  const maxY = Math.max(EDGE_MARGIN, height - BUTTON_SIZE - EDGE_MARGIN);

  const resetInactivity = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    inactivityTimerRef.current = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0.45,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }, INACTIVITY_MS);
  }, [opacity]);

  const persistPosition = async (nextPosition) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosition));
    } catch {
      // Ignore storage write errors to avoid blocking interactions.
    }
  };

  useEffect(() => {
    resetInactivity();

    Animated.spring(entryScale, {
      toValue: 1,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [entryScale, resetInactivity]);

  useEffect(() => {
    let mounted = true;

    const restorePosition = async () => {
      if (
        position &&
        typeof position.x === "number" &&
        typeof position.y === "number"
      ) {
        const clamped = {
          x: clamp(position.x, EDGE_MARGIN, maxX),
          y: clamp(position.y, EDGE_MARGIN, maxY),
        };
        pan.setValue(clamped);
        startPositionRef.current = clamped;
        return;
      }

      try {
        const savedRaw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted) {
          return;
        }

        const savedPosition = parseStoredPosition(savedRaw);
        const base = savedPosition || defaultPosition;
        const clamped = {
          x: clamp(base.x, EDGE_MARGIN, maxX),
          y: clamp(base.y, EDGE_MARGIN, maxY),
        };
        pan.setValue(clamped);
        startPositionRef.current = clamped;
      } catch {
        const clamped = {
          x: clamp(defaultPosition.x, EDGE_MARGIN, maxX),
          y: clamp(defaultPosition.y, EDGE_MARGIN, maxY),
        };
        pan.setValue(clamped);
        startPositionRef.current = clamped;
      }
    };

    restorePosition();

    return () => {
      mounted = false;
    };
  }, [position, defaultPosition, maxX, maxY, pan]);

  useEffect(() => {
    if (!isListening) {
      pulseScale.stopAnimation();
      pulseScale.setValue(1);
      return;
    }

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.15,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseLoop.start();

    return () => {
      pulseLoop.stop();
      pulseScale.setValue(1);
    };
  }, [isListening, pulseScale]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3;
        },
        onPanResponderGrant: () => {
          resetInactivity();
          pan.stopAnimation((value) => {
            startPositionRef.current = value;
          });
        },
        onPanResponderMove: (_, gestureState) => {
          const nextX = clamp(
            startPositionRef.current.x + gestureState.dx,
            EDGE_MARGIN,
            maxX,
          );
          const nextY = clamp(
            startPositionRef.current.y + gestureState.dy,
            EDGE_MARGIN,
            maxY,
          );
          pan.setValue({ x: nextX, y: nextY });
        },
        onPanResponderRelease: (_, gestureState) => {
          resetInactivity();
          const distance = Math.hypot(gestureState.dx, gestureState.dy);

          if (distance < 6) {
            onPress?.();
            return;
          }

          const currentX = clamp(
            startPositionRef.current.x + gestureState.dx,
            EDGE_MARGIN,
            maxX,
          );
          const currentY = clamp(
            startPositionRef.current.y + gestureState.dy,
            EDGE_MARGIN,
            maxY,
          );

          const snapX =
            currentX + BUTTON_SIZE / 2 < width / 2 ? EDGE_MARGIN : maxX;
          const snapY = clamp(currentY, EDGE_MARGIN, maxY);

          Animated.spring(pan, {
            toValue: { x: snapX, y: snapY },
            friction: 8,
            tension: 80,
            useNativeDriver: true,
          }).start(() => {
            startPositionRef.current = { x: snapX, y: snapY };
            persistPosition({ x: snapX, y: snapY });
          });
        },
      }),
    [maxX, maxY, onPress, pan, resetInactivity, width],
  );

  return (
    <AnimatedView
      style={[
        styles.container,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: Animated.multiply(entryScale, pulseScale) },
          ],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.buttonSurface}>
        <Image
          source={require("../../assets/icons/icon-ai.png")}
          style={styles.aiIcon}
          resizeMode="contain"
        />

        {hasNotification ? <View style={styles.badge} /> : null}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 9999,
  },
  buttonSurface: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "#F3D6DC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    overflow: "visible",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F43F5E",
  },
  aiIcon: {
    width: 32,
    height: 32,
  },
});
