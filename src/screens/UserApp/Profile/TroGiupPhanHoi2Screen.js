// src/screens/UserApp/Profile/TroGiupPhanHoi2Screen.js
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';

// GỌI COMPONENT DÙNG CHUNG
import UserHeader from '../../../components/UserHeader';
import UserArrow from '../../../components/UserArrow'; // Chỉ gọi Mũi tên
import { COLORS } from '../../../constants/colors';

export default function TroGiupPhanHoi2Screen() {
  const router = useRouter();

  const FAQItem = ({ question, answer }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <TouchableOpacity 
        style={styles.cardItem} 
        activeOpacity={0.7}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>{question}</Text>
          
          {/* ÁP DỤNG USER ARROW CHUẨN KÍCH THƯỚC */}
          <View style={[styles.arrowContainer, isExpanded && styles.arrowRotated]}>
            <UserArrow />
          </View>
        </View>

        {isExpanded && (
          <Text style={styles.answerText}>{answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="CÂU HỎI THƯỜNG GẶP" />

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        
        <FAQItem 
          question="Ứng dụng hoạt động như thế nào?" 
          answer="Ứng dụng của chúng tôi kết nối bạn với đội cứu hộ gần nhất chỉ bằng một nút bấm. Nó sử dụng GPS trên điện thoại của bạn để xác định vị trí của bạn và gửi thông tin đó đến trung tâm cứu hộ."
        />
        <FAQItem 
          question="Làm cách nào để gửi SOS?" 
          answer="Bạn chỉ cần nhấn và giữ nút SOS màu đỏ ở giữa màn hình chính. Hệ thống sẽ tự động đếm ngược và gửi tín hiệu cấp cứu kèm vị trí của bạn."
        />
        <FAQItem 
          question="Làm cách nào để liên hệ đội cứu hộ?" 
          answer="Khi có sự cố được xác nhận, hệ thống sẽ tự động mở kênh liên lạc (nhắn tin/gọi điện) giữa bạn và đội cứu hộ đang phụ trách khu vực của bạn."
        />
        <FAQItem 
          question="Tôi có thể thêm bao nhiêu liên hệ khẩn cấp?" 
          answer="Bạn có thể thêm tối đa 5 người thân vào danh sách liên hệ khẩn cấp trong mục Cài đặt Tài khoản. Họ sẽ nhận được tin nhắn SMS khi bạn kích hoạt SOS."
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
  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  cardItem: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 16,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    flex: 1, 
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginRight: 10,
    lineHeight: 22,
  },
  answerText: {
    fontSize: 16,
    color: '#000000', 
    lineHeight: 24, 
    marginTop: 15, 
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }], 
  },
  arrowRotated: {
    transform: [{ rotate: '-90deg' }], 
  },
  // Đã xóa hoàn toàn arrowIcon ở đây vì đã dùng UserArrow
});