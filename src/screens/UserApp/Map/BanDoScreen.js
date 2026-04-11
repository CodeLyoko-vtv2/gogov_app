import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

const { width } = Dimensions.get('window');

export default function BanDoScreen() {
  const router = useRouter();

  // Component cho từng địa điểm an toàn trong danh sách
  const SafePlaceItem = ({ icon, title, address }) => (
    <View style={styles.placeItem}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.placeIcon} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.placeTitle}>{title}</Text>
        <Text style={styles.placeAddress}>{address}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="BẢN ĐỒ" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* KHU VỰC BẢN ĐỒ */}
        <View style={styles.mapContainer}>
          <Image 
            // Đã đổi tên file ảnh bản đồ theo yêu cầu của bạn
            source={require('../../../../assets/images/DanangMap.png')} 
            style={styles.mapImage}
            resizeMode="cover"
          />
          
          {/* CÁC NÚT ĐIỀU KHIỂN: Đã đẩy xuống sát lề dưới của map */}
          <View style={styles.mapControls}>
            
            {/* Cụm nút Zoom */}
            <View style={styles.zoomControls}>
              <TouchableOpacity style={styles.controlButton}>
                <Image 
                  source={require('../../../../assets/icons/Vector11.png')} 
                  style={styles.zoomIcon} 
                />
              </TouchableOpacity>
              
              <View style={styles.controlDivider} />
              
              <TouchableOpacity style={styles.controlButton}>
                <Image 
                  source={require('../../../../assets/icons/Line 19.png')} 
                  // Sử dụng resizeMode="fill" để hiển thị như một dấu trừ (-)
                  style={styles.minusIcon} 
                  resizeMode="fill"
                />
              </TouchableOpacity>
            </View>

            {/* Nút định vị: Không nền, không bóng đổ */}
            <TouchableOpacity style={styles.locationButton}>
              <Image 
                source={require('../../../../assets/icons/location-06.png')} 
                style={styles.locationIcon} 
              />
            </TouchableOpacity>

          </View>
        </View>

        {/* DANH SÁCH ĐỊA ĐIỂM AN TOÀN */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Các địa điểm an toàn</Text>

          <SafePlaceItem 
            icon={require('../../../../assets/icons/building-08.png')}
            title="Trường ĐH CNTT và TT Việt Hàn"
            address="470 Trần Đại Nghĩa, Ngũ Hành Sơn"
          />

          <SafePlaceItem 
            icon={require('../../../../assets/icons/healthcare-03.png')}
            title="Trung tâm Y Tế khu vực Ngũ Hành Sơn"
            address="582 Lê Văn Hiến, Ngũ Hành Sơn"
          />

          <SafePlaceItem 
            icon={require('../../../../assets/icons/healthcare-03.png')}
            title="Trạm Y Tế phường Hoà Quý"
            address="439 Mai Đăng Chơn, Ngũ Hành Sơn"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mapContainer: {
    width: width,
    height: 350,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapControls: {
    position: 'absolute',
    right: 15,
    bottom: 15, // Đẩy xuống sát lề dưới của bản đồ
    alignItems: 'center',
  },
  zoomControls: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  controlButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomIcon: {
    width: 18,
    height: 18,
    tintColor: '#000',
  },
  minusIcon: {
    width: 18,
    height: 3, // Chỉnh chiều cao nhỏ lại để trông giống dấu trừ hơn khi dùng fill
    tintColor: '#000',
  },
  controlDivider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    width: '60%',
    alignSelf: 'center',
  },
  locationButton: {
    backgroundColor: 'transparent', // Không nền
    padding: 5,
    // Loại bỏ các thuộc tính shadow/elevation để hoàn toàn không có nền trắng
  },
  locationIcon: {
    width: 44, // Tăng kích thước icon lên một chút vì không còn nền trắng bọc ngoài
    height: 44,
  },
  listContainer: {
    padding: 20,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  placeIcon: {
    width: 28,
    height: 28,
  },
  textContainer: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: COLORS.gray,
  },
});