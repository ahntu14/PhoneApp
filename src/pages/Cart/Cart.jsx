/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-shadow
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import ItemCart from '../../components/ItemCart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { REMOVE_PRODUCT } from '../../redux/reducers/cart';

const Cart = () => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const cartProduct = useSelector((state) => state.cartProduct);
    const product = cartProduct.cartProduct;

    const [edit, setEdit] = useState(false);

    const totalAmount = useSelector((state) => state.totalReducer);
    const total = totalAmount.totalCart;

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleRemove = (item) => {
        dispatch({ type: REMOVE_PRODUCT, payload: item });
    };

    const renderItem = ({ item }) => {
        return (
            <View>
                <ItemCart item={item} />
                {edit && (
                    <TouchableOpacity onPress={() => handleRemove(item)}>
                        <Image style={styles.editButton} source={require('../../../images/trash.png')} />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    if (product.length > 0) {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleEdit}>
                        <Text style={styles.editBtn}>{!edit ? 'Edit' : 'Save'}</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.cartText}>Cart</Text>
                    </View>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={product}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={1}
                            contentContainerStyle={styles.list}
                        />
                        <View style={styles.box}>
                            <View style={styles.price}>
                                <Text style={styles.totalText}>Subtotal: </Text>
                                <Text style={styles.boxPrice}>{formatCurrency(total)}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.totalText}>Shipping: </Text>
                                <Text style={styles.boxPrice}>{formatCurrency(total)}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.totalText}>Total: </Text>
                                <Text style={styles.boxPrice}>{formatCurrency(total)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.cartText}>Cart</Text>
                    </View>
                    <View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.text}>Your cart is empty</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Arial',
        flex: 1,
    },
    editBtn: {
        marginTop: 15,
        marginLeft: 340,
        fontSize: 19,
        fontWeight: '600',
    },
    cartText: {
        fontSize: 21,
        color: 'black',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    text: {
        marginTop: 250,
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    flatListContainer: {
        flex: 1,
    },
    editButton: {
        width: 20,
        height: 20,
        marginTop: -190,
        marginLeft: 350,
    },
    box: {
        marginTop: 10,
        marginBottom: 15,
    },
    totalText: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 50,
    },
    price: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignContent: 'center',
        // alignItems: 'center',
    },
    boxPrice: {
        color: 'black',
        fontSize: 18,
        marginRight: 50,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default Cart;
