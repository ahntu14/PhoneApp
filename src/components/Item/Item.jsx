import React from 'react';
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Item = ({ item }) => {
    const navigation = useNavigation();
    const screen = 'Shop';

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProductDetail', { item, screen })}
                    style={styles.imageContainer}
                >
                    <Image style={styles.image} source={{ uri: item.imageUrl }} />
                </TouchableOpacity>
                <Text style={styles.name}>{capitalizeFirstLetter(item.name)}</Text>
                <View style={styles.group}>
                    <Text style={styles.category}>{capitalizeFirstLetter(item.category)}</Text>
                </View>
                <Text style={styles.price}>{formatCurrency(item.newPrice)}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBlockColor: 'black',
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        fontFamily: 'Times New Roman',
    },
    image: {
        backgroundColor: 'red',
        width: 185,
        height: 185,
        // resizeMode: 'stretch',
        margin: 5,
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 3,
    },
    name: {
        fontSize: 16,
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
        fontSize: 16,
        color: 'black',
    },
    heart: {
        width: 22,
        height: 22,
        marginLeft: 65,
    },
});

export default Item;
