// src/screens/UserApp/Profile/TroGiupPhanHoi1Screen.js
import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI COMPONENT DÙNG CHUNG
import UserHeader from '../../../components/UserHeader';
import UserMenuCard from '../../../components/UserMenuCard'; 
import { COLORS } from '../../../constants/colors';

export default function TroGiupPhanHoi1Screen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <UserHeader title="TRỢ GIÚP & PHẢN HỒI" />

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        
        {/* SỬ DỤNG USER MENU CARD (Kèm hasShadow để đổ bóng) */}
        <UserMenuCard 
          iconSource={require('../../../../assets/icons/ri_question-line.png')} 
          title="Câu hỏi thường gặp" 
          onPress={() => router.push('/TroGiupPhanHoi2')} 
          hasShadow={true}
        />
        
        <UserMenuCard 
          iconSource={require('../../../../assets/icons/Vector9.png')} 
          title="Liên hệ hỗ trợ" 
          onPress={() => router.push('/TroGiupPhanHoi4')}
          hasShadow={true}
        />
        
        <UserMenuCard 
          iconSource={require('../../../../assets/icons/Vector10.png')} 
          title="Gửi phản hồi" 
          hasShadow={true}
          onPress={() => router.push('/TroGiupPhanHoi5')}
        />

      </ScrollView>
    </View>
  );
}

// STYLE ĐƯỢC DỌN SẠCH TỚI MỨC TỐI ĐA
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white, 
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 30, 
    paddingBottom: 40,
  }
});