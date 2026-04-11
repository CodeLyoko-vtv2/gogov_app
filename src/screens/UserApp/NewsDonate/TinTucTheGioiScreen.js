// src/screens/UserApp/NewsDonate/TinTucTheGioiScreen.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

// GỌI CÁC THÀNH PHẦN CHUẨN CỦA DỰ ÁN
import UserHeader from '../../../components/UserHeader';
import UserTabs from '../../../components/UserTabs';
import { COLORS } from '../../../constants/colors';

// MẢNG DỮ LIỆU TIN TỨC (MOCK DATA)
const NEWS_DATA = [
    {
        id: 1,
        source: 'VnExpress',
        title: '🔥 Cập nhật: Chiến sự Iran & Khủng hoảng Năng lượng (09/04/2026)',
        content: 'Sau tuyên bố ngừng bắn tạm thời 2 tuần (từ 08/04), giá dầu thô Brent đã giảm mạnh 15% xuống còn $92/thùng. Tuy nhiên, eo biển Hormuz vẫn chưa hoàn toàn thông suốt, gây ra tình trạng khan hiếm xăng dầu cục bộ tại nhiều khu vực. ',
        image: require('../../../../assets/images/Rectangle 4908.png'),
    },
    {
        id: 2,
        source: 'Vietnamnet',
        title: '☀️ Cảnh báo: Nắng nóng kỷ lục',
        content: 'Tình hình: Miền Trung đạt đỉnh 41-42°C. Chỉ số UV ở mức 11+ (Nguy hại cực cao). Mẹo sinh tồn nhanh: Hạn chế ra ngoài: Đặc biệt khung giờ 11:00 - 16:00. Bù điện giải: Uống nước kèm ít muối hoặc Oresol,... ',
        image: require('../../../../assets/images/Rectangle 4909.png'),
    },
    {
        id: 3,
        source: 'VTV',
        title: '🦠 Cảnh báo Dịch bệnh: Biến thể "Ve sầu" (Cicada)',
        content: 'Sự xuất hiện của các biến thể mới như BA.3.2 (Cicada) và NB.1.8.1 đang đặt ra những thách thức mới cho bản đồ dịch tễ toàn cầu. Đặc điểm nhận diện đáng lo ngại nhất của "bộ đôi" này chính là tốc độ lây lan chóng mặt, với khả năng ',
        image: require('../../../../assets/images/Rectangle 4911.png'),
    },
];

export default function TinTucTheGioiScreen() {
    const router = useRouter();

    // Component phụ render từng bài viết
    const NewsPost = ({ item }) => (
        <View style={styles.postContainer}>
            {/* Thông tin nguồn báo */}
            <View style={styles.postHeader}>
                <View style={styles.sourceInfo}>
                    <Text style={styles.sourceText}>{item.source}</Text>
                    <Image
                        source={require('../../../../assets/icons/mingcute_certificate-fill.png')}
                        style={styles.verifiedBadge}
                    />
                </View>
                <TouchableOpacity style={styles.moreOptionsButton} activeOpacity={0.6}>
                    <Image
                        source={require('../../../../assets/icons/mingcute_more-2-fill.png')}
                        style={styles.moreOptionsIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* Nội dung bài viết */}
            <Text style={styles.postTitle}>{item.title}</Text>

            {/* ĐÃ SỬA: Bọc content vào một View relative */}
            <View style={styles.contentWrapper}>
                <Text style={styles.postContent} numberOfLines={4}>
                    {item.content}
                </Text>

                {/* Lớp overlay chứa chữ "Xem thêm" */}
                <Text style={styles.readMoreOverlay}>
                    ... <Text style={styles.readMoreText}>Xem thêm</Text>
                </Text>
            </View>

            {/* Hình ảnh */}
            <Image
                source={item.image}
                style={styles.postImage}
                resizeMode="cover"
            />
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            {/* HEADER */}
            <UserHeader 
            title="TIN TỨC THẾ GIỚI" 
            onBackPress={() => router.replace('/HomeSOS') }
            />

                <ScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }} // Chừa không gian cho UserTabs
                >
                    {/* BANNER ỦNG HỘ */}
                    <View style={styles.donateBanner}>
                        <Text style={styles.bannerTitle}>Ủng hộ Mặt trận Tổ quốc Việt Nam</Text>
                        <Text style={styles.bannerSubtitle}>Hỗ trợ nhân dân Cuba vượt qua khó khăn</Text>
                        <TouchableOpacity style={styles.donateButton} activeOpacity={0.8} onPress={() => router.push('/UngHo')}>
                            <Text style={styles.donateButtonText}>Ủng hộ ngay</Text>
                        </TouchableOpacity>
                    </View>

                    {/* DANH SÁCH TIN TỨC */}
                    <View style={styles.newsList}>
                        {NEWS_DATA.map((item) => (
                            <NewsPost key={item.id} item={item} />
                        ))}
                    </View>
                </ScrollView>

            {/* THANH ĐIỀU HƯỚNG BOTTOM TABS */}
                {/* Giả sử activeRoute của màn này là /TinTuc */}
            <UserTabs activeRoute="/TinTuc" />
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
    // --- STYLE BANNER ỦNG HỘ ---
    donateBanner: {
        backgroundColor: '#FEEBEB', // Nền đỏ hồng nhạt
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 25,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 16,
        alignItems: 'center',
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 5,
        textAlign: 'center',
    },
    bannerSubtitle: {
        fontSize: 13,
        color: '#444',
        marginBottom: 15,
        textAlign: 'center',
    },
    donateButton: {
        backgroundColor: COLORS.primary, // Đỏ chủ đạo
        paddingVertical: 13,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    donateButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '700',
    },

    // --- STYLE BÀI VIẾT TIN TỨC ---
    newsList: {
        paddingHorizontal: 20,
    },
    postContainer: {
        marginBottom: 30,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sourceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sourceText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000',
        marginRight: 6,
    },
    verifiedBadge: {
        width: 24,
        height: 24,
    },
    moreOptionsButton: {
        padding: 5, // Tăng padding một chút để dễ bấm hơn
    },
    moreOptionsIcon: {
        width: 24,
        height: 24,
        tintColor: '#000', // Đảm bảo icon luôn có màu đen rõ nét
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        lineHeight: 22,
        marginBottom: 5,
    },

    // THÊM MỚI: Wrapper cho nội dung
    contentWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    postContent: {
        fontSize: 16, // Theo code bạn vừa gửi là 16
        color: '#333',
        lineHeight: 22, // Nên tăng lineHeight lên 22 cho dễ đọc với font 16
    },
    // THÊM MỚI: Overlay chữ Xem thêm
    readMoreOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.white, // Tẩy trắng đoạn chữ bị đè phía dưới
        paddingLeft: 8, // Tránh dính sát vào text gốc
        fontSize: 16, // Bắt buộc phải bằng fontSize của postContent
        lineHeight: 22, // Bắt buộc phải bằng lineHeight của postContent
        color: '#333',
    },
    readMoreText: {
        color: COLORS.gray,
        fontWeight: '500',
    },
    postImage: {
        width: '100%',
        height: 180, // Chiều cao cố định cho ảnh thumbnail
        backgroundColor: '#F3F4F6', // Nền xám nhạt phòng trường hợp ảnh load chậm
    },
});