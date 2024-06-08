/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Search from '../../components/Search';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductDetail = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { item, screen } = route.params;
    const userInfo = useSelector((state) => state.userInfo);

    let rate = Math.round(item.rate / item.numberReview);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const renderRating = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '★' : '☆';
        }
        return stars;
    };

    const handleFavorite = async (product) => {
        try {
            const newProducts = await axios.post(
                'http://10.0.2.2:1406/user/favorite',
                {
                    productId: product.id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // eslint-disable-next-line prettier/prettier
                        AccessToken: userInfo.accessToken,
                    },
                },
            );
        } catch (error) {
            throw error;
        }
    };

    const handleCart = async (product) => {
        try {
            const newProducts = await axios.post(
                'http://10.0.2.2:1406/user/cart',
                {
                    productId: product.id,
                    quantity: 1,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // eslint-disable-next-line prettier/prettier
                        AccessToken: userInfo.accessToken,
                    },
                },
            );
        } catch (error) {
            throw error;
        }
    };

    const handleGoBack = () => {
        if (screen === 'Cart') {
            navigation.navigate(screen);
        } else {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image style={styles.arrow} source={require('../../../images/arrow.png')} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.text}> {item.name} </Text>
                </View>
                <View style={styles.search}>
                    <Search />
                </View>
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.content}>
                    <Image style={styles.image} source={{ uri: item.imageUrl }} />

                    <View style={styles.rate}>
                        <Text style={styles.category}>{capitalizeFirstLetter(item.category)}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>Đánh giá:</Text>
                            <Text style={styles.ratingStars}>{renderRating(rate)}</Text>
                        </View>
                    </View>
                    <Text style={styles.name}>{capitalizeFirstLetter(item.name)}</Text>
                    <Text style={styles.price}>{formatCurrency(item.newPrice)}</Text>
                    <Text style={styles.info}>Thông số kĩ thuật:</Text>
                    <Text style={styles.chip}>Chip: {item.chip}</Text>
                    <Text style={styles.ram}>Ram: {item.ram}GB</Text>
                    <Text style={styles.rom}>Rom: {item.rom}GB</Text>
                    <Text style={styles.screen}>Màn hình: {item.screen}</Text>
                    <Text style={styles.behindCam}>Pin: {item.pin} mAh</Text>
                    <Text style={styles.behindCam}>Sạc: {item.chargeSpeed} W</Text>
                    <Text style={styles.selfieCam}>Camera trước: {item.selfieCam}</Text>
                    <Text style={styles.behindCam}>Camera sau: {item.behindCam}</Text>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => handleCart(item)} style={styles.button}>
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFavorite(item)} style={styles.favoriteButton}>
                            <Text style={styles.favoriteText}>Favorite</Text>
                            <Image style={styles.favoriteIcon} source={require('../../../images/heart.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontFamily: 'Arial',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 17,
        color: 'black',
    },
    rate: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow: {
        width: 20,
        height: 20,
        marginLeft: 22,
    },
    search: {
        marginTop: -18,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        fontFamily: 'Arial',
    },
    image: {
        marginLeft: 25,
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    name: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    category: {
        marginBottom: 5,
        fontSize: 16,
        color: 'black',
    },
    price: {
        marginTop: 15,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        marginTop: -10,
        marginBottom: 10,
        fontSize: 18,
        color: 'black',
    },
    chip: {
        marginBottom: 5,
        fontSize: 16,
        color: 'black',
    },
    ram: { marginBottom: 5, fontSize: 16, color: 'black' },
    rom: { marginBottom: 5, fontSize: 16, color: 'black' },
    screen: {
        marginBottom: 5,
        fontSize: 16,
        color: 'black',
    },
    selfieCam: {
        marginBottom: 5,
        fontSize: 16,
        color: 'black',
    },
    behindCam: {
        marginBottom: 5,
        fontSize: 16,
        color: 'black',
    },
    ratingContainer: {
        marginTop: -5,
        marginLeft: 130,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginRight: 5,
        fontSize: 18,
        color: 'black',
    },
    ratingStars: {
        fontSize: 18,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 50,
        width: 300,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    favoriteButton: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 50,
        width: 300,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    favoriteText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 85,
        marginRight: 10,
    },
    favoriteIcon: {
        width: 23,
        height: 23,
    },
});

export default ProductDetail;
