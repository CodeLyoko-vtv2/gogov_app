// src/screens/RescueTeam/Missions/LichSuNhiemVuScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import Header và hằng số
import RescueHeader from '../../../components/RescueHeader';
import { COLORS } from '../../../constants/colors';

// Import dàn icon phân loại sếp gửi
const FireIcon = require('../../../../assets/icons/Vector37.png');
const MedicalIcon = require('../../../../assets/icons/Vector39.png');
const CarIcon = require('../../../../assets/icons/directions_car.png');

export default function LichSuNhiemVuScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Dữ liệu mẫu khớp 100% với thiết kế Figma
    const historyData = [
        {
            id: '1',
            title: 'Hoả hoạn chung ...',
            location: '123 đường ABC, Hải Châu, Đà Nẵng',
            time: '8:33 - 4/3/2026',
            status: 'Hoàn thành',
            type: 'fire',
            iconBg: '#F1C49F', // Màu cam nhạt cho hoả hoạn
        },
        {
            id: '2',
            title: 'Tai nạn giao ...',
            location: '22 Nguyễn Văn Linh, Hải Châu, Đà...',
            time: '23:33 - 4/3/2026',
            status: 'Hoàn thành',
            type: 'car',
            iconBg: '#ADC9F3', // Màu xanh nhạt cho giao thông
        },
        {
            id: '3',
            title: 'Hỗ trợ y tế',
            location: 'Uỷ ban thành phố Đà Nẵng',
            time: '8:33 - 4/3/2026',
            status: 'Đã huỷ',
            type: 'medical',
            iconBg: '#F9B0B0', // Màu hồng nhạt cho y tế
        },
        {
            id: '4',
            title: 'Tai nạn liên hoàn',
            location: '111 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
            time: '07:03 - 4/3/2026',
            status: 'Hoàn thành',
            type: 'car',
            iconBg: '#ADC9F3',
        },
    ];

    const getIconSource = (type) => {
        switch (type) {
            case 'fire': return FireIcon;
            case 'medical': return MedicalIcon;
            case 'car': return CarIcon;
            default: return CarIcon;
        }
    };

    const renderHistoryCard = ({ item }) => (
        <View style={styles.card}>
            {/* Icon trái */}
            <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                <Image source={getIconSource(item.type)} style={styles.typeIcon} resizeMode="contain" />
            </View>

            {/* Nội dung giữa */}
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: item.status === 'Hoàn thành' ? '#E2F2E9' : '#FFE5E5' }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: item.status === 'Hoàn thành' ? '#4CAF50' : '#FF5252' }
                        ]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container} edges={['top']}>
            <RescueHeader title="Lịch sử nhiệm vụ" onBackPress={() => router.back()} />

            {/* 1. THANH TÌM KIẾM */}
            <View style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#999" />
                    <TextInput
                        placeholder="Tìm kiếm nhiệm vụ"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* 2. BỘ LỌC (FILTER) */}
            <View style={styles.filterWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>Lọc theo ngày</Text>
                        <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.filterBtn, styles.filterBtnActive]}>
                        <Text style={[styles.filterText, { color: '#4D8FFF' }]}>Lọc theo NV</Text>
                        <Ionicons name="chevron-down" size={16} color="#4D8FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>Trạng thái</Text>
                        <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* 3. DANH SÁCH LỊCH SỬ */}
            <FlatList
                data={historyData}
                renderItem={renderHistoryCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },

    // Search
    searchWrapper: { paddingHorizontal: 20, marginTop: 15 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#CCC',
        paddingHorizontal: 15,
        height: 48,
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },

    // Filters
    filterWrapper: { paddingLeft: 20, marginTop: 20, marginBottom: 20 },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 12,
        marginBottom: 10,
    },
    filterBtnActive: {
        backgroundColor: '#D1E4FF', // Màu xanh nhạt cho bộ lọc đang chọn
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    filterText: { fontSize: 14, fontWeight: '600', marginRight: 5 },

    // List & Cards
    listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F6F7F8',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#000000',
        // Đổ bóng chuẩn 25%

    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeIcon: { width: 32, height: 32 },
    cardContent: { flex: 1, marginLeft: 12, justifyContent: 'center', rowGap: 7 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { fontSize: 18, fontWeight: '800', flex: 1, marginRight: 5 },

    // Badges
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusText: { fontSize: 12, fontWeight: '800' },

    locationText: { fontSize: 14, color: '#666', marginTop: 4, fontWeight: '500' },
    timeText: { fontSize: 14, color: '#999', marginTop: 4, fontWeight: '500' },
});