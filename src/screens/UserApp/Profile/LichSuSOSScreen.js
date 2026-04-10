// src/screens/UserApp/Profile/LichSuSOSScreen.js
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserHeader from "../../../components/UserHeader";
import { COLORS } from "../../../constants/colors";

// DỮ LIỆU ẢO (MOCK DATA)
// Sau này bạn có thể bốc mảng này đem qua file src/constants/mockData.js cho gọn
const MOCK_HISTORY = [
  {
    id: "1",
    dateTitle: "9/4/2026, 17:28",
    events: [
      {
        id: "e1",
        time: "17:28",
        text: "22 Mai Đăng Chơn, cháy",
        isEnd: false,
      },
      {
        id: "e2",
        time: "17:40",
        text: "Đã cứu hộ hoàn thành",
        isEnd: true,
      },
    ],
  },
  // Bạn có thể copy thêm block tương tự ở đây để hiện thêm thẻ Lịch sử thứ 2, thứ 3...
];

export default function LichSuSOSScreen() {
  const insets = useSafeAreaInsets();

  // Component Thẻ Lịch Sử (Render tự động dựa trên dữ liệu truyền vào)
  const HistoryCard = ({ data }) => (
    <View style={styles.card}>
      <Text style={styles.dateTitle}>{data.dateTitle}</Text>
      <View style={styles.divider} />

      <View style={styles.timelineContainer}>
        {data.events.map((event, index) => (
          <View key={event.id}>
            <View style={styles.timelineRow}>
              <Text style={styles.timeText}>{event.time}</Text>

              <View style={styles.iconColumn}>
                <Image
                  source={
                    event.isEnd
                      ? require("../../../../assets/icons/Vector4.png") // Icon mũi tên cho lúc kết thúc
                      : require("../../../../assets/icons/Vector5.png") // Icon chấm tròn cho lúc bắt đầu
                  }
                  style={event.isEnd ? styles.arrowIcon : styles.dotIcon}
                  resizeMode="contain"
                />
                {/* Chỉ vẽ đường kẻ dọc nếu đây chưa phải là sự kiện cuối cùng */}
                {!event.isEnd && <View style={styles.verticalLine} />}
              </View>

              <Text style={styles.eventText}>{event.text}</Text>
            </View>

            {/* Khoảng trống giữa các sự kiện */}
            {!event.isEnd && <View style={{ height: 35 }} />}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="LỊCH SỬ SOS" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom + 16, 40),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Duyệt qua mảng dữ liệu để in ra tất cả các thẻ lịch sử */}
        {MOCK_HISTORY.map((item) => (
          <HistoryCard key={item.id} data={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20, // Thêm margin bottom để các thẻ cách nhau ra nếu có nhiều thẻ
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginTop: 15,
    marginBottom: 25,
  },
  timelineContainer: {
    paddingLeft: 5,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timeText: {
    width: 45,
    fontSize: 14,
    color: "#999999",
    fontWeight: "500",
    marginTop: 1,
  },
  iconColumn: {
    width: 25,
    alignItems: "center",
    marginHorizontal: 10,
    position: "relative",
  },
  dotIcon: {
    width: 10,
    height: 10,
    marginTop: 4,
  },
  verticalLine: {
    position: "absolute",
    top: 18,
    bottom: -45,
    width: 1,
    backgroundColor: "#000000",
  },
  arrowIcon: {
    width: 8,
    height: 6,
    marginTop: 6,
    tintColor: "#000000",
  },
  eventText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
});
