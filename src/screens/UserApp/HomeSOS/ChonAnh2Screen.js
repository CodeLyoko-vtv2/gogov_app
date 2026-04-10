import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    DeviceEventEmitter,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    getSelectedImageIndexes,
    setSelectedImageIndexes,
} from "../../../state/selectedImages";

const PHOTO_SOURCES = [
  require("../../../../assets/images/anh1.png"),
  require("../../../../assets/images/anh2.png"),
  require("../../../../assets/images/anh3.png"),
  require("../../../../assets/images/anh4.png"),
  require("../../../../assets/images/anh5.png"),
  require("../../../../assets/images/anh6.png"),
  require("../../../../assets/images/anh7.png"),
  require("../../../../assets/images/anh8.png"),
  require("../../../../assets/images/anh9.png"),
];

export default function ChonAnh2Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedIndexes, setSelectedIndexes] = useState(
    getSelectedImageIndexes,
  );

  const bottomPadding = useMemo(
    () => Math.max(insets.bottom + 8, 12),
    [insets],
  );

  const photoItemSize = useMemo(() => {
    const horizontalPadding = 24;
    const columnGap = 12;
    const availableWidth = width - horizontalPadding * 2 - columnGap * 2;
    return Math.floor(availableWidth / 3);
  }, [width]);

  const toggleSelect = (index) => {
    setSelectedIndexes((prev) => {
      const exists = prev.includes(index);
      if (exists) {
        return prev.filter((item) => item !== index);
      }
      return [...prev, index];
    });
  };

  const handleConfirm = () => {
    setSelectedImageIndexes(selectedIndexes);
    DeviceEventEmitter.emit("imagesUpdated", [...selectedIndexes]);
    router.back();
  };

  const getSelectionOrder = (index) => {
    const order = selectedIndexes.indexOf(index);
    return order >= 0 ? order + 1 : null;
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
          <Text style={styles.headerTitle}>Chọn ảnh</Text>
        </View>

        <View style={styles.gridWrap}>
          {PHOTO_SOURCES.map((source, index) => {
            const order = getSelectionOrder(index);
            const selected = order !== null;

            return (
              <TouchableOpacity
                key={`photo-${index}`}
                style={[
                  styles.photoItem,
                  {
                    width: photoItemSize,
                    height: Math.floor(photoItemSize * 1.2),
                  },
                  selected && styles.photoItemSelected,
                ]}
                activeOpacity={0.85}
                onPress={() => toggleSelect(index)}
              >
                <Image
                  source={source}
                  style={styles.photoImage}
                  resizeMode="cover"
                />

                <View style={[styles.badge, selected && styles.badgeSelected]}>
                  {selected ? (
                    <Text style={styles.badgeText}>{order}</Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.footer, { paddingBottom: bottomPadding }]}>
          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.85}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>
              Chọn ({selectedIndexes.length})
            </Text>
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
    position: "relative",
  },
  topHandle: {
    width: 50,
    height: 4,
    borderRadius: 99,
    backgroundColor: "#111111",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 19,
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
  gridWrap: {
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 15,
    paddingBottom: 120,
  },
  photoItem: {
    borderRadius: 2,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  photoItemSelected: {
    borderColor: "#EF4444",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    right: 6,
    top: 6,
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  badgeSelected: {
    borderWidth: 0,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  botButton: {
    position: "absolute",
    right: 12,
    top: 248,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "rgba(249,211,211,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  botIcon: {
    width: 45,
    height: 45,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(250,232,233,0.3)",
    paddingHorizontal: 21,
    paddingTop: 20,
    minHeight: 98,
    shadowColor: "#CECECE",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
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
