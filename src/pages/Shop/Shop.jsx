import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Search from '../../components/Search';
import Item from '../../components/Item';
import axios from 'axios';

const Shop = () => {
    const [selectedMenu, setSelectedMenu] = useState('All');
    const [products, setProducts] = useState([]);

    const menuItems = [
        { id: 'All', name: 'All' },
        { id: 'Iphone', name: 'Iphone' },
        { id: 'Samsung', name: 'Samsung' },
        { id: 'Xiaomi', name: 'Xiaomi' },
        { id: 'More', name: 'More' },
    ];

    const getProducts = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:1406/public/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = () => {
        if (selectedMenu === 'All') {
            return products;
        } else if (selectedMenu === 'More') {
            return products.filter((product) => !['iphone', 'samsung', 'xiaomi'].includes(product.category));
        } else {
            return products.filter((product) => product.category.toLowerCase() === selectedMenu.toLowerCase());
        }
    };

    const renderItem = ({ item }) => <Item item={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Search />
            </View>
            <View>
                <Text style={styles.text1}>Shop</Text>
            </View>
            <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.menuItem, selectedMenu === item.id && styles.selectedMenuItem]}
                        onPress={() => setSelectedMenu(item.id)}
                    >
                        <Text style={[styles.menuItemText, selectedMenu === item.id && styles.selectedMenuItemText]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.line} />
            <View style={styles.flatListContainer}>
                <FlatList
                    data={filteredProducts()}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        fontFamily: 'Arial',
    },
    text1: { marginTop: 10, marginLeft: 20, fontSize: 22, fontWeight: 'bold' },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuItemText: {
        fontSize: 16,
    },
    selectedMenuItem: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    selectedMenuItemText: {
        color: 'black',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    flatListContainer: {
        flex: 1,
    },
    list: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 5,
    },
});

export default Shop;
