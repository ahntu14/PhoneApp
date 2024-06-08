/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import moment from 'moment';

const Home = () => {
    const currentDate = moment().format('DD/MM/YYYY');

    const featuredProducts = [
        { id: 1, name: 'IPhone 14', price: '$999', image: require('../../../images/iphone.jpg') },
        { id: 2, name: 'Samsung Galaxy ', price: '$799', image: require('../../../images/galaxy1.jpg') },
        { id: 3, name: 'Iphone 14 Pro  ', price: '$819', image: require('../../../images/iphone4.jpg') },
        { id: 4, name: 'Iphone 14 Plus  ', price: '$839', image: require('../../../images/iphone5.jpg') },
    ];

    const latestNews = ['Ngày phát hành và tính năng của iPhone 14', 'Samsung Galaxy S21 hiện có sẵn màu mới'];

    const specialOffers = [
        { id: 1, name: 'Giảm giá iPhone 14', details: 'Giảm 10% khi mua iPhone 14' },
        { id: 2, name: 'Khuyến mãi Samsung Galaxy S21', details: 'Mua 1 Tặng 1' },
    ];

    const topCategories = [
        { id: 1, name: 'Điện thoại thông minh', image: require('../../../images/galaxy2.jpg') },
        { id: 2, name: 'Xiaomi giá tốt', image: require('../../../images/xiaomi1.jpg') },
        { id: 3, name: 'Xiaomi mới', image: require('../../../images/xiaomi2.jpg') },
        { id: 4, name: 'Oppo Reno 10', image: require('../../../images/oppo1.jpg') },
        { id: 5, name: 'Oppo Reno 11', image: require('../../../images/oppo2.jpg') },
    ];

    const customerReviews = [
        { id: 1, name: 'Phạm Anh Tú', review: 'Điện thoại tuyệt vời, hiệu năng xuất sắc!' },
        { id: 2, name: 'Phạm Văn Nam', review: 'Chất lượng camera và pin tuyệt vời.' },
        { id: 3, name: 'Nguyễn Thị Hồng Hạnh', review: 'Giá cả rất tốt so với thị trường' },
    ];

    const renderProduct = (product) => (
        <View key={product.id} style={styles.productCard}>
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
        </View>
    );

    const renderNews = (news, index) => (
        <Text key={index} style={styles.newsItem}>
            {news}
        </Text>
    );

    const renderOffer = (offer) => (
        <View key={offer.id} style={styles.offerCard}>
            <Text style={styles.offerName}>{offer.name}</Text>
            <Text style={styles.offerDetails}>{offer.details}</Text>
        </View>
    );

    const renderCategory = (category) => (
        <View key={category.id} style={styles.categoryCard}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{category.name}</Text>
        </View>
    );

    const renderReview = (review) => (
        <View key={review.id} style={styles.reviewCard}>
            <Text style={styles.reviewName}>{review.name}</Text>
            <Text style={styles.reviewText}>{review.review}</Text>
        </View>
    );

    return (
        // eslint-disable-next-line react/jsx-no-duplicate-props
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.text1}>Khám phá</Text>
                    <Text style={styles.text2}>{currentDate}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {featuredProducts.map(renderProduct)}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Danh mục hàng đầu</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {topCategories.map(renderCategory)}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tin tức mới nhất</Text>
                    {latestNews.map(renderNews)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ưu đãi đặc biệt</Text>
                    {specialOffers.map(renderOffer)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Đánh giá của khách hàng</Text>
                    {customerReviews.map(renderReview)}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 20,
    },
    text1: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 15,
        fontStyle: 'italic',
    },
    bannerContainer: {
        alignItems: 'center',
        marginBottom: 20,
        resizeMode: 'stretch',
    },
    bannerImage: {
        width: '90%',
        height: 150,
        borderRadius: 10,
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10,
    },
    horizontalScroll: {
        paddingLeft: 20,
    },
    productCard: {
        width: 150,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginRight: 15,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    newsItem: {
        fontSize: 14,
        color: '#444',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    offerCard: {
        padding: 15,
        backgroundColor: '#f1c40f',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    offerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    offerDetails: {
        fontSize: 14,
        color: '#444',
    },
    categoryCard: {
        width: 120,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginRight: 15,
        alignItems: 'center',
    },
    categoryImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    categoryName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    reviewCard: {
        padding: 15,
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    reviewName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviewText: {
        fontSize: 14,
        color: '#444',
        marginTop: 5,
    },
});

export default Home;
