import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    DeviceEventEmitter,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setSelectedLocationText } from "../../../state/selectedLocation";

const LOCATION_COUNT = 3;

export default function ChonViTri2Screen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const currentLocationParam = Array.isArray(params.currentLocation)
    ? params.currentLocation[0]
    : params.currentLocation;

  const parsedLocations = useMemo(() => {
    if (
      typeof currentLocationParam !== "string" ||
      !currentLocationParam.trim()
    ) {
      return Array.from({ length: LOCATION_COUNT }, () => "");
    }

    const lines = currentLocationParam
      .split(/\n|,/)
      .map((line) => line.trim())
      .filter(Boolean);

    const result = Array.from({ length: LOCATION_COUNT }, () => "");
    lines.forEach((line, index) => {
      const cleaned = line.replace(/^\d+\.\s*/, "");
      if (index < LOCATION_COUNT) {
        result[index] = cleaned;
      }
    });

    return result;
  }, [currentLocationParam]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [locationInputs, setLocationInputs] = useState(parsedLocations);
  const [fullAddress, setFullAddress] = useState("");

  const bottomPadding = useMemo(
    () => Math.max(insets.bottom + 8, 14),
    [insets],
  );

  const handleLocationChange = (index, value) => {
    setLocationInputs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleConfirm = () => {
    const normalized = locationInputs.map((item) => item.trim());
    const enteredLocations = normalized.filter((item) => item.length > 0);
    const finalLocation = enteredLocations.join(", ") || fullAddress.trim();

    if (!finalLocation) {
      router.back();
      return;
    }

    setSelectedLocationText(finalLocation);
    DeviceEventEmitter.emit("locationUpdated", finalLocation);
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.sheet}>
        <View style={styles.topHandle} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chọn vị trí</Text>
        </View>

        <View style={styles.content}>
          {locationInputs.map((item, index) => {
            const active = index === selectedIndex;

            return (
              <TouchableOpacity
                key={`location-${index}`}
                style={[
                  styles.locationOption,
                  active && styles.locationOptionActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedIndex(index)}
              >
                <TextInput
                  value={item}
                  onChangeText={(value) => handleLocationChange(index, value)}
                  onFocus={() => setSelectedIndex(index)}
                  placeholder={`Nhập vị trí ${index + 1}`}
                  placeholderTextColor="rgba(0,0,0,0.35)"
                  style={styles.locationOptionInput}
                />
              </TouchableOpacity>
            );
          })}

          <View style={styles.addressRow}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="rgba(0,0,0,0.65)"
            />
            <TextInput
              value={fullAddress}
              onChangeText={setFullAddress}
              placeholder="Nhập địa chỉ đầy đủ (tuỳ chọn)"
              placeholderTextColor="rgba(0,0,0,0.35)"
              style={styles.addressInput}
            />
          </View>

          <View style={styles.mapWrap}>
            <ImageBackground
              source={require("../../../../assets/images/Rectangle 4894.png")}
              style={styles.mapImage}
              imageStyle={styles.mapImageRadius}
            >
              <Image
                source={require("../../../../assets/icons/Primary.png")}
                style={styles.markerIcon}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>
        </View>

        <View style={[styles.footer, { paddingBottom: bottomPadding }]}>
          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.85}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  sheet: {
    height: 631,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topHandle: {
    width: 50,
    height: 4,
    borderRadius: 99,
    backgroundColor: "#111111",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: "#111111",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  locationOption: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    paddingHorizontal: 27,
    marginBottom: 12,
  },
  locationOptionActive: {
    borderColor: "#E54A4B",
  },
  locationOptionInput: {
    fontSize: 14,
    lineHeight: 18,
    color: "#202020",
    fontWeight: "400",
    paddingVertical: 0,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  addressInput: {
    marginLeft: 7,
    color: "rgba(0,0,0,0.78)",
    fontSize: 13,
    lineHeight: 17,
    flex: 1,
    paddingVertical: 0,
  },
  mapWrap: {
    position: "relative",
    width: 330,
    alignSelf: "center",
    marginTop: 2,
  },
  mapImage: {
    height: 192,
    width: 330,
    overflow: "hidden",
  },
  mapImageRadius: {
    borderRadius: 5,
  },
  markerIcon: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 35,
    height: 47,
    marginLeft: -17.5,
    marginTop: -2,
  },
  botButton: {
    position: "absolute",
    right: -13,
    top: -40,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "rgba(249,211,211,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  botIcon: {
    width: 44,
    height: 44,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  confirmButton: {
    height: 42,
    borderRadius: 15,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
