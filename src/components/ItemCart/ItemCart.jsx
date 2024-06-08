/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ADD_TOTAL } from '../../redux/reducers/totalCart';
import { REMOVE_TOTAL } from '../../redux/reducers/totalCart';

const ItemCart = ({ item }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.productQuantity);
    const [totalPrice, setTotalPrice] = useState(quantity * item.newPrice);

    useEffect(() => {
        const newTotalPrice = quantity * item.newPrice;
        setTotalPrice(newTotalPrice);
    }, [quantity, item.newPrice]);

    useEffect(() => {
        dispatch({ type: ADD_TOTAL, payload: totalPrice });
        return () => {
            dispatch({ type: REMOVE_TOTAL, payload: totalPrice });
        };
    }, [totalPrice]);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('HomeTabs', {
                            screen: 'Shop',
                            params: {
                                screen: 'ProductDetail',
                                params: {
                                    item,
                                },
                            },
                        })
                    }
                    style={styles.imageContainer}
                >
                    <Image style={styles.image} source={{ uri: item.imageUrl }} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.name}>{capitalizeFirstLetter(item.name)}</Text>
                    <View style={styles.group}>
                        <Text style={styles.category}>{capitalizeFirstLetter(item.category)}</Text>
                    </View>
                    <Text style={styles.price}>{formatCurrency(item.newPrice)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={decreaseQuantity}>
                            <Text style={styles.quantityButton}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity onPress={increaseQuantity}>
                            <Text style={styles.quantityButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.total}>Total: {formatCurrency(totalPrice)}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        fontFamily: 'Arial',
    },
    image: {
        backgroundColor: 'red',
        width: 170,
        height: 170,
        margin: 5,
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 3,
    },
    name: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 27,
    },
    category: {
        marginLeft: 27,
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    price: {
        marginLeft: 27,
        fontSize: 17,
        color: 'black',
        marginBottom: -5,
    },
    quantityContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 27,
    },
    quantityButton: {
        fontSize: 22,
        color: 'black',
        marginRight: 10,
    },
    quantity: {
        fontSize: 16,
        color: 'black',
        marginRight: 10,
    },
    total: {
        marginTop: 5,
        marginLeft: 27,
        fontSize: 17,
        color: 'black',
    },
});

export default ItemCart;
