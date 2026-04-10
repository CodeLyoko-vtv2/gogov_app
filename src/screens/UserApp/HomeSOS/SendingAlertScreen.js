import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TEAM_MARKERS = [
  {
    id: "blue",
    name: "GoBlue",
    x: -105,
    y: -77,
    opacity: 1,
    source: require("../../../../assets/icons/go-blue.png"),
  },
  {
    id: "yellow",
    name: "GoYellow",
    x: 129,
    y: -10,
    opacity: 1,
    source: require("../../../../assets/icons/go-yellow.png"),
  },
  {
    id: "green",
    name: "GoGreen",
    x: -149,
    y: 94,
    opacity: 0.9,
    source: require("../../../../assets/icons/go-green.png"),
  },
  {
    id: "pink",
    name: "GoPink",
    x: 76,
    y: 184,
    opacity: 0.7,
    source: require("../../../../assets/icons/go-pink.png"),
  },
];

function TeamMarker({ name, x, y, opacity, source }) {
  return (
    <View
      style={[
        styles.teamMarker,
        { transform: [{ translateX: x }, { translateY: y }], opacity },
      ]}
    >
      <Image source={source} style={styles.teamAvatar} />
      <Text style={styles.teamLabel}>{name}</Text>
    </View>
  );
}

export default function SendingAlertScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isFocused) {
      return undefined;
    }

    if (countdown <= 1) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [countdown, isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return undefined;
    }

    if (countdown !== 1) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      router.replace("/DaGuiTinHieu");
    }, 650);

    return () => clearTimeout(timeoutId);
  }, [countdown, isFocused, router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={["#FFFFFF", "#FFF8F5", "#FEEFD3", "#FFFFFF"]}
        locations={[0, 0.28, 0.72, 1]}
        start={{ x: 0.5, y: 0.02 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.backgroundGradient}
      />
      <LinearGradient
        colors={[
          "rgba(255,225,225,0.5)",
          "rgba(255,189,118,0.48)",
          "rgba(255,255,255,0)",
        ]}
        locations={[0, 0.55, 1]}
        start={{ x: 0.22, y: 0.18 }}
        end={{ x: 0.78, y: 0.84 }}
        style={styles.radarGlow}
      />

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Cuộc gọi khẩn cấp...</Text>
          <Text style={styles.description}>
            Vui lòng chờ một chút, chúng tôi hiện đang yêu cầu trợ giúp. Các số
            liên lạc khẩn cấp của bạn và các dịch vụ cứu hộ gần đó sẽ nhận được
            cuộc gọi trợ giúp của bạn.
          </Text>
          <View style={styles.locationRow}>
            <Image
              source={require("../../../../assets/icons/location-dot.png")}
              style={styles.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles.locationText}>
              FPT Complex, Nam Kỳ Khởi Nghĩa
            </Text>
          </View>
        </View>

        <View style={styles.radarArea}>
          <View style={[styles.ring, styles.ring1]} />
          <View style={[styles.ring, styles.ring2]} />
          <View style={[styles.ring, styles.ring3]} />
          <View style={[styles.ring, styles.ring4]} />

          <View style={styles.centerOuter}>
            <LinearGradient
              colors={["#F96B6B", "#EB1C24"]}
              locations={[0, 1]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.centerButton}
            >
              <Text style={styles.counterText}>
                {String(countdown).padStart(2, "0")}
              </Text>
            </LinearGradient>
          </View>

          {TEAM_MARKERS.map((item) => (
            <TeamMarker key={item.id} {...item} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.75}
          onPress={() => router.push("/XacNhanHuy")}
        >
          <Text style={styles.cancelText}>HUỶ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    paddingTop: 74,
    paddingHorizontal: 22,
    paddingBottom: 72,
  },
  headerSection: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#313A51",
    lineHeight: 28,
    marginBottom: 10,
  },
  description: {
    width: 330,
    textAlign: "center",
    color: "#313A51",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationIcon: {
    width: 16,
    height: 20,
    tintColor: "rgba(0,0,0,0.72)",
    marginRight: 6,
  },
  locationText: {
    fontSize: 16,
    lineHeight: 20,
    color: "rgba(0,0,0,0.72)",
    fontWeight: "500",
  },
  radarArea: {
    flex: 1,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radarGlow: {
    position: "absolute",
    width: 980,
    height: 980,
    borderRadius: 490,
    top: 170,
    left: -294,
    transform: [{ rotate: "66deg" }],
  },
  ring: {
    position: "absolute",
    borderColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 999,
  },
  ring1: {
    width: 262,
    height: 262,
  },
  ring2: {
    width: 307,
    height: 307,
  },
  ring3: {
    width: 351,
    height: 351,
  },
  ring4: {
    width: 401,
    height: 401,
  },
  centerOuter: {
    width: 206,
    height: 206,
    borderRadius: 103,
    backgroundColor: "#F2F5FB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F44A4A",
    shadowOpacity: 0.35,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },
  centerButton: {
    width: 154,
    height: 154,
    borderRadius: 77,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontSize: 46,
    lineHeight: 54,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  teamMarker: {
    position: "absolute",
    alignItems: "center",
    left: "50%",
    top: "50%",
    marginLeft: -16.5,
    marginTop: -16.5,
  },
  teamAvatar: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
  },
  teamLabel: {
    marginTop: 3,
    color: "#313A51",
    fontSize: 9,
    lineHeight: 11,
    fontWeight: "500",
  },
  cancelButton: {
    alignSelf: "center",
    width: 260,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(224,35,35,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  cancelText: {
    color: "rgba(0,0,0,0.7)",
    fontWeight: "600",
    fontSize: 14,
  },
});
