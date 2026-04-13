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
    Modal,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RescueReportSentModal from '../../../components/RescueReportSentModal';

export default function BaoCaoTinhHinhScreen() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // --- DỮ LIỆU LỰA CHỌN ---
    const ACCIDENT_OPTIONS = [
        'Tai nạn hàng không',
        'Tai nạn đường bộ',
        'Tai nạn đường thủy',
        'Cháy nổ / Hỏa hoạn',
        'Rò rỉ hóa chất / Phóng xạ',
        'Sập công trình',
        'Thiên tai / Lũ lụt',
        'Khác'
    ];

    const SEVERITY_OPTIONS = ['Thấp', 'Trung bình', 'Cao', 'Khẩn cấp'];

    // --- STATE QUẢN LÝ FORM ---
    const [accidentType, setAccidentType] = useState('Tai nạn hàng không');
    const [victimCount, setVictimCount] = useState('');
    const [severity, setSeverity] = useState('Mức độ');
    const [selectedResources, setSelectedResources] = useState([]);
    const [description, setDescription] = useState('');

    // State cho Modal chọn (Huy thêm để xử lý lựa chọn)
    const [pickerVisible, setPickerVisible] = useState(false);
    const [pickerType, setPickerType] = useState(null); // 'type' hoặc 'severity'

    const openPicker = (type) => {
        setPickerType(type);
        setPickerVisible(true);
    };

    const handleSelect = (item) => {
        if (pickerType === 'type') setAccidentType(item);
        else setSeverity(item);
        setPickerVisible(false);
    };

    const handleSubmit = () => {
        console.log('Gửi báo cáo', { accidentType, victimCount, selectedResources, description, severity });
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        router.back();
    };

    const resources = [
        { id: 'ambulance', label: 'Xe cứu thương' },
        { id: 'police', label: 'Xe cảnh sát' },
        { id: 'fire', label: 'Xe cứu hoả' },
        { id: 'other', label: 'Khác' },
    ];

    const toggleResource = (id) => {
        if (selectedResources.includes(id)) {
            setSelectedResources(selectedResources.filter((item) => item !== id));
        } else {
            setSelectedResources([...selectedResources, id]);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
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
                    {/* 2. LOẠI TAI NẠN - Đã thêm sự kiện mở chọn */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Loại tai nạn</Text>
                        <TouchableOpacity 
                            style={styles.dropdown} 
                            onPress={() => openPicker('type')}
                        >
                            <Text style={styles.dropdownText}>{accidentType}</Text>
                            <Ionicons name="chevron-down" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

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

                    {/* 4. MỨC ĐỘ NGHIÊM TRỌNG - Đã thêm sự kiện mở chọn */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mức độ nghiêm trọng</Text>
                        <TouchableOpacity 
                            style={styles.dropdown} 
                            onPress={() => openPicker('severity')}
                        >
                            <Text style={styles.dropdownText}>{severity}</Text>
                            <Ionicons name="chevron-down" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

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

                    {/* --- MODAL CHỌN LỰA (Huy thêm Style ẩn) --- */}
                    <Modal visible={pickerVisible} transparent animationType="fade">
                        <View style={styles.modalOverlay}>
                            <View style={styles.pickerCard}>
                                <Text style={styles.pickerTitle}>
                                    {pickerType === 'type' ? 'Chọn loại tai nạn' : 'Chọn mức độ nghiêm trọng'}
                                </Text>
                                <FlatList
                                    data={pickerType === 'type' ? ACCIDENT_OPTIONS : SEVERITY_OPTIONS}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            style={styles.optionItem} 
                                            onPress={() => handleSelect(item)}
                                        >
                                            <Text style={styles.optionText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity 
                                    onPress={() => setPickerVisible(false)}
                                    style={styles.closePickerBtn}
                                >
                                    <Text style={{color: '#E14343', fontWeight: '800'}}>ĐÓNG</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// GIỮ NGUYÊN STYLE CỦA SẾP - CHỈ THÊM MỘT CHÚT CHO MODAL CHỌN Ở DƯỚI CÙNG
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
        marginRight: 36,
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

    // --- CÁC STYLE PHỤ CHO BỘ CHỌN (KHÔNG ẢNH HƯỞNG LAYOUT CHÍNH) ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerCard: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        maxHeight: '70%',
    },
    pickerTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 15,
        textAlign: 'center',
    },
    optionItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
    },
    closePickerBtn: {
        marginTop: 15,
        alignItems: 'center',
    }
});