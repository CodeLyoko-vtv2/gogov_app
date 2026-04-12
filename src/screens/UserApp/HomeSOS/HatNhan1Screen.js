import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getSelectedImageIndexes,
  setSelectedImageIndexes,
} from "../../../state/selectedImages";
import { getSelectedLocationText } from "../../../state/selectedLocation";

const EVIDENCE_IMAGES = [
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

function stripIndexPrefix(text) {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .join(", ");
}

const RESCUE_TYPES = [
  {
    id: "nuclear",
    label: "Hạt nhân",
    source: require("../../../../assets/icons/hat-nhan.png"),
  },
  {
    id: "pandemic",
    label: "Đại dịch",
    source: require("../../../../assets/icons/dai-dich.png"),
  },
  {
    id: "war",
    label: "Chiến\ntranh",
    source: require("../../../../assets/icons/chien-tranh.png"),
  },
  {
    id: "bio",
    label: "Sinh hóa",
    source: require("../../../../assets/icons/sinh-hoa.png"),
  },
  {
    id: "fire",
    label: "Hỏa hoạn",
    source: require("../../../../assets/icons/hoa-hoan.png"),
  },
  {
    id: "quake",
    label: "Động đất",
    source: require("../../../../assets/icons/dong-dat.png"),
  },
  {
    id: "tsunami",
    label: "Sóng\nthần",
    source: require("../../../../assets/icons/song-than.png"),
  },
  { id: "other", label: "Khác", icon: "dots-horizontal" },
];

function RescueTypeItem({ label, icon, source, selected, onPress }) {
  return (
    <TouchableOpacity
      style={styles.typeItem}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[styles.typeIconWrap, selected && styles.typeIconWrapActive]}
      >
        {source ? (
          <Image
            source={source}
            style={[
              styles.typeImage,
              { tintColor: selected ? "#FFFFFF" : "#9AA1A9" },
            ]}
            resizeMode="contain"
          />
        ) : (
          <MaterialCommunityIcons
            name={icon}
            size={selected ? 27 : 30}
            color={selected ? "#FFFFFF" : "#9AA1A9"}
          />
        )}
        {selected ? (
          <View style={styles.doneBadge}>
            <MaterialIcons name="done" size={11} color="#EF4444" />
          </View>
        ) : null}
      </View>
      <Text style={styles.typeLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function HatNhan1Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState("nuclear");
  const [otherReason, setOtherReason] = useState("");
  const [currentLocationText, setCurrentLocationText] = useState(
    stripIndexPrefix(getSelectedLocationText()) ||
      "FPT Complex, Nam Kỳ Khởi Nghĩa",
  );
  const [selectedImageIndexes, setSelectedImageIndexesState] = useState(
    getSelectedImageIndexes(),
  );

  useEffect(() => {
    const locationListener = DeviceEventEmitter.addListener(
      "locationUpdated",
      (value) => {
        if (typeof value === "string" && value.trim()) {
          setCurrentLocationText(stripIndexPrefix(value));
        }
      },
    );

    const imageListener = DeviceEventEmitter.addListener(
      "imagesUpdated",
      (value) => {
        if (Array.isArray(value)) {
          setSelectedImageIndexesState(value);
          return;
        }

        if (typeof value === "number" && value >= 0) {
          const latest = getSelectedImageIndexes();
          setSelectedImageIndexesState(latest);
        }
      },
    );

    return () => {
      locationListener.remove();
      imageListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#EF4444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CỨU HỘ</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 110 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Chọn kiểu cứu hộ</Text>
        <View style={styles.divider} />

        <View style={styles.typeGrid}>
          {RESCUE_TYPES.map((item) => (
            <RescueTypeItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              source={item.source}
              selected={selectedType === item.id}
              onPress={() => {
              setSelectedType(item.id);

              if (item.id !== "other") {
              setOtherReason("");
          }
        }}
            />
          ))}
        </View>

        {selectedType === "other" ? (
  <TouchableOpacity
    activeOpacity={1}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}

    onPress={() => {
      if (!otherReason) {
        setOtherReason("tai nạn máy bay");
      }
    }}
  >
    <TextInput
      value={otherReason}
      editable={false} // ❌ không cho nhập
      placeholder="Nhập lý do"
      placeholderTextColor="#A2A2A2"
      style={styles.reasonInput}
    />
  </TouchableOpacity>
) : null}

        <Text style={styles.sectionTitle}>Vị trí</Text>
        <View style={styles.divider} />

        <View style={styles.locationCard}>
          <View style={styles.locationLeft}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={22}
              color="#50545A"
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {currentLocationText}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.changeButton}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/ChonViTri2",
                params: { currentLocation: currentLocationText },
              })
            }
          >
            <Text style={styles.changeText}>Thay đổi</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Bằng chứng</Text>
        <View style={styles.divider} />

        {selectedImageIndexes.length > 0 ? (
          <View style={styles.selectedImageRow}>
            {selectedImageIndexes.map((imageIndex) => (
              <View
                key={`selected-${imageIndex}`}
                style={styles.selectedImageItem}
              >
                <Image
                  source={EVIDENCE_IMAGES[imageIndex]}
                  style={styles.selectedImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.removeBadge}
                  activeOpacity={0.8}
                  onPress={() => {
                    const nextIndexes = selectedImageIndexes.filter(
                      (item) => item !== imageIndex,
                    );
                    setSelectedImageIndexes(nextIndexes);
                    setSelectedImageIndexesState(nextIndexes);
                    DeviceEventEmitter.emit("imagesUpdated", nextIndexes);
                  }}
                >
                  <Text style={styles.removeText}>Xoá</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.evidenceRow}>
            <TouchableOpacity
              style={styles.evidenceItem}
              activeOpacity={0.8}
              onPress={() => router.push("/ChonAnh2")}
            >
              <MaterialCommunityIcons
                name="camera-outline"
                size={24}
                color="#EF4444"
              />
              <Text style={styles.evidenceLabel}>Ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.evidenceItem} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="video-outline"
                size={24}
                color="#EF4444"
              />
              <Text style={styles.evidenceLabel}>Video</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.evidenceItem} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="microphone-outline"
                size={24}
                color="#EF4444"
              />
              <Text style={styles.evidenceLabel}>Ghi âm</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: "/DaGuiTinHieu",
              params: { location: currentLocationText },
            })
          }
        >
          <Text style={styles.confirmText}>Xác nhận</Text>
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
  header: {
    height: 112,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F9",
    shadowColor: "#CECECE",
    shadowOffset: { width: 0, height: 4.56 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    marginRight: 42,
    textAlign: "center",
    fontSize: 41,
    lineHeight: 46,
    fontWeight: "800",
    color: "#EF4444",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 44,
    fontWeight: "700",
    color: "#111111",
    marginLeft: 6,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#E6E6E6",
    marginBottom: 20,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
    rowGap: 18,
  },
  reasonInput: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EF4444",
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#111111",
    marginBottom: 16,
  },
  typeItem: {
    width: "23%",
    alignItems: "center",
  },
  typeIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  typeIconWrapActive: {
    backgroundColor: "#EF4444",
    width: 52,
    height: 52,
    borderRadius: 999,
  },
  typeImage: {
    width: 34,
    height: 34,
  },
  doneBadge: {
    position: "absolute",
    top: -1,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  typeLabel: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 16,
    color: "#212121",
  },
  locationCard: {
    height: 57,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
    minWidth: 0,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 13,
    lineHeight: 18,
    color: "#000000",
    flexShrink: 1,
  },
  changeButton: {
    flexShrink: 0,
    marginLeft: 8,
  },
  changeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EF4444",
  },
  evidenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  evidenceItem: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  evidenceLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#EF4444",
  },
  selectedImageRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
  },
  selectedImageItem: {
    width: 82,
    height: 82,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
  },
  removeBadge: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingTop: 10,
  },
  confirmButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
