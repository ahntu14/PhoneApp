/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Item from '../../components/Item';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { REMOVE_FAVORITE } from '../../redux/reducers/favorite';

const Favorites = () => {
    const selectedProduct = useSelector((state) => state.selectedProduct);
    const product = selectedProduct.selectedProduct;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    // const [products, setProducts] = useState(product ? [product] : []);

    useEffect(() => {
        setEdit(false);

        const unsubscribe = navigation.addListener('blur', () => {
            setEdit(false);
        });

        return unsubscribe;
    }, [navigation]);

    const handleRemove = (item) => {
        dispatch({ type: REMOVE_FAVORITE, payload: item });
    };

    const renderItem = ({ item }) => (
        <View>
            <Item item={item} />
            {edit && (
                <TouchableOpacity onPress={() => handleRemove(item)}>
                    <Image style={styles.editButton} source={require('../../../images/minus.png')} />
                </TouchableOpacity>
            )}
        </View>
    );

    const handleEdit = () => {
        setEdit(!edit);
    };

    if (product.length > 0) {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleEdit}>
                        <Text style={styles.editBtn}>{!edit ? 'Edit' : 'Save'}</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.favoriteText}>Favorites</Text>
                    </View>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={product}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            contentContainerStyle={styles.list}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text style={styles.editBtn}>Edit</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.favoriteText}>Favorites</Text>
                    </View>
                    <View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.heart} source={require('../../../images/heart2.png')} />
                            <Text style={styles.text}>Items added to your favorites are empty</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={styles.button}>
                                <Text style={styles.buttonText}>Shop now</Text>
                            </TouchableOpacity>
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
    favoriteText: {
        fontSize: 21,
        color: 'black',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 230,
        marginLeft: 20,
    },
    heart: {
        width: 60,
        height: 60,
        marginBottom: 15,
        marginTop: 170,
    },
    text: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 50,
        width: 350,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    flatListContainer: {
        flex: 1,
    },
    list: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    // itemContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    editButton: {
        width: 20,
        height: 20,
        marginTop: -40,
        marginLeft: 150,
    },
});

export default Favorites;
