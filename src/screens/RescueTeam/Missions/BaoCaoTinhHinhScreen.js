//src/screens/RescueTeam/Missions/BaoCaoTinhHinhScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RescueReportSentModal from '../../../components/RescueReportSentModal'; // Sửa path cho đúng folder nhé sếp

export default function BaoCaoTinhHinhScreen() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // --- STATE QUẢN LÝ FORM ---
    const [accidentType, setAccidentType] = useState('Tai nạn hàng không');
    const [victimCount, setVictimCount] = useState('');
    const [severity, setSeverity] = useState('Mức độ');
    const [selectedResources, setSelectedResources] = useState([]);
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        // Sếp có thể thêm logic validate dữ liệu ở đây
        console.log('Gửi báo cáo', { accidentType, victimCount, selectedResources, description });

        // Kích hoạt Modal "thần thánh"
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        // Sau khi báo cáo xong thường sẽ quay về hoặc tới màn hình tiếp theo
        router.back(); //
    };

    const resources = [
        { id: 'ambulance', label: 'Xe cứu thương' },
        { id: 'police', label: 'Xe cảnh sát' },
        { id: 'fire', label: 'Xe cứu hoả' },
        { id: 'other', label: 'Khác' },
    ];

    // Logic chọn nhiều nguồn lực
    const toggleResource = (id) => {
        if (selectedResources.includes(id)) {
            setSelectedResources(selectedResources.filter((item) => item !== id));
        } else {
            setSelectedResources([...selectedResources, id]);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* 1. HEADER TÁC CHIẾN */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Báo cáo tình hình</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 2. LOẠI TAI NẠN */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Loại tai nạn</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{accidentType}</Text>
                            <Ionicons name="chevron-down" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* 3. SỐ LƯỢNG NẠN NHÂN */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số lượng nạn nhân</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhập ở đây..."
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={victimCount}
                            onChangeText={setVictimCount}
                        />
                    </View>

                    {/* 4. MỨC ĐỘ NGHIÊM TRỌNG */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mức độ nghiêm trọng</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{severity}</Text>
                            <Ionicons name="chevron-down" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* 5. NGUỒN LỰC CẦN THIẾT (GRID 2x2) */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nguồn lực cần thiết</Text>
                        <View style={styles.resourceGrid}>
                            {resources.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.resourceItem}
                                    activeOpacity={0.7}
                                    onPress={() => toggleResource(item.id)}
                                >
                                    <View style={styles.radioContainer}>
                                        <View style={[
                                            styles.radioOuter,
                                            selectedResources.includes(item.id) && styles.radioOuterActive
                                        ]}>
                                            {selectedResources.includes(item.id) && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={styles.resourceLabel}>{item.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* 6. MÔ TẢ CHI TIẾT */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mô tả chi tiết tình hình</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Mô tả thêm về hiện trường, tình trạng nạn nhân, các nguy cơ tiềm ẩn"
                            placeholderTextColor="#999"
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    {/* 7. NÚT GỬI BÁO CÁO */}
                    <TouchableOpacity
                        style={styles.submitBtn}
                        activeOpacity={0.9}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitBtnText}>GỬI BÁO CÁO</Text>
                    </TouchableOpacity>

                    <RescueReportSentModal
                        isVisible={isModalVisible}
                        onClose={handleCloseModal}
                    />

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 10,
    },
    backBtn: {
        padding: 4,
    },
    headerTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: '800',
        color: '#000',
        textAlign: 'center',
        marginRight: 36, // Để bù trừ cho nút back, giúp tiêu đề chính giữa
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    textInput: {
        backgroundColor: '#F6F7F8',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 50,
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
        // Shadow cho input chuẩn Figma
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    resourceGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    resourceItem: {
        width: '48%',
        backgroundColor: '#F6F7F8',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        // Shadow chuẩn Figma 25% cho các card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioOuterActive: {
        borderColor: '#F27A3A',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#F27A3A',
    },
    resourceLabel: {
        fontSize: 15,
        fontWeight: '800',
        color: '#000',
        flex: 1,
    },
    textArea: {
        backgroundColor: '#F6F7F8',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 12,
        padding: 15,
        height: 150,
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    submitBtn: {
        backgroundColor: '#F27A3A',
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    submitBtnText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 1,
    },
});