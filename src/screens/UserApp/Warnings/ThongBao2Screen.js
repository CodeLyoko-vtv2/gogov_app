import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity, // 1. Thêm cái này để bấm được
} from 'react-native';
import { useRouter } from 'expo-router'; // 2. Thêm cái này để điều hướng

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

export default function ThongBao2Screen() {
  const router = useRouter(); // 3. Khởi tạo router ở đây

  // Component cục bộ cho thẻ thông báo
  const NotificationItem = ({ 
    title, 
    subtitle, 
    updateTime, 
    icon, 
    isEmergency = true,
    hasSosIcon = false,
    isTopCard = false,
    onPress // 4. Nhận hàm onPress truyền từ ngoài vào
  }) => {
    const mainColor = isEmergency ? COLORS.primary : COLORS.yellow;
    
    // Màu nền card theo quy định
    const cardBgColor = isTopCard 
      ? COLORS.white 
      : (isEmergency ? COLORS.primaryLight : COLORS.yellowLight);

    // Màu nền icon
    const iconBgColor = isEmergency ? '#FFE5E5' : '#FFF9E5';

    return (
      // 5. Đổi View thành TouchableOpacity
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.card, 
          { 
            borderColor: mainColor,
            backgroundColor: cardBgColor,
            ...(isTopCard ? styles.shadowEffect : { elevation: 0, shadowOpacity: 0 })
          }
        ]}
      >
        <View style={styles.cardContent}>
          {/* Khu vực Icon */}
          <View style={[
            styles.iconWrapper, 
            { backgroundColor: hasSosIcon ? 'transparent' : iconBgColor }
          ]}>
            <Image 
              source={icon} 
              style={hasSosIcon ? styles.sosIconImage : [styles.weatherIconImage, { tintColor: mainColor }]} 
              resizeMode="contain" 
            />
          </View>

          {/* Khu vực Nội dung */}
          <View style={styles.textContainer}>
            <Text style={[
              styles.title, 
              { color: mainColor, fontWeight: isTopCard ? '800' : '600' }
            ]}>
              {title}
            </Text>

            <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
            
            <Text style={[styles.updateLabel, { color: mainColor }]}>
              Cập nhật: 
              <Text style={[
                styles.timeValue, 
                { fontWeight: isTopCard ? '800' : '600' }
              ]}>
                {` ${updateTime}`}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="THÔNG BÁO" />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <NotificationItem 
          title="Đội hỗ trợ đang tới"
          subtitle="Vui lòng giữ bình tĩnh, đội cứu hộ đ..."
          updateTime="1 phút trước"
          icon={require('../../../../assets/icons/🆘.png')}
          isEmergency={true}
          hasSosIcon={true}
          isTopCard={true} 
        />

        <NotificationItem 
          title="Cảnh báo bão Kalmaegi - Khẩn cấp"
          subtitle="Huế - Gia Lai"
          updateTime="06/11/2025"
          icon={require('../../../../assets/icons/Rain&Thunderstorm.png')}
          isEmergency={true}
        />

        <NotificationItem 
          title="Cảnh báo sức gió mạnh - Trung bình"
          subtitle="Sơn Trà, Đà Nẵng"
          updateTime="22/10/2025"
          icon={require('../../../../assets/icons/Wind.png')}
          isEmergency={false}
        />

        <NotificationItem 
          title="Cảnh báo ngập lụt - Khẩn cấp"
          subtitle="Đà Nẵng"
          updateTime="06/11/2025"
          icon={require('../../../../assets/icons/Rain&Thunderstorm.png')}
          isEmergency={true}
          // 6. Bây giờ bấm vào đây sẽ chuyển trang được này
          onPress={() => router.push("/CanhBaoNgapLut")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  shadowEffect: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sosIconImage: {
    width: 56,
    height: 56,
  },
  weatherIconImage: {
    width: 38,
    height: 38,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.black,
    opacity: 0.9,
    marginBottom: 6,
    fontWeight: '600',
  },
  updateLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeValue: {
    fontStyle: 'italic',
    color: COLORS.gray,
  }
});