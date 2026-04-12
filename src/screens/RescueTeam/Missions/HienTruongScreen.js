// src/screens/RescueTeam/Missions/HienTruongScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import RescueSupportSentModal from '../../../components/RescueSupportSentModal';

// --- ASSETS SẾP GỬI ---
const WarningIcon = require('../../../../assets/icons/Vector42.png'); // Icon tam giác cam
const PeopleIcon = require('../../../../assets/icons/Vector35.png'); // Icon nhóm người

export default function HienTruongScreen() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(0);
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    // --- LOGIC BỘ ĐẾM GIỜ TỰ ĐỘNG TĂNG ---
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval); // Dọn dẹp khi thoát màn hình
    }, []);

    // Hàm format thời gian sang HH:MM:SS
    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* 1. HEADER & TIMER */}
                <View style={styles.timerSection}>
                    <Text style={styles.headerTitle}>Đã đến hiện trường</Text>
                    <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                    <Text style={styles.subTimerText}>Thời gian đã trôi qua</Text>
                </View>

                {/* 2. THÔNG TIN HIỆN TRƯỜNG CARDS */}
                <View style={styles.infoSection}>
                    {/* Card 1: Loại tai nạn */}
                    <View style={styles.infoCard}>
                        <Image source={WarningIcon} style={styles.cardIcon} resizeMode="contain" />
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>Tai nạn giao thông</Text>
                            <Text style={styles.cardDetail}>Đường Trần Đại Nghĩa, máy bay rơi</Text>
                        </View>
                    </View>

                    {/* Card 2: Nạn nhân */}
                    <View style={styles.infoCard}>
                        <View style={styles.iconCircleOrange}>
                            <Image source={PeopleIcon} style={[styles.cardIcon, { tintColor: '#F27A3A' }]} resizeMode="contain" />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>Thông tin nạn nhân</Text>
                            <Text style={styles.cardDetail}>Ước tính có 300 người bị thương và thiệt mạng</Text>
                        </View>
                    </View>
                </View>

                {/* 3. NHÓM NÚT THAO TÁC (ACTION BUTTONS) */}
                <View style={styles.actionSection}>
                    <TouchableOpacity style={styles.btnOrange} activeOpacity={0.8}>
                        <Text style={styles.btnTextWhite}>Báo cáo tình hình</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnDark} activeOpacity={0.8} onPress={() => setIsSuccessVisible(true)}>
                        <Text style={styles.btnTextWhite}>Yêu cầu hỗ trợ</Text>
                    </TouchableOpacity>

                    <RescueSupportSentModal
                        isVisible={isSuccessVisible}
                        onClose={() => setIsSuccessVisible(false)}
                    />

                    <TouchableOpacity
                        style={styles.btnDark}
                        activeOpacity={0.8}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.btnTextWhite}>Kết thúc nhiệm vụ</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },

    // Timer Section
    timerSection: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000',
        marginBottom: 10,
    },
    timerText: {
        fontSize: 80, // Size cực đại cho timer
        fontWeight: '800',
        color: '#F27A3A', // Màu cam sếp thích
        fontVariant: ['tabular-nums'], // Giữ các con số không bị nhảy khi tăng
    },
    subTimerText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },

    // Info Cards
    infoSection: {
        gap: 20,
        marginBottom: 50,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        // --- ĐỔ BÓNG CHUẨN FIGMA X0 Y4 B4 25% ---
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
    },
    cardIcon: {
        width: 45,
        height: 45,
    },
    iconCircleOrange: {
        // Để icon người có màu cam đồng bộ
    },
    cardTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
    },
    cardDetail: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginTop: 4,
    },

    // Buttons
    actionSection: {
        gap: 15,
    },
    btnOrange: {
        backgroundColor: '#F27A3A',
        height: 65,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDark: {
        backgroundColor: '#3D4C59', // Màu xanh đen lì
        height: 65,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextWhite: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
    },
});