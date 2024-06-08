/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Orders = () => {
    const navigation = useNavigation();
    const userInfo = useSelector((state) => state.userInfo);
    const [orders, setOrders] = useState([]);

    const handleBack = () => {
        navigation.goBack();
    };

    const formatCurrency = (amount) => {
        const integerAmount = Math.floor(amount);

        return integerAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    const getOrders = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:1406/user/detail-order', {
                headers: {
                    'Content-Type': 'application/json',
                    AccessToken: userInfo.accessToken,
                },
            });
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        };
        return date.toLocaleString('vi-VN', options);
    };

    const OrderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { state: item.order_details })}>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.itemName}>{formatCurrency(item.total_amount)}</Text>
                        <Text style={styles.infoText}>Ngày đặt: {formatDate(item.order_date)}</Text>
                        <Text style={styles.infoText}>Số lượng: {item.order_details.length}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <TouchableOpacity onPress={handleBack} style={{ marginBottom: 20 }}>
                    <Image style={styles.backBtn} source={require('../../../images/arrow.png')} />
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Orders</Text>
            <View style={{ backgroundColor: 'white' }}>
                <FlatList
                    data={orders}
                    renderItem={({ item }) => <OrderItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    contentContainerStyle={styles.list}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backBtn: {
        width: 22,
        height: 22,
        marginTop: 10,
        marginLeft: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal: 10,
    },
    infoContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
    },
});

export default Orders;
