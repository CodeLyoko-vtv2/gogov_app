// src/screens/UserApp/Profile/CaiDatScreen.js
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// GỌI CÁC COMPONENT DÙNG CHUNG
import CustomToggle from '../../../components/CustomToggle';
import UserArrow from '../../../components/UserArrow';
import UserHeader from '../../../components/UserHeader';
import UserTabs from '../../../components/UserTabs';
import { COLORS } from '../../../constants/colors';

export default function CaiDatScreen() {
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const MenuItem = ({
    iconSource,
    title,
    rightText,
    hideBorder,
    tintIcon = true,
    onPress,
  }) => (
    <TouchableOpacity
      style={[styles.itemContainer, hideBorder ? styles.noBorder : null]}
      onPress={onPress}
    >
      <View style={styles.itemLeft}>
        <View style={styles.iconWrapper}>
          <Image
            source={iconSource}
            style={[styles.icon, tintIcon ? styles.tintedIcon : null]}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
        <UserArrow />
      </View>
    </TouchableOpacity>
  );

  const CustomSwitchItem = ({
    iconSource,
    title,
    value,
    onValueChange,
    hideBorder,
  }) => (
    <View style={[styles.itemContainer, hideBorder ? styles.noBorder : null]}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWrapper}>
          <Image
            source={iconSource}
            style={[styles.icon, styles.tintedIcon]}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <CustomToggle isOn={value} onToggle={() => onValueChange(!value)} />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/* NÚT BACK: Ép về Home bằng replace (chuyển 0s theo layout) */}
      <UserHeader 
        title="CÀI ĐẶT" 
        onBackPress={() => router.replace('/HomeSOS')} 
      />

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        
        <SectionHeader title="TÀI KHOẢN" />
        <View style={styles.card}>
          <MenuItem
            iconSource={require("../../../../assets/icons/FAQ Circle.png")}
            title="Thông tin cá nhân"
            onPress={() => router.push("/ThongTinCaNhan")}
          />
          <MenuItem
            iconSource={require("../../../../assets/icons/hugeicons_transaction-history.png")}
            title="Lịch sử SOS"
            hideBorder={true}
            onPress={() => router.push("/LichSuSOS")}
          />
        </View>

        <SectionHeader title="CÀI ĐẶT CHUNG" />
        <View style={styles.card}>
          <CustomSwitchItem
            iconSource={require("../../../../assets/icons/Vector.png")}
            title="Quản lý thông báo"
            value={isNotifEnabled}
            onValueChange={setIsNotifEnabled}
          />
          <CustomSwitchItem
            iconSource={require("../../../../assets/icons/Vector1.png")}
            title="Chia sẻ vị trí"
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
          />
          <MenuItem
            iconSource={require("../../../../assets/icons/Vector2.png")}
            title="Ngôn ngữ"
            rightText="Tiếng Việt"
            hideBorder={true}
          />
        </View>

        <SectionHeader title="THÔNG TIN VÀ HỖ TRỢ" />
        <View style={styles.card}>
          <MenuItem
            iconSource={require("../../../../assets/icons/FAQ Circle 1.png")}
            title="Trợ giúp và phản hồi"
            onPress={() => router.push("/TroGiupPhanHoi1")}
          />
          <MenuItem
            iconSource={require("../../../../assets/icons/iphone-01.png")}
            title="Về ứng dụng"
            hideBorder={true}
            tintIcon={false}
            onPress={() => router.push("/VeUngDung1")}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace("/PhanLoaiNguoiDung")}>
          <Image
            source={require("../../../../assets/icons/Vector3.png")}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* HIỂN THỊ TAB BAR */}
      <UserTabs activeRoute="/CaiDat" />
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
    paddingTop: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 25,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: "#FFF0F0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  icon: {
    width: 18,
    height: 18,
  },
  tintedIcon: {
    tintColor: COLORS.primary,
  },
  itemTitle: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    fontSize: 16,
    color: COLORS.gray,
    marginRight: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 35,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10,
    tintColor: COLORS.primary,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
