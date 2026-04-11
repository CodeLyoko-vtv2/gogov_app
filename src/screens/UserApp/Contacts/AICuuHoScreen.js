// src/screens/UserApp/Contacts/AICuuHoScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import UserHeader from '../../../components/UserHeader';
import { COLORS } from '../../../constants/colors';

const CHAT_DATA = [
  {
    id: '1',
    type: 'bot',
    text: 'Tôi phát hiện bạn có thể đang trong tình huống khẩn cấp. Có chuyện gì đang xảy ra?',
    time: '9:41 AM',
  },
  {
    id: '2',
    type: 'user',
    text: 'Máy bay rung rất mạnh, hành khách đang la hét',
    time: '9:41 AM',
  },
  {
    id: '3',
    type: 'bot',
    text: 'Có thể máy bay đang gặp sự cố nghiêm trọng. Hãy làm ngay theo hướng dẫn sau:',
    time: '9:41 AM',
    suggestions: [
      'Giữ bình tĩnh',
      'Thắt chặt dây an toàn',
      'Ngồi thẳng, đầu cúi xuống, tay ôm đầu (tư thế an toàn)',
      'Nghe hướng dẫn của tiếp viên',
    ],
  },
  {
    id: '4',
    type: 'user',
    text: 'Gửi tín hiệu SOS khẩn cấp',
    time: '9:41 AM',
  },
  {
    id: '5',
    type: 'system',
    text: 'Tín hiệu SOS khẩn cấp đang được gửi đi...',
  },
  {
    id: '6',
    type: 'bot',
    text: 'Các số liên lạc khẩn cấp của bạn và các dịch vụ cứu hộ gần đó sẽ nhận được cuộc gọi trợ giúp của bạn',
    time: '9:41 AM',
  },
];

export default function AICuuHoScreen() {
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');

  const renderMessage = (item) => {
    if (item.type === 'system') {
      return (
        <Text key={item.id} style={styles.systemMessage}>
          {item.text}
        </Text>
      );
    }

    const isBot = item.type === 'bot';

    return (
      <View key={item.id} style={[styles.messageWrapper, isBot ? styles.messageWrapperLeft : styles.messageWrapperRight]}>
        
        {isBot && (
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../../../../assets/icons/icon-ai.png')} 
              style={styles.avatar} 
            />
          </View>
        )}

        <View style={[styles.messageContent, isBot ? styles.messageContentLeft : styles.messageContentRight]}>
          {isBot && <Text style={styles.botName}>Trợ lý AI</Text>}
          
          {/* CẬP NHẬT: Màu sắc bong bóng chat theo đối tượng */}
          <View style={[
            styles.bubble, 
            isBot ? styles.bubbleLeft : styles.bubbleRight,
            { backgroundColor: isBot ? '#F3F4F6' : COLORS.primary } // Bot màu xám, User màu Đỏ
          ]}>
            <Text style={[
              styles.bubbleText, 
              { color: isBot ? '#1F2937' : COLORS.white } // Bot chữ đen, User chữ trắng
            ]}>
              {item.text}
            </Text>
          </View>
          
          <Text style={[styles.timeText, isBot ? styles.timeTextLeft : styles.timeTextRight]}>
            {item.time}
          </Text>

          {item.suggestions && (
            <View style={styles.suggestionsContainer}>
              {item.suggestions.map((suggestion, index) => (
                <TouchableOpacity key={index} style={styles.suggestionPill} activeOpacity={0.7}>
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {!isBot && (
          <View style={styles.avatarContainerRight}>
            <Image 
              source={require('../../../../assets/images/Rectangle 4880.png')} 
              style={styles.avatarUser} 
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <UserHeader title="AI CỨU HỘ" />

      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CHAT_DATA.map(renderMessage)}
      </ScrollView>

      {/* THANH INPUT NHƯ FIGMA */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 15 }]}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter a message"
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // ... Các style khác giữ nguyên ...
  mainContainer: { flex: 1, backgroundColor: COLORS.white },
  chatContainer: { flex: 1 },
  chatScrollContent: { paddingHorizontal: 15, paddingTop: 20, paddingBottom: 20 },
  messageWrapper: { flexDirection: 'row', marginBottom: 20, maxWidth: '85%' },
  messageWrapperLeft: { alignSelf: 'flex-start' },
  messageWrapperRight: { alignSelf: 'flex-end' },
  avatarContainer: { marginRight: 10, marginTop: 22 },
  avatarContainerRight: { marginLeft: 10, marginTop: 5 },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  avatarUser: { width: 36, height: 36, borderRadius: 18 },
  messageContent: { flex: 1 },
  messageContentLeft: { alignItems: 'flex-start' },
  messageContentRight: { alignItems: 'flex-end' },
  botName: { fontSize: 13, color: '#666', marginBottom: 4, marginLeft: 4 },
  
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    // Thêm đổ bóng nhẹ cho sang
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleLeft: { borderTopLeftRadius: 4 },
  bubbleRight: { borderTopRightRadius: 4 },
  bubbleText: { fontSize: 15, lineHeight: 20 },
  
  timeText: { fontSize: 11, color: '#999', marginTop: 4 },
  timeTextLeft: { marginLeft: 4 },
  timeTextRight: { marginRight: 4 },
  
  suggestionsContainer: { marginTop: 10, alignItems: 'flex-start' },
  suggestionPill: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  suggestionText: { fontSize: 14, color: '#374151', fontWeight: '500' },
  systemMessage: { textAlign: 'center', color: '#9ca3af', fontStyle: 'italic', fontSize: 13, marginVertical: 15 },
  
  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: COLORS.white },
  iconButton: { padding: 8 },
  inputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 12, height: 40, marginHorizontal: 5 },
  textInput: { flex: 1, fontSize: 15, color: '#000' },
  emojiButton: { paddingLeft: 8 },
});